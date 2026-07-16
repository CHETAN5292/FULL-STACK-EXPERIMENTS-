import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'post-composer:drafts';

function loadDrafts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Custom hook: reusable draft CRUD logic + localStorage persistence,
 * kept out of the UI layer (Separation of Concerns).
 */
export function useDrafts() {
  const [drafts, setDrafts] = useState(loadDrafts);

  // Persist whenever drafts change (state-based persistence -> localStorage)
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
  }, [drafts]);

  const addOrUpdateDraft = useCallback((draft) => {
    setDrafts((prev) => {
      const exists = prev.some((d) => d.id === draft.id);
      if (exists) {
        return prev.map((d) => (d.id === draft.id ? draft : d));
      }
      return [draft, ...prev];
    });
  }, []);

  const deleteDraft = useCallback((id) => {
    setDrafts((prev) => prev.filter((d) => d.id !== id));
  }, []);

  return { drafts, addOrUpdateDraft, deleteDraft };
}
