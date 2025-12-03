package edu.cit.audioscholar.ui.profile

import android.Manifest
import android.content.Context
import android.graphics.Bitmap
import android.net.Uri
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.*
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.*
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.focus.FocusDirection
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.*
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.unit.dp
import androidx.core.content.FileProvider
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.navigation.NavController
import coil.compose.AsyncImage
import coil.request.ImageRequest
import com.google.accompanist.permissions.*
import edu.cit.audioscholar.ui.components.ModernButton
import edu.cit.audioscholar.ui.components.ModernTextField
import edu.cit.audioscholar.R
import kotlinx.coroutines.*
import java.io.File
import java.io.FileOutputStream
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

private suspend fun saveBitmapToTempFile(context: Context, bitmap: Bitmap): Uri? = withContext(Dispatchers.IO) {
    return@withContext try {
        val timeStamp = SimpleDateFormat("yyyyMMdd_HHmmss", Locale.US).format(Date())
        val tempFile = File.createTempFile(
            "JPEG_${timeStamp}_",
            ".jpg",
            context.cacheDir
        )

        FileOutputStream(tempFile).use { out ->
            bitmap.compress(Bitmap.CompressFormat.JPEG, 90, out)
        }

        FileProvider.getUriForFile(
            context,
            "${context.packageName}.provider",
            tempFile
        )
    } catch (e: Exception) {
        e.printStackTrace()
        null
    }
}


@OptIn(ExperimentalMaterial3Api::class, ExperimentalComposeUiApi::class, ExperimentalPermissionsApi::class)
@Composable
fun EditProfileScreen(
    navController: NavController,
    viewModel: EditProfileViewModel = hiltViewModel()
) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    val keyboardController = LocalSoftwareKeyboardController.current
    val focusManager = LocalFocusManager.current
    val snackbarHostState = remember { SnackbarHostState() }
    val scope = rememberCoroutineScope()
    val context = LocalContext.current

    val sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true)
    var showBottomSheet by remember { mutableStateOf(false) }

    var saveSuccessHandled by remember { mutableStateOf(false) }
    var messageHandled by remember { mutableStateOf<String?>(null) }

    val galleryLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.GetContent(),
        onResult = { uri: Uri? ->
            viewModel.onAvatarUriSelected(uri)
            showBottomSheet = false
        }
    )
    val cameraPermissionState = rememberPermissionState(Manifest.permission.CAMERA)
    val cameraLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.TakePicturePreview(),
        onResult = { bitmap ->
            if (bitmap != null) {
                scope.launch {
                    val uri = saveBitmapToTempFile(context, bitmap)
                    if (uri != null) {
                        viewModel.onAvatarUriSelected(uri)
                    } else {
                        snackbarHostState.showSnackbar("Failed to save camera image.")
                    }
                }
            } else {
            }
        }
    )
    LaunchedEffect(uiState.saveSuccess) {
        if (uiState.saveSuccess && !saveSuccessHandled) {
            saveSuccessHandled = true
            navController.previousBackStackEntry
                ?.savedStateHandle
                ?.set("profileUpdateSuccess", true)
            navController.navigateUp()
        }
    }
    LaunchedEffect(uiState.saveSuccess) {
        if (!uiState.saveSuccess) {
            saveSuccessHandled = false
        }
    }
    LaunchedEffect(uiState.generalMessage) {
        val currentMessage = uiState.generalMessage
        if (currentMessage != null && currentMessage != messageHandled) {
            messageHandled = currentMessage
            scope.launch {
                snackbarHostState.showSnackbar(
                    message = currentMessage,
                    duration = SnackbarDuration.Short
                )
                viewModel.consumeGeneralMessage()
            }
        } else if (currentMessage == null) {
            messageHandled = null
        }
    }


    if (uiState.isLoading && uiState.email.isEmpty()) {
        Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
            CircularProgressIndicator()
        }
    } else {
        Scaffold(
            snackbarHost = { SnackbarHost(snackbarHostState) },
            topBar = {
                TopAppBar(
                    title = { Text(stringResource(id = R.string.nav_edit_profile)) },
                    navigationIcon = {
                        IconButton(onClick = {
                            if (!uiState.isSaving && !uiState.isUploadingAvatar) {
                                focusManager.clearFocus()
                                keyboardController?.hide()
                                navController.navigateUp()
                            }
                        }) {
                            Icon(
                                Icons.AutoMirrored.Filled.ArrowBack,
                                contentDescription = stringResource(R.string.cd_navigate_back)
                            )
                        }
                    }
                )
            },
            bottomBar = {
                Surface(shadowElevation = 4.dp) {
                    ModernButton(
                        onClick = {
                            focusManager.clearFocus()
                            keyboardController?.hide()
                            viewModel.saveProfile()
                        },
                        enabled = !uiState.isSaving && !uiState.isUploadingAvatar,
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(16.dp)
                    ) {
                        if (uiState.isSaving) {
                            CircularProgressIndicator(
                                modifier = Modifier.size(ButtonDefaults.IconSize),
                                color = MaterialTheme.colorScheme.onPrimary,
                                strokeWidth = 2.dp
                            )
                        } else {
                            Text(stringResource(R.string.button_save))
                        }
                    }
                }
            }
        ) { paddingValues ->
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(paddingValues)
                    .verticalScroll(rememberScrollState())
                    .padding(horizontal = 16.dp)
                    .clickable(
                        interactionSource = remember { MutableInteractionSource() },
                        indication = null
                    ) {
                        focusManager.clearFocus()
                        keyboardController?.hide()
                    },
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Spacer(modifier = Modifier.height(24.dp))

                Box(
                    modifier = Modifier.size(120.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Box(
                        modifier = Modifier
                            .size(120.dp)
                            .clip(CircleShape)
                            .background(MaterialTheme.colorScheme.secondaryContainer)
                            .clickable(enabled = !uiState.isSaving && !uiState.isUploadingAvatar) {
                                showBottomSheet = true
                            },
                        contentAlignment = Alignment.Center
                    ) {
                        val imageSource: Any? = uiState.selectedAvatarUri
                            ?: uiState.profileImageUrl?.takeIf { it.isNotBlank() }
                            ?: R.drawable.avatar_placeholder

                        AsyncImage(
                            model = ImageRequest.Builder(LocalContext.current)
                                .data(imageSource)
                                .crossfade(true)
                                .placeholder(R.drawable.avatar_placeholder)
                                .error(R.drawable.avatar_placeholder)
                                .build(),
                            placeholder = painterResource(id = R.drawable.avatar_placeholder),
                            error = painterResource(id = R.drawable.avatar_placeholder),
                            contentDescription = stringResource(R.string.cd_user_avatar),
                            modifier = Modifier
                                .matchParentSize()
                                .alpha(if (uiState.isUploadingAvatar) 0.5f else 1f),
                            contentScale = ContentScale.Crop
                        )

                        if (uiState.isUploadingAvatar) {
                            CircularProgressIndicator(
                                modifier = Modifier.size(48.dp),
                                color = MaterialTheme.colorScheme.primary
                            )
                        }
                    }

                    if (!uiState.isUploadingAvatar) {
                        IconButton(
                            onClick = { showBottomSheet = true },
                            enabled = !uiState.isSaving,
                            modifier = Modifier
                                .align(Alignment.BottomEnd)
                                .offset(x = 8.dp, y = 8.dp)
                                .size(36.dp)
                                .clip(CircleShape)
                                .background(MaterialTheme.colorScheme.primary)
                        ) {
                            Icon(
                                imageVector = Icons.Filled.PhotoCamera,
                                contentDescription = stringResource(R.string.cd_edit_avatar),
                                modifier = Modifier.size(20.dp),
                                tint = MaterialTheme.colorScheme.onPrimary
                            )
                        }
                    }
                }


                Spacer(modifier = Modifier.height(24.dp))

                ModernTextField(
                    value = uiState.firstName,
                    onValueChange = viewModel::onFirstNameChange,
                    label = stringResource(R.string.edit_profile_firstname_label),
                    placeholder = stringResource(R.string.edit_profile_firstname_placeholder),
                    singleLine = true,
                    isError = uiState.firstNameError != null,
                    // ModernTextField doesn't have supportingText exposed yet in my reading of the file
                    // Let me check the file content again.
                    // app/src/main/java/edu/cit/audioscholar/ui/components/ModernTextField.kt
                    // It does NOT have supportingText.
                    // I will add supportingText manually below the text field if needed, or if I can't, I will just omit it for now or implement it.
                    // But wait, the task is to refactor to use ModernTextField. If ModernTextField lacks features, I should probably update ModernTextField OR use a workaround.
                    // The instruction implies "replace inputs with ModernTextField".
                    // I'll check ModernTextField again.
                    keyboardOptions = KeyboardOptions(imeAction = ImeAction.Next),
                    keyboardActions = KeyboardActions(onNext = { focusManager.moveFocus(FocusDirection.Down) }),
                    leadingIcon = { Icon(Icons.Outlined.Person, contentDescription = null) },
                    modifier = Modifier.fillMaxWidth(),
                    enabled = !uiState.isSaving && !uiState.isUploadingAvatar
                )
                if (uiState.firstNameError != null) {
                    Text(
                        text = uiState.firstNameError!!,
                        color = MaterialTheme.colorScheme.error,
                        style = MaterialTheme.typography.bodySmall,
                        modifier = Modifier.padding(start = 16.dp, top = 4.dp)
                    )
                }
                Spacer(modifier = Modifier.height(16.dp))

                ModernTextField(
                    value = uiState.lastName,
                    onValueChange = viewModel::onLastNameChange,
                    label = stringResource(R.string.edit_profile_lastname_label),
                    placeholder = stringResource(R.string.edit_profile_lastname_placeholder),
                    singleLine = true,
                    isError = uiState.lastNameError != null,
                    keyboardOptions = KeyboardOptions(imeAction = ImeAction.Next),
                    keyboardActions = KeyboardActions(onNext = { focusManager.moveFocus(FocusDirection.Down) }),
                    leadingIcon = { Icon(Icons.Outlined.Person, contentDescription = null) },
                    modifier = Modifier.fillMaxWidth(),
                    enabled = !uiState.isSaving && !uiState.isUploadingAvatar
                )
                if (uiState.lastNameError != null) {
                    Text(
                        text = uiState.lastNameError!!,
                        color = MaterialTheme.colorScheme.error,
                        style = MaterialTheme.typography.bodySmall,
                        modifier = Modifier.padding(start = 16.dp, top = 4.dp)
                    )
                }
                Spacer(modifier = Modifier.height(16.dp))

                ModernTextField(
                    value = uiState.displayName,
                    onValueChange = viewModel::onDisplayNameChange,
                    label = stringResource(R.string.edit_profile_displayname_label),
                    placeholder = stringResource(R.string.edit_profile_displayname_placeholder),
                    singleLine = true,
                    isError = uiState.displayNameError != null,
                    keyboardOptions = KeyboardOptions(imeAction = ImeAction.Next),
                    keyboardActions = KeyboardActions(onNext = { focusManager.moveFocus(FocusDirection.Down) }),
                    leadingIcon = { Icon(Icons.Outlined.Badge, contentDescription = null) },
                    modifier = Modifier.fillMaxWidth(),
                    enabled = !uiState.isSaving && !uiState.isUploadingAvatar
                )
                if (uiState.displayNameError != null) {
                    Text(
                        text = uiState.displayNameError!!,
                        color = MaterialTheme.colorScheme.error,
                        style = MaterialTheme.typography.bodySmall,
                        modifier = Modifier.padding(start = 16.dp, top = 4.dp)
                    )
                }
                Spacer(modifier = Modifier.height(16.dp))

                ModernTextField(
                    value = uiState.email,
                    onValueChange = { },
                    label = stringResource(R.string.edit_profile_email_label),
                    readOnly = true,
                    enabled = false,
                    leadingIcon = { Icon(Icons.Outlined.Email, contentDescription = null) },
                    keyboardOptions = KeyboardOptions(imeAction = ImeAction.Done),
                    keyboardActions = KeyboardActions(onDone = {
                        focusManager.clearFocus()
                        keyboardController?.hide()
                    }),
                    modifier = Modifier.fillMaxWidth()
                )
                Spacer(modifier = Modifier.height(24.dp))
            }
        }
    }

    if (showBottomSheet) {
        ModalBottomSheet(
            onDismissRequest = { showBottomSheet = false },
            sheetState = sheetState
        ) {
            Column(modifier = Modifier.padding(bottom = 32.dp)) {
                ListItem(
                    headlineContent = { Text(stringResource(R.string.avatar_option_gallery)) },
                    leadingContent = { Icon(Icons.Filled.PhotoLibrary, contentDescription = null) },
                    modifier = Modifier.clickable {
                        scope.launch { sheetState.hide() }.invokeOnCompletion {
                            if (!sheetState.isVisible) showBottomSheet = false
                        }
                        galleryLauncher.launch("image/*")
                    }
                )
                ListItem(
                    headlineContent = { Text(stringResource(R.string.avatar_option_take_photo)) },
                    leadingContent = { Icon(Icons.Filled.PhotoCamera, contentDescription = null) },
                    modifier = Modifier.clickable {
                        if (cameraPermissionState.status.isGranted) {
                            scope.launch { sheetState.hide() }.invokeOnCompletion {
                                if (!sheetState.isVisible) showBottomSheet = false
                            }
                            cameraLauncher.launch(null)
                        } else {
                            cameraPermissionState.launchPermissionRequest()
                            scope.launch {
                                sheetState.hide()
                            }.invokeOnCompletion {
                                if (!sheetState.isVisible) showBottomSheet = false
                            }
                        }
                    }
                )
                ListItem(
                    headlineContent = { Text(stringResource(R.string.avatar_option_remove)) },
                    leadingContent = { Icon(Icons.Filled.Delete, contentDescription = null) },
                    modifier = Modifier.clickable {
                        viewModel.onAvatarUriSelected(null)
                        viewModel.setProfileImageUrl(null)
                        scope.launch { sheetState.hide() }.invokeOnCompletion {
                            if (!sheetState.isVisible) showBottomSheet = false
                        }
                    }
                )
            }
        }
    }
}