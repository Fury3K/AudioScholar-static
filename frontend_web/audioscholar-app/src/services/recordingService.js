// Static demo mode - toggle favorite in local state only
import { DEMO_RECORDINGS } from '../data/mockData';

export const recordingService = {
  toggleFavorite: async (recordingId) => {
    // In static mode, the optimistic UI update in the component handles this
    const rec = DEMO_RECORDINGS.find(r => r.id === recordingId);
    if (rec) {
      rec.isFavorite = !rec.isFavorite;
      rec.favoriteCount = (rec.favoriteCount || 0) + (rec.isFavorite ? 1 : -1);
    }
    return { success: true };
  }
};
