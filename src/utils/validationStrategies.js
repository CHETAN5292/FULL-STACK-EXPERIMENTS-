// Strategy Design Pattern
// Instead of one big if/else chain, each platform owns a small,
// self-contained validation strategy. `validate()` just looks up the
// right strategy at runtime and delegates to it — swapping/adding a
// platform never touches this dispatch logic.

import { PLATFORMS } from './platforms';

export const strategies = {
  twitter: (text) => {
    const limit = PLATFORMS.twitter.limit;
    const remaining = limit - text.length;
    if (text.trim().length === 0) {
      return { valid: false, remaining, message: 'Tweet cannot be empty.' };
    }
    if (text.length > limit) {
      return { valid: false, remaining, message: `Exceeds Twitter's ${limit}-character limit.` };
    }
    return { valid: true, remaining, message: null };
  },
  linkedin: (text) => {
    const limit = PLATFORMS.linkedin.limit;
    const remaining = limit - text.length;
    if (text.trim().length === 0) {
      return { valid: false, remaining, message: 'Post cannot be empty.' };
    }
    if (text.length > limit) {
      return { valid: false, remaining, message: `Exceeds LinkedIn's ${limit}-character limit.` };
    }
    return { valid: true, remaining, message: null };
  },
  instagram: (text) => {
    const limit = PLATFORMS.instagram.limit;
    const remaining = limit - text.length;
    if (text.trim().length === 0) {
      return { valid: false, remaining, message: 'Caption cannot be empty.' };
    }
    if (text.length > limit) {
      return { valid: false, remaining, message: `Exceeds Instagram's ${limit}-character caption limit.` };
    }
    return { valid: true, remaining, message: null };
  }
};

/**
 * Dynamically selects and runs the validation strategy for the given platform.
 * @param {string} platformId
 * @param {string} text
 * @returns {{ valid: boolean, remaining: number, message: string|null }}
 */
export function validate(platformId, text) {
  const strategy = strategies[platformId];
  if (!strategy) {
    throw new Error(`No validation strategy registered for platform "${platformId}"`);
  }
  return strategy(text);
}
