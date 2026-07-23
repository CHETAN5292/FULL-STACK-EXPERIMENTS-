import { createSlice, createEntityAdapter, nanoid } from '@reduxjs/toolkit'

// Drafts represent posts that have not been published yet. Keeping this as
// its own slice (rather than filtering the posts slice) demonstrates how
// Redux Toolkit lets you split state by "domain" instead of by screen.
const draftsAdapter = createEntityAdapter()

const draftsSlice = createSlice({
  name: 'drafts',
  initialState: draftsAdapter.getInitialState(),
  reducers: {
    draftSaved: {
      reducer(state, action) {
        draftsAdapter.upsertOne(state, action.payload)
      },
      prepare({ id, title, content, platformId }) {
        return {
          payload: {
            id: id || nanoid(),
            title,
            content,
            platformId,
            savedAt: new Date().toISOString(),
          },
        }
      },
    },
    draftDiscarded(state, action) {
      draftsAdapter.removeOne(state, action.payload)
    },
  },
})

export const { draftSaved, draftDiscarded } = draftsSlice.actions
export default draftsSlice.reducer

export const {
  selectAll: selectAllDrafts,
  selectById: selectDraftById,
} = draftsAdapter.getSelectors((state) => state.drafts)
