package edu.cit.audioscholar.ui.theme

import android.app.Activity
import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat
import edu.cit.audioscholar.ui.settings.ThemeStyle

private val QuantumDarkColorScheme = darkColorScheme(
    primary = Quantum_Dark_Primary,
    onPrimary = Quantum_Dark_OnPrimary,
    secondary = Quantum_Dark_Secondary,
    onSecondary = Quantum_Dark_OnSecondary,
    background = Quantum_Dark_Background,
    onBackground = Quantum_Dark_OnBackground,
    surface = Quantum_Dark_Surface,
    onSurface = Quantum_Dark_OnSurface
)

private val QuantumLightColorScheme = lightColorScheme(
    primary = Quantum_Light_Primary,
    onPrimary = Quantum_Light_OnPrimary,
    secondary = Quantum_Light_Secondary,
    onSecondary = Quantum_Light_OnSecondary,
    background = Quantum_Light_Background,
    onBackground = Quantum_Light_OnBackground,
    surface = Quantum_Light_Surface,
    onSurface = Quantum_Light_OnSurface
)

private val ZenDarkColorScheme = darkColorScheme(
    primary = Zen_Dark_Primary,
    onPrimary = Zen_Dark_OnPrimary,
    secondary = Zen_Dark_Secondary,
    onSecondary = Zen_Dark_OnSecondary,
    background = Zen_Dark_Background,
    onBackground = Zen_Dark_OnBackground,
    surface = Zen_Dark_Surface,
    onSurface = Zen_Dark_OnSurface
)

private val ZenLightColorScheme = lightColorScheme(
    primary = Zen_Light_Primary,
    onPrimary = Zen_Light_OnPrimary,
    secondary = Zen_Light_Secondary,
    onSecondary = Zen_Light_OnSecondary,
    background = Zen_Light_Background,
    onBackground = Zen_Light_OnBackground,
    surface = Zen_Light_Surface,
    onSurface = Zen_Light_OnSurface
)

private val DarkColorScheme = darkColorScheme(
    primary = md_theme_dark_primary,
    onPrimary = md_theme_dark_onPrimary,
    primaryContainer = md_theme_dark_primaryContainer,
    onPrimaryContainer = md_theme_dark_onPrimaryContainer,
    secondary = md_theme_dark_secondary,
    onSecondary = md_theme_dark_onSecondary,
    secondaryContainer = md_theme_dark_secondaryContainer,
    onSecondaryContainer = md_theme_dark_onSecondaryContainer,
    tertiary = md_theme_dark_tertiary,
    onTertiary = md_theme_dark_onTertiary,
    tertiaryContainer = md_theme_dark_tertiaryContainer,
    onTertiaryContainer = md_theme_dark_onTertiaryContainer,
    error = md_theme_dark_error,
    errorContainer = md_theme_dark_errorContainer,
    onError = md_theme_dark_onError,
    onErrorContainer = md_theme_dark_onErrorContainer,
    background = md_theme_dark_background,
    onBackground = md_theme_dark_onBackground,
    surface = md_theme_dark_surface,
    onSurface = md_theme_dark_onSurface,
    surfaceVariant = md_theme_dark_surfaceVariant,
    onSurfaceVariant = md_theme_dark_onSurfaceVariant,
    outline = md_theme_dark_outline,
    inverseOnSurface = md_theme_dark_inverseOnSurface,
    inverseSurface = md_theme_dark_inverseSurface,
    inversePrimary = md_theme_dark_inversePrimary,
    surfaceTint = md_theme_dark_surfaceTint,
    outlineVariant = md_theme_dark_outlineVariant,
    scrim = md_theme_dark_scrim,
)

private val LightColorScheme = lightColorScheme(
    primary = md_theme_light_primary,
    onPrimary = md_theme_light_onPrimary,
    primaryContainer = md_theme_light_primaryContainer,
    onPrimaryContainer = md_theme_light_onPrimaryContainer,
    secondary = md_theme_light_secondary,
    onSecondary = md_theme_light_onSecondary,
    secondaryContainer = md_theme_light_secondaryContainer,
    onSecondaryContainer = md_theme_light_onSecondaryContainer,
    tertiary = md_theme_light_tertiary,
    onTertiary = md_theme_light_onTertiary,
    tertiaryContainer = md_theme_light_tertiaryContainer,
    onTertiaryContainer = md_theme_light_onTertiaryContainer,
    error = md_theme_light_error,
    errorContainer = md_theme_light_errorContainer,
    onError = md_theme_light_onError,
    onErrorContainer = md_theme_light_onErrorContainer,
    background = md_theme_light_background,
    onBackground = md_theme_light_onBackground,
    surface = md_theme_light_surface,
    onSurface = md_theme_light_onSurface,
    surfaceVariant = md_theme_light_surfaceVariant,
    onSurfaceVariant = md_theme_light_onSurfaceVariant,
    outline = md_theme_light_outline,
    inverseOnSurface = md_theme_light_inverseOnSurface,
    inverseSurface = md_theme_light_inverseSurface,
    inversePrimary = md_theme_light_inversePrimary,
    surfaceTint = md_theme_light_surfaceTint,
    outlineVariant = md_theme_light_outlineVariant,
    scrim = md_theme_light_scrim,
)

@Composable
fun AudioScholarTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    themeStyle: ThemeStyle = ThemeStyle.Classic,
    dynamicColor: Boolean = false,
    content: @Composable () -> Unit
) {
    val colorScheme = when {
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
            val context = LocalContext.current
            if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
        }
        themeStyle == ThemeStyle.Quantum -> if (darkTheme) QuantumDarkColorScheme else QuantumLightColorScheme
        themeStyle == ThemeStyle.Zen -> if (darkTheme) ZenDarkColorScheme else ZenLightColorScheme
        darkTheme -> DarkColorScheme
        else -> LightColorScheme
    }
    val view = LocalView.current
    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as Activity).window

            if (darkTheme) {
                window.statusBarColor = colorScheme.background.toArgb()
            } else {
                window.statusBarColor = colorScheme.background.toArgb()
            }
            window.navigationBarColor = colorScheme.surface.toArgb()

            val insetsController = WindowCompat.getInsetsController(window, view)

            insetsController.isAppearanceLightStatusBars = !darkTheme

            insetsController.isAppearanceLightNavigationBars = !darkTheme

            WindowCompat.setDecorFitsSystemWindows(window, true)
        }
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}