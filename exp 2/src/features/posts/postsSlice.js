import { createSlice, createAsyncThunk, createEntityAdapter, nanoid } from '@reduxjs/toolkit'
import { fetchPosts, createPostRequest } from '../../api/mockApi'

const postsAdapter = createEntityAdapter({
  // keep newest posts first
  sortComparer: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
})

export const loadPosts = createAsyncThunk('posts/loadPosts', async () => {
  const data = await fetchPosts()
  return data
})

export const addPostAsync = createAsyncThunk(
  'posts/addPostAsync',
  async (newPost) => {
    const data = await createPostRequest(newPost)
    return data
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState: postsAdapter.getInitialState({
    status: 'idle',
    error: null,
  }),
  reducers: {
    // Synchronous CRUD reducers (no mock API round trip needed)
    postAdded: {
      reducer(state, action) {
        postsAdapter.addOne(state, action.payload)
      },
      prepare({ title, content, platformId, status }) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            platformId,
            status: status || 'draft',
            createdAt: new Date().toISOString(),
          },
        }
      },
    },
    postUpdated(state, action) {
      const { id, changes } = action.payload
      postsAdapter.updateOne(state, { id, changes })
    },
    postDeleted(state, action) {
      postsAdapter.removeOne(state, action.payload)
    },
    postStatusChanged(state, action) {
      const { id, status } = action.payload
      postsAdapter.updateOne(state, { id, changes: { status } })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        postsAdapter.setAll(state, action.payload)
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addPostAsync.fulfilled, (state, action) => {
        postsAdapter.addOne(state, action.payload)
      })
  },
})

export const { postAdded, postUpdated, postDeleted, postStatusChanged } = postsSlice.actions
export default postsSlice.reducer

// Normalized selectors
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state) => state.posts)

export const selectPostsStatus = (state) => state.posts.status
