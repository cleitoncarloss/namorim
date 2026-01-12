/**
 * Avatar - Componente de avatar com upload
 * Regra 010: Single Responsibility Principle
 * Regra 040: Validação de input
 * Regra 053: Prevenção de path traversal
 */

import React from 'react';
import { useAvatar } from '../hooks/useAvatar';
import { STORAGE } from '../constants';

export default function Avatar({ url, size, onUpload }) {
  const { avatarUrl, uploading, error, uploadAvatar } = useAvatar(url);

  const handleFileChange = async (event) => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];
    const { success, path, error: uploadError } = await uploadAvatar(file);

    if (success && onUpload) {
      onUpload(event, path);
    }
  };

  const acceptedTypes = STORAGE.ALLOWED_IMAGE_TYPES.join(',');

  return (
    <div>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="avatar image"
          style={{ height: size, width: size }}
        />
      ) : (
        <div className="avatar no-image" style={{ height: size, width: size }} />
      )}
      <div style={{ width: size }}>
        <label className="button primary block" htmlFor="avatar-upload">
          {uploading ? 'Enviando...' : 'Upload'}
        </label>
        <input
          style={{
            visibility: 'hidden',
            position: 'absolute',
          }}
          type="file"
          id="avatar-upload"
          accept={acceptedTypes}
          onChange={handleFileChange}
          disabled={uploading}
        />
      </div>
      {error && (
        <p style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '8px' }}>
          {error}
        </p>
      )}
    </div>
  );
}
