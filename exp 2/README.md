# Redux Toolkit Experiment — Centralized State Management

A React + Redux Toolkit app that manages **posts**, **platforms**, and **drafts**
using a normalized, centralized store. Built to demonstrate:

- Global state management (single source of truth)
- `createSlice` reducers for CRUD operations
- `createEntityAdapter` for normalized state (ids[] + entities{})
- `createAsyncThunk` for async data flows (mock API with simulated latency)
- Connecting components to the store with `useSelector` / `useDispatch`

## Project structure

```
src/
  api/mockApi.js               mock backend (simulated fetch delay)
  store/store.js               configureStore() — the single global store
  features/
    posts/postsSlice.js        posts slice (normalized, async thunks, CRUD)
    posts/Posts.jsx            post list + create form
    platforms/platformsSlice.js platforms slice (normalized, async thunk)
    platforms/Platforms.jsx    platform picker chips
    drafts/draftsSlice.js      standalone drafts slice
    drafts/Drafts.jsx          derived-selector view of draft posts
  App.jsx / main.jsx           app shell + Redux <Provider>
```

## Run locally

```
npm install
npm run dev
```

Then open the URL shown in the terminal (usually http://localhost:5173).

## Build for production

```
npm run build
npm run preview
```

## What to try in the app

1. Wait for the platform chips and posts to load (simulated network delay).
2. Fill in the "Create a post" form, pick a platform, and submit — this
   dispatches an async thunk that "calls" the mock API and adds the result
   to the store.
3. Change a post's status dropdown between Draft / Scheduled / Published —
   watch the Drafts panel on the right update automatically, since it's
   derived from the same normalized `posts` state.
4. Delete a post and see the list update immediately.
