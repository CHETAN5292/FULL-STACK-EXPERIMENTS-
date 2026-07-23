import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadPlatforms, selectAllPlatforms } from './platformsSlice'

export default function Platforms({ selectedPlatformId, onSelect }) {
  const dispatch = useDispatch()
  const platforms = useSelector(selectAllPlatforms)
  const status = useSelector((state) => state.platforms.status)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(loadPlatforms())
    }
  }, [status, dispatch])

  if (status === 'loading') return <p className="muted">Loading platforms…</p>

  return (
    <div className="platform-list">
      {platforms.map((platform) => (
        <button
          key={platform.id}
          className={`platform-chip ${selectedPlatformId === platform.id ? 'active' : ''}`}
          onClick={() => onSelect?.(platform.id)}
          type="button"
        >
          <span className="platform-icon">{platform.icon}</span>
          {platform.name}
        </button>
      ))}
    </div>
  )
}
