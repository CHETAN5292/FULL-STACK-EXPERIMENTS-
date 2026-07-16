import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostComposer from './components/PostComposer';
import DraftList from './components/DraftList';
import { useDrafts } from './hooks/useDrafts';
import './styles/index.css';

export default function App() {
  const { drafts, addOrUpdateDraft, deleteDraft } = useDrafts();
  const [editingDraft, setEditingDraft] = useState(null);

  return (
    <div className="app-shell">
      <header className="app-header">
        <span className="app-header__eyebrow">Unit 1 · Experiment 1</span>
        <h1 className="app-header__title">Draft Desk</h1>
        <p className="app-header__subtitle">
          Compose once, validate per platform, keep every version on file.
        </p>
      </header>

      <main className="app-grid">
        <PostComposer
          key={editingDraft?.id || 'new'}
          editingDraft={editingDraft}
          addOrUpdateDraft={addOrUpdateDraft}
          onSaved={() => setEditingDraft(null)}
          onCancelEdit={() => setEditingDraft(null)}
        />

        <section className="drafts-panel">
          <div className="drafts-panel__header">
            <h2>Saved drafts</h2>
            <span className="drafts-panel__count">{drafts.length}</span>
          </div>
          <DraftList drafts={drafts} onEdit={setEditingDraft} deleteDraft={deleteDraft} />
        </section>
      </main>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme="dark"
        toastClassName="app-toast"
      />
    </div>
  );
}
