// Platform-Based Business Rules
// Each platform defines its own constraint. Adding a new platform only
// means adding an entry here + a matching strategy function — nothing
// else in the app needs to change (open/closed principle).

export const PLATFORMS = {
  twitter: {
    id: 'twitter',
    label: 'Twitter / X',
    limit: 280,
    color: '#1DA1F2',
    hint: 'Short-form. Every character counts.'
  },
  linkedin: {
    id: 'linkedin',
    label: 'LinkedIn',
    limit: 3000,
    color: '#0A66C2',
    hint: 'Long-form. Professional tone recommended.'
  },
  instagram: {
    id: 'instagram',
    label: 'Instagram',
    limit: 2200,
    color: '#DD2A7B',
    hint: 'Caption + hashtags share this limit.'
  }
};

export const PLATFORM_LIST = Object.values(PLATFORMS);
