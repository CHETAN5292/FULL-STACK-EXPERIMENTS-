// Mock API (Conceptual / Simulated Backend)
// Simulates network latency and a realistic chance of transient failure so
// the loading / error / retry / toast machinery has something real to do,
// even with no backend running.

const LATENCY_MS = 700;
const SIMULATED_FAILURE_RATE = 0.2; // ~1 in 5 calls fails, to exercise retry logic

export function saveDraftMock(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!data || !data.content || !data.content.trim()) {
        reject({ error: 'Invalid data: draft content is empty.' });
        return;
      }
      if (Math.random() < SIMULATED_FAILURE_RATE) {
        reject({ error: 'Network error: could not reach server.' });
        return;
      }
      resolve({ success: true, id: data.id, savedAt: new Date().toISOString() });
    }, LATENCY_MS);
  });
}

export function deleteDraftMock(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < SIMULATED_FAILURE_RATE) {
        reject({ error: 'Network error: delete failed.' });
        return;
      }
      resolve({ success: true, id });
    }, LATENCY_MS / 2);
  });
}
