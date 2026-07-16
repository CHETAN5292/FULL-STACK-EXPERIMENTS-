import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PlatformSelector from './PlatformSelector';
import LimitGauge from './LimitGauge';
import { usePostForm } from '../hooks/usePostForm';
import { saveDraftMock } from '../utils/mockApi';
import { retry } from '../utils/retry';

export default function PostComposer({ editingDraft, onSaved, onCancelEdit, addOrUpdateDraft }) {
  const form = usePostForm('twitter');
  const [loading, setLoading] = useState(false);

  // When a draft is selected for editing, hydrate the form (controlled by parent)
  const activeId = editingDraft?.id;

  useEffect(() => {
    if (editingDraft) form.loadDraft(editingDraft);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingDraft]);

  const { content, platform, activePlatform, validation, handleContentChange, handlePlatformChange, reset } = form;

  const handleSave = async () => {
    if (!validation.valid) {
      toast.error(validation.message);
      return;
    }

    const draft = {
      id: activeId || `draft_${Date.now()}`,
      platform,
      content,
      updatedAt: new Date().toISOString()
    };

    setLoading(true);
    try {
      // Retry logic wraps the mock API call: up to 2 retries on failure
      await retry(() => saveDraftMock(draft), 2, 500);
      addOrUpdateDraft(draft);
      toast.success(activeId ? 'Draft updated.' : 'Draft saved.');
      reset();
      onSaved?.();
    } catch (err) {
      toast.error(err?.error || 'Failed to save draft after retries.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="composer-card">
      <div className="composer-card__header">
        <h2>{activeId ? 'Edit draft' : 'New post'}</h2>
        <span className="composer-card__eyebrow" style={{ color: activePlatform.color }}>
          {activePlatform.hint}
        </span>
      </div>

      <PlatformSelector value={platform} onChange={handlePlatformChange} />

      <label htmlFor="post-content" className="field-label">
        Content
      </label>
      <textarea
        id="post-content"
        className="composer-textarea"
        value={content}
        onChange={handleContentChange}
        placeholder={`Write your ${activePlatform.label} post...`}
        rows={8}
      />

      <LimitGauge length={content.length} limit={activePlatform.limit} color={activePlatform.color} />

      <div className="composer-meta">
        <span className="composer-meta__count">
          {content.length} / {activePlatform.limit}
        </span>
        {!validation.valid && content.length > 0 && (
          <span className="composer-meta__error">{validation.message}</span>
        )}
      </div>

      <div className="composer-actions">
        {activeId && (
          <button type="button" className="btn btn--ghost" onClick={onCancelEdit} disabled={loading}>
            Cancel edit
          </button>
        )}
        <button
          type="button"
          className="btn btn--primary"
          onClick={handleSave}
          disabled={loading || !validation.valid}
        >
          {loading ? 'Saving…' : activeId ? 'Update draft' : 'Save draft'}
        </button>
      </div>
    </section>
  );
}
