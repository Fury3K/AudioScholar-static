package edu.cit.audioscholar.data.remote.dto

data class FavoriteStatusDto(
    val recordingId: String,
    val isFavorite: Boolean,
    val favoriteCount: Int
)