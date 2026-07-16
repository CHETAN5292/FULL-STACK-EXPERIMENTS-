import { PLATFORMS } from '../utils/platforms';

function formatTime(iso) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export default function DraftCard({ draft, onEdit, onDelete, deleting }) {
  const platform = PLATFORMS[draft.platform];
  const preview = draft.content.length > 140 ? draft.content.slice(0, 140) + '…' : draft.content;

  return (
    <article className="draft-card" style={{ '--card-accent': platform.color }}>
      <div className="draft-card__tab">
        <span className="draft-card__platform">{platform.label}</span>
        <span className="draft-card__time">{formatTime(draft.updatedAt)}</span>
      </div>
      <p className="draft-card__preview">{preview}</p>
      <div className="draft-card__footer">
        <span className="draft-card__count">{draft.content.length} / {platform.limit}</span>
        <div className="draft-card__actions">
          <button type="button" className="btn btn--small btn--ghost" onClick={() => onEdit(draft)}>
            Edit
          </button>
          <button
            type="button"
            className="btn btn--small btn--danger"
            onClick={() => onDelete(draft.id)}
            disabled={deleting}
          >
            {deleting ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </article>
  );
}
