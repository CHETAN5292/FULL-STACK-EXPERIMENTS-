// Retry Logic Patterns & Fault Tolerance
// Reattempts a failing async operation with a fixed retry budget and a
// small delay between attempts, then surfaces a final error if every
// attempt is exhausted.

/**
 * @param {() => Promise<any>} fn - the async operation to attempt
 * @param {number} retries - number of retries left
 * @param {number} delayMs - delay before each retry
 */
export async function retry(fn, retries = 2, delayMs = 500) {
  try {
    return await fn();
  } catch (err) {
    if (retries > 0) {
      await new Promise((res) => setTimeout(res, delayMs));
      return retry(fn, retries - 1, delayMs);
    }
    throw err;
  }
}
