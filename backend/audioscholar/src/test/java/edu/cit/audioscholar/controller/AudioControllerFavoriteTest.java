package edu.cit.audioscholar.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.Collections;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import edu.cit.audioscholar.dto.FavoriteStatusDto;
import edu.cit.audioscholar.model.AudioMetadata;
import edu.cit.audioscholar.model.User;
import edu.cit.audioscholar.service.AudioProcessingService;
import edu.cit.audioscholar.service.FirebaseService;
import edu.cit.audioscholar.service.RecordingService;
import edu.cit.audioscholar.service.UserService;

@ExtendWith(MockitoExtension.class)
public class AudioControllerFavoriteTest {

	private MockMvc mockMvc;

	@Mock
	private RecordingService recordingService;

	@Mock
	private UserService userService;

	@Mock
	private AudioProcessingService audioProcessingService;

	@Mock
	private FirebaseService firebaseService;

	@InjectMocks
	private AudioController audioController;

	private final String TEST_USER_ID = "testUser123";
	private final String RECORDING_ID = "rec123";

	@BeforeEach
	void setUp() {
		mockMvc = MockMvcBuilders.standaloneSetup(audioController).build();
		SecurityContextHolder.getContext()
				.setAuthentication(new UsernamePasswordAuthenticationToken(TEST_USER_ID, null, null));
	}

	@Test
	void toggleFavorite_TurnOn_Success() throws Exception {
		FavoriteStatusDto status = new FavoriteStatusDto(RECORDING_ID, true, 1);
		when(recordingService.toggleFavorite(TEST_USER_ID, RECORDING_ID)).thenReturn(status);

		mockMvc.perform(post("/api/audio/recordings/{id}/favorite", RECORDING_ID)).andExpect(status().isOk())
				.andExpect(jsonPath("$.favorite").value(true)).andExpect(jsonPath("$.favoriteCount").value(1));
	}

	@Test
	void toggleFavorite_TurnOff_Success() throws Exception {
		FavoriteStatusDto status = new FavoriteStatusDto(RECORDING_ID, false, 0);
		when(recordingService.toggleFavorite(TEST_USER_ID, RECORDING_ID)).thenReturn(status);

		mockMvc.perform(post("/api/audio/recordings/{id}/favorite", RECORDING_ID)).andExpect(status().isOk())
				.andExpect(jsonPath("$.favorite").value(false)).andExpect(jsonPath("$.favoriteCount").value(0));
	}

	@Test
	void getMyMetadata_PopulatesFavoriteFlag() throws Exception {
		User user = new User();
		user.setUserId(TEST_USER_ID);
		user.setFavoriteRecordingIds(Arrays.asList(RECORDING_ID));

		AudioMetadata metadata = new AudioMetadata();
		metadata.setRecordingId(RECORDING_ID);
		metadata.setUserId(TEST_USER_ID);

		when(userService.getUserById(TEST_USER_ID)).thenReturn(user);
		when(audioProcessingService.getAudioMetadataListForUser(anyString(), any(Integer.class), any()))
				.thenReturn(Arrays.asList(metadata));

		mockMvc.perform(get("/api/audio/metadata")).andExpect(status().isOk())
				.andExpect(jsonPath("$[0].recordingId").value(RECORDING_ID))
				.andExpect(jsonPath("$[0].favorite").value(true));
	}

	@Test
	void getRecordingDetails_PopulatesFavoriteFlag() throws Exception {
		User user = new User();
		user.setUserId(TEST_USER_ID);
		user.setFavoriteRecordingIds(Arrays.asList(RECORDING_ID));

		AudioMetadata metadata = new AudioMetadata();
		metadata.setRecordingId(RECORDING_ID);
		metadata.setUserId(TEST_USER_ID);

		when(userService.getUserById(TEST_USER_ID)).thenReturn(user);
		when(firebaseService.getAudioMetadataByRecordingId(RECORDING_ID)).thenReturn(metadata);

		mockMvc.perform(get("/api/audio/recordings/{recordingId}", RECORDING_ID)).andExpect(status().isOk())
				.andExpect(jsonPath("$.recordingId").value(RECORDING_ID)).andExpect(jsonPath("$.favorite").value(true));
	}

	@Test
	void getRecordingDetails_FavoriteIsFalse() throws Exception {
		User user = new User();
		user.setUserId(TEST_USER_ID);
		user.setFavoriteRecordingIds(Collections.emptyList());

		AudioMetadata metadata = new AudioMetadata();
		metadata.setRecordingId(RECORDING_ID);
		metadata.setUserId(TEST_USER_ID);

		when(userService.getUserById(TEST_USER_ID)).thenReturn(user);
		when(firebaseService.getAudioMetadataByRecordingId(RECORDING_ID)).thenReturn(metadata);

		mockMvc.perform(get("/api/audio/recordings/{recordingId}", RECORDING_ID)).andExpect(status().isOk())
				.andExpect(jsonPath("$.recordingId").value(RECORDING_ID))
				.andExpect(jsonPath("$.favorite").value(false));
	}
}
