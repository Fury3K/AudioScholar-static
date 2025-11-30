package edu.cit.audioscholar.data.local.model

import androidx.room.Entity
import androidx.room.PrimaryKey
import java.util.UUID

@Entity(tableName = "user_notes")
data class UserNoteEntity(
    @PrimaryKey
    val id: String = UUID.randomUUID().toString(),
    val recordingFilePath: String,
    val content: String,
    val tags: List<String> = emptyList(), // Requires TypeConverter
    val createdAt: String,
    val updatedAt: String,
    val isSynced: Boolean = false,
    val remoteNoteId: String? = null
)