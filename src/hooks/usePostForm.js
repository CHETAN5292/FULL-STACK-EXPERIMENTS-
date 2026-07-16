import { useState, useMemo, useCallback } from 'react';
import { validate } from '../utils/validationStrategies';
import { PLATFORMS } from '../utils/platforms';

/**
 * Custom hook: controlled post-composer form.
 * Bundles content + platform state with the Strategy-Pattern validation
 * result, recomputed on every change (single source of truth).
 */
export function usePostForm(initialPlatform = 'twitter') {
  const [content, setContent] = useState('');
  const [platform, setPlatform] = useState(initialPlatform);

  const handleContentChange = useCallback((e) => {
    setContent(e.target.value);
  }, []);

  const handlePlatformChange = useCallback((e) => {
    setPlatform(e.target.value);
  }, []);

  const validation = useMemo(() => validate(platform, content), [platform, content]);
  const activePlatform = PLATFORMS[platform];

  const reset = useCallback(() => {
    setContent('');
  }, []);

  const loadDraft = useCallback((draft) => {
    setContent(draft.content);
    setPlatform(draft.platform);
  }, []);

  return {
    content,
    platform,
    activePlatform,
    validation,
    handleContentChange,
    handlePlatformChange,
    reset,
    loadDraft,
    setContent,
    setPlatform
  };
}
