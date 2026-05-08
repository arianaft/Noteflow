import { create } from 'zustand';
import { Note, ChecklistNote, IdeaNote } from '../types';

interface NotesStore {
  notes: Note[];
  checklists: ChecklistNote[];
  ideas: IdeaNote[];

  // Acciones para notas
  addNote: (note: Note) => void;
  deleteNote: (id: string) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;

  // Acciones para checklists
  addChecklist: (checklist: ChecklistNote) => void;
  deleteChecklist: (id: string) => void;
  toggleChecklistItem: (checklistId: string, itemId: string) => void;

  // Acciones para ideas
  addIdea: (idea: IdeaNote) => void;
  deleteIdea: (id: string) => void;
}

export const useNotesStore = create<NotesStore>((set) => ({
  notes: [],
  checklists: [],
  ideas: [],

  // Notas
  addNote: (note) =>
    set((state) => ({ notes: [...state.notes, note] })),
  deleteNote: (id) =>
    set((state) => ({ notes: state.notes.filter((n) => n.id !== id) })),
  updateNote: (id, updates) =>
    set((state) => ({
      notes: state.notes.map((n) =>
        n.id === id ? { ...n, ...updates, updatedAt: new Date() } : n
      ),
    })),

  // Checklists
  addChecklist: (checklist) =>
    set((state) => ({ checklists: [...state.checklists, checklist] })),
  deleteChecklist: (id) =>
    set((state) => ({
      checklists: state.checklists.filter((c) => c.id !== id),
    })),
  toggleChecklistItem: (checklistId, itemId) =>
    set((state) => ({
      checklists: state.checklists.map((c) =>
        c.id !== checklistId
          ? c
          : {
              ...c,
              items: c.items.map((i) =>
                i.id === itemId ? { ...i, isCompleted: !i.isCompleted } : i
              ),
            }
      ),
    })),

  // Ideas
  addIdea: (idea) =>
    set((state) => ({ ideas: [...state.ideas, idea] })),
  deleteIdea: (id) =>
    set((state) => ({ ideas: state.ideas.filter((i) => i.id !== id) })),
}));