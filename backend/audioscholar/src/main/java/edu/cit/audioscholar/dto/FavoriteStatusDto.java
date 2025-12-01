package edu.cit.audioscholar.dto;

public class FavoriteStatusDto {
	private String recordingId;
	private boolean isFavorite;
	private int favoriteCount;

	public FavoriteStatusDto() {
	}

	public FavoriteStatusDto(String recordingId, boolean isFavorite, int favoriteCount) {
		this.recordingId = recordingId;
		this.isFavorite = isFavorite;
		this.favoriteCount = favoriteCount;
	}

	public String getRecordingId() {
		return recordingId;
	}

	public void setRecordingId(String recordingId) {
		this.recordingId = recordingId;
	}

	public boolean isFavorite() {
		return isFavorite;
	}

	public void setFavorite(boolean favorite) {
		isFavorite = favorite;
	}

	public int getFavoriteCount() {
		return favoriteCount;
	}

	public void setFavoriteCount(int favoriteCount) {
		this.favoriteCount = favoriteCount;
	}
}
