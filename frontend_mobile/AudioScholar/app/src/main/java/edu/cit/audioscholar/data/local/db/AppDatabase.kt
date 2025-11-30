package edu.cit.audioscholar.data.local.db

import androidx.room.Database
import androidx.room.RoomDatabase
import androidx.room.TypeConverters
import edu.cit.audioscholar.data.local.dao.RecordingMetadataDao
import edu.cit.audioscholar.data.local.dao.UserNoteDao
import edu.cit.audioscholar.data.local.model.RecordingMetadata
import edu.cit.audioscholar.data.local.model.UserNoteEntity

@Database(
    entities = [
        RecordingMetadata::class,
        UserNoteEntity::class
    ],
    version = 7,
    exportSchema = true
)
@TypeConverters(Converters::class)
abstract class AppDatabase : RoomDatabase() {
    abstract fun recordingMetadataDao(): RecordingMetadataDao
    abstract fun userNoteDao(): UserNoteDao
}
