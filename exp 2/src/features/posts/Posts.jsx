import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  loadPosts,
  addPostAsync,
  postDeleted,
  postStatusChanged,
  selectAllPosts,
  selectPostsStatus,
} from './postsSlice'
import { selectAllPlatforms } from '../platforms/platformsSlice'
import Platforms from '../platforms/Platforms'

const STATUS_LABEL = {
  draft: 'Draft',
  scheduled: 'Scheduled',
  published: 'Published',
}

export default function Posts() {
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts)
  const status = useSelector(selectPostsStatus)
  const platforms = useSelector(selectAllPlatforms)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [platformId, setPlatformId] = useState('')

  useEffect(() => {
    if (status === 'idle') {
      dispatch(loadPosts())
    }
  }, [status, dispatch])

  const platformName = (id) => platforms.find((p) => p.id === id)?.name || 'Unknown'

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim() || !platformId) return

    // Demonstrates the async-thunk flow: dispatch -> mock API -> fulfilled -> store update
    dispatch(addPostAsync({ title, content, platformId, status: 'draft' }))

    setTitle('')
    setContent('')
    setPlatformId('')
  }

  return (
    <div className="posts-panel">
      <form className="post-form" onSubmit={handleSubmit}>
        <h2>Create a post</h2>

        <label>
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post title" />
        </label>

        <label>
          Content
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What do you want to share?"
            rows={3}
          />
        </label>

        <div className="field-group">
          <span className="field-label">Platform</span>
          <Platforms selectedPlatformId={platformId} onSelect={setPlatformId} />
        </div>

        <button type="submit" className="primary-btn">Add post</button>
      </form>

      <div className="post-list">
        <h2>Posts {status === 'loading' && <span className="muted">(loading…)</span>}</h2>

        {posts.length === 0 && status === 'succeeded' && (
          <p className="muted">No posts yet. Create one above.</p>
        )}

        {posts.map((post) => (
          <article key={post.id} className={`post-card status-${post.status}`}>
            <header>
              <h3>{post.title}</h3>
              <span className={`badge badge-${post.status}`}>{STATUS_LABEL[post.status]}</span>
            </header>
            <p>{post.content}</p>
            <footer>
              <span className="muted">{platformName(post.platformId)}</span>

              <select
                value={post.status}
                onChange={(e) => dispatch(postStatusChanged({ id: post.id, status: e.target.value }))}
              >
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
                <option value="published">Published</option>
              </select>

              <button
                type="button"
                className="danger-btn"
                onClick={() => dispatch(postDeleted(post.id))}
              >
                Delete
              </button>
            </footer>
          </article>
        ))}
      </div>
    </div>
  )
}
