import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../features/posts/postsSlice'
import platformsReducer from '../features/platforms/platformsSlice'
import draftsReducer from '../features/drafts/draftsSlice'

// This is the single, centralized store (single source of truth).
// Each slice manages its own normalized "table" of state, similar to
// tables in a relational database (ids[] + entities{}).
export const store = configureStore({
  reducer: {
    posts: postsReducer,
    platforms: platformsReducer,
    drafts: draftsReducer,
  },
})
