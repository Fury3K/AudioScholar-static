package edu.cit.audioscholar.domain.repository

import android.net.Uri
import edu.cit.audioscholar.data.local.model.RecordingMetadata
import edu.cit.audioscholar.data.local.model.UserNoteEntity
import kotlinx.coroutines.flow.Flow

interface LocalAudioRepository {
    fun getRecordingMetadata(filePath: String): Flow<Result<RecordingMetadata>>
    fun getLocalRecordings(): Flow<List<RecordingMetadata>>
    suspend fun deleteLocalRecording(metadata: RecordingMetadata): Boolean
    suspend fun deleteLocalRecordings(filePaths: List<String>): Boolean
    suspend fun updateRecordingTitle(filePath: String, newTitle: String): Boolean
    suspend fun updateRemoteRecordingId(localFilePath: String, remoteId: String): Boolean
    suspend fun updateAttachmentUri(filePath: String, uri: String?): Boolean
    suspend fun importAudioFile(sourceUri: Uri, originalFileName: String, title: String?, description: String?): Result<RecordingMetadata>

    suspend fun saveMetadata(metadata: RecordingMetadata): Boolean
    fun getMetadataByRemoteId(remoteId: String): Flow<RecordingMetadata?>
    suspend fun updateFavoriteStatus(filePath: String, isFavorite: Boolean): Boolean

    // Note Operations
    fun getNotesForRecording(filePath: String): Flow<List<UserNoteEntity>>
    suspend fun createLocalNote(filePath: String, content: String, tags: List<String>): UserNoteEntity
    suspend fun updateLocalNote(note: UserNoteEntity)
    suspend fun deleteLocalNote(noteId: String)
    suspend fun syncPendingNotes(filePath: String, remoteRecordingId: String)
}