package edu.cit.audioscholar.data.remote.dto

import com.google.gson.Gson
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class AudioMetadataDtoTest {

    @Test
    fun `deserialization maps favorite json field to isFavorite property`() {
        // This JSON represents the payload sent by the backend (AudioMetadata.java serialized by Jackson)
        // Jackson serializes isFavorite() getter to "favorite"
        val json = """
            {
                "id": "123",
                "favorite": true,
                "title": "Test Recording"
            }
        """.trimIndent()

        val gson = Gson()
        val dto = gson.fromJson(json, AudioMetadataDto::class.java)

        assertTrue("isFavorite should be true when 'favorite' field is true in JSON", dto.isFavorite == true)
        assertEquals("Test Recording", dto.title)
    }
    
    @Test
    fun `deserialization handles false favorite state`() {
        val json = """
            {
                "id": "124",
                "favorite": false,
                "title": "Test Recording 2"
            }
        """.trimIndent()

        val gson = Gson()
        val dto = gson.fromJson(json, AudioMetadataDto::class.java)

        assertTrue("isFavorite should be false", dto.isFavorite == false)
    }
}