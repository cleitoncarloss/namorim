/**
 * useAvatar - Hook para gerenciamento de avatar
 * Regra 010: Single Responsibility Principle
 */

import { useState, useEffect, useCallback } from 'react';
import { StorageService } from '../services/storageService';

export function useAvatar(initialUrl) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const downloadAvatar = useCallback(async (path) => {
    if (!path) {
      setAvatarUrl(null);
      return;
    }

    setLoading(true);
    setError(null);

    const { url, error: downloadError } = await StorageService.downloadAvatar(path);

    if (downloadError) {
      setError(downloadError.message);
    } else {
      setAvatarUrl(url);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    downloadAvatar(initialUrl);
  }, [initialUrl, downloadAvatar]);

  const uploadAvatar = useCallback(async (file) => {
    setUploading(true);
    setError(null);

    const { path, error: uploadError } = await StorageService.uploadAvatar(file);

    setUploading(false);

    if (uploadError) {
      setError(uploadError.message);
      return { success: false, error: uploadError.message };
    }

    await downloadAvatar(path);
    return { success: true, path };
  }, [downloadAvatar]);

  return {
    avatarUrl,
    loading,
    uploading,
    error,
    uploadAvatar,
    refreshAvatar: downloadAvatar,
  };
}

export function usePublicAvatarUrl(path) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (path) {
      setUrl(StorageService.getPublicUrl(path));
    } else {
      setUrl(null);
    }
  }, [path]);

  return url;
}
