import { useSelector } from 'react-redux'
import { selectAllPosts } from '../posts/postsSlice'
import { selectAllPlatforms } from '../platforms/platformsSlice'

// Rather than a separate manually-managed list, this view demonstrates a
// *derived selector*: "drafts" are simply posts whose status is 'draft'.
// This shows normalization paying off — no duplicated data, single source
// of truth in the posts slice, and the drafts slice can still be used for
// standalone/unsaved editor content.
export default function Drafts() {
  const posts = useSelector(selectAllPosts)
  const platforms = useSelector(selectAllPlatforms)
  const drafts = posts.filter((p) => p.status === 'draft')

  const platformName = (id) => platforms.find((p) => p.id === id)?.name || 'Unknown'

  return (
    <div className="drafts-panel">
      <h2>Drafts ({drafts.length})</h2>
      {drafts.length === 0 && <p className="muted">No drafts right now.</p>}
      <ul className="draft-list">
        {drafts.map((d) => (
          <li key={d.id}>
            <strong>{d.title}</strong>
            <span className="muted"> — {platformName(d.platformId)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
