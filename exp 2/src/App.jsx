import Posts from './features/posts/Posts'
import Drafts from './features/drafts/Drafts'
import './App.css'

export default function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Redux Toolkit Experiment</h1>
        <p className="muted">Centralized state management for posts, platforms &amp; drafts</p>
      </header>

      <main className="app-main">
        <Posts />
        <Drafts />
      </main>
    </div>
  )
}
