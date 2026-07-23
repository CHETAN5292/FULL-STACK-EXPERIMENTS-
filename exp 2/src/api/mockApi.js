// Simulated backend. In a real app these functions would call fetch()/axios
// against a real server. We use setTimeout to mimic network latency so the
// async thunk / loading-state flow in the slices can be demonstrated.

const MOCK_PLATFORMS = [
  { id: 'p1', name: 'Twitter / X', icon: '𝕏', charLimit: 280 },
  { id: 'p2', name: 'Instagram', icon: '📷', charLimit: 2200 },
  { id: 'p3', name: 'LinkedIn', icon: '💼', charLimit: 3000 },
  { id: 'p4', name: 'Facebook', icon: '👍', charLimit: 63206 },
]

const MOCK_POSTS = [
  {
    id: 'post1',
    title: 'Launch announcement',
    content: 'We just shipped our new feature! Check it out.',
    platformId: 'p1',
    status: 'published',
    createdAt: '2026-07-01T09:00:00Z',
  },
  {
    id: 'post2',
    title: 'Behind the scenes',
    content: 'Here is how our team built the latest release.',
    platformId: 'p3',
    status: 'scheduled',
    createdAt: '2026-07-05T10:30:00Z',
  },
  {
    id: 'post3',
    title: 'Weekend photo dump',
    content: 'Some highlights from this week.',
    platformId: 'p2',
    status: 'draft',
    createdAt: '2026-07-10T14:15:00Z',
  },
]

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function fetchPlatforms() {
  await delay(500)
  return MOCK_PLATFORMS
}

export async function fetchPosts() {
  await delay(700)
  return MOCK_POSTS
}

export async function createPostRequest(post) {
  await delay(400)
  return { ...post, id: `post_${Date.now()}`, createdAt: new Date().toISOString() }
}
