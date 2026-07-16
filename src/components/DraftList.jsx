import { useState } from 'react';
import { toast } from 'react-toastify';
import DraftCard from './DraftCard';
import { deleteDraftMock } from '../utils/mockApi';
import { retry } from '../utils/retry';

export default function DraftList({ drafts, onEdit, deleteDraft }) {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await retry(() => deleteDraftMock(id), 2, 400);
      deleteDraft(id);
      toast.success('Draft deleted.');
    } catch (err) {
      toast.error(err?.error || 'Failed to delete draft after retries.');
    } finally {
      setDeletingId(null);
    }
  };

  if (drafts.length === 0) {
    return (
      <div className="draft-list draft-list--empty">
        <p className="draft-list__empty-title">No drafts yet</p>
        <p className="draft-list__empty-body">Save a post on the left — it'll show up here as a card.</p>
      </div>
    );
  }

  return (
    <div className="draft-list">
      {drafts.map((draft) => (
        <DraftCard
          key={draft.id}
          draft={draft}
          onEdit={onEdit}
          onDelete={handleDelete}
          deleting={deletingId === draft.id}
        />
      ))}
    </div>
  );
}
