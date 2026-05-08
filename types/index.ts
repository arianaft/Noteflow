// Item individual de un checklist
export interface ChecklistItem {
  id: string;
  text: string;
  isCompleted: boolean;
}

// Base común para todos los tipos de nota
export interface BaseNote {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

// Nota de texto libre (apuntes de clase)
export interface Note extends BaseNote {
  content: string;
}

// Lista de tareas (entregas y pendientes)
export interface ChecklistNote extends BaseNote {
  items: ChecklistItem[];
}

// Idea rápida (conceptos con etiqueta y color)
export interface IdeaNote extends BaseNote {
  tags: string[];
  color: string;
}

// Tipo unión para funciones que aceptan cualquier nota
export type AnyNote = Note | ChecklistNote | IdeaNote;

// Type guards para distinguir tipos en tiempo de ejecución
export const isNote = (note: AnyNote): note is Note => {
  return 'content' in note;
};

export const isChecklistNote = (note: AnyNote): note is ChecklistNote => {
  return 'items' in note;
};

export const isIdeaNote = (note: AnyNote): note is IdeaNote => {
  return 'tags' in note;
};