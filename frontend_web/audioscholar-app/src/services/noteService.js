// Static demo mode - notes stored in memory
import { DEMO_NOTES } from '../data/mockData';

let noteIdCounter = 100;

export const noteService = {
  createNote: async (recordingId, content, tags = []) => {
    const newNote = {
      id: `note-${++noteIdCounter}`,
      recordingId,
      content,
      tags,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    if (!DEMO_NOTES[recordingId]) {
      DEMO_NOTES[recordingId] = [];
    }
    DEMO_NOTES[recordingId].push(newNote);
    return newNote;
  },

  getNotes: async (recordingId) => {
    return DEMO_NOTES[recordingId] || [];
  },

  getNote: async (noteId) => {
    for (const notes of Object.values(DEMO_NOTES)) {
      const found = notes.find(n => n.id === noteId);
      if (found) return found;
    }
    throw new Error('Note not found');
  },

  updateNote: async (noteId, content, tags = []) => {
    for (const notes of Object.values(DEMO_NOTES)) {
      const found = notes.find(n => n.id === noteId);
      if (found) {
        found.content = content;
        found.tags = tags;
        found.updatedAt = new Date().toISOString();
        return found;
      }
    }
    throw new Error('Note not found');
  },

  deleteNote: async (noteId) => {
    for (const [key, notes] of Object.entries(DEMO_NOTES)) {
      const idx = notes.findIndex(n => n.id === noteId);
      if (idx !== -1) {
        DEMO_NOTES[key].splice(idx, 1);
        return;
      }
    }
  },
};
