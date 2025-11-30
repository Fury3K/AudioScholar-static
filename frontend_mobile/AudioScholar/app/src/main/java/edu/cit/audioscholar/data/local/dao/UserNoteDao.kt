package edu.cit.audioscholar.data.local.dao

import androidx.room.*
import edu.cit.audioscholar.data.local.model.UserNoteEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface UserNoteDao {
    @Query("SELECT * FROM user_notes WHERE recordingFilePath = :filePath ORDER BY createdAt DESC")
    fun getNotesForRecording(filePath: String): Flow<List<UserNoteEntity>>

    @Query("SELECT * FROM user_notes WHERE isSynced = 0")
    suspend fun getUnsyncedNotes(): List<UserNoteEntity>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertNote(note: UserNoteEntity)

    @Delete
    suspend fun deleteNote(note: UserNoteEntity)

    @Query("DELETE FROM user_notes WHERE id = :noteId")
    suspend fun deleteNoteById(noteId: String)

    @Query("UPDATE user_notes SET isSynced = 1, remoteNoteId = :remoteId WHERE id = :localId")
    suspend fun markAsSynced(localId: String, remoteId: String)
}