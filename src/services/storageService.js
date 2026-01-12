/**
 * StorageService - Serviço de armazenamento (avatares)
 * Regra 010: Single Responsibility Principle
 * Regra 014: Dependency Inversion Principle
 * Regra 053: Prevenção de Path Traversal
 */

import { supabase } from './supabase';
import { STORAGE } from '../constants';
import { ImageFileValidator } from '../domain/validators';
import { generateUniqueId } from '../domain/utils';
import { ErrorHandler } from './errorHandler';

export const StorageService = {
  async uploadAvatar(file) {
    const validation = ImageFileValidator.validate(file);
    if (!validation.valid) {
      return { path: null, error: { message: validation.error } };
    }

    try {
      // Gera nome de arquivo seguro (previne path traversal)
      const fileName = `${generateUniqueId()}.${validation.extension}`;

      const { error: uploadError } = await supabase.storage
        .from(STORAGE.AVATARS_BUCKET)
        .upload(fileName, validation.value);

      if (uploadError) {
        return { path: null, error: { message: ErrorHandler.upload(uploadError) } };
      }

      return { path: fileName, error: null };
    } catch (error) {
      ErrorHandler.log('StorageService.uploadAvatar', error);
      return { path: null, error: { message: ErrorHandler.upload(error) } };
    }
  },

  async downloadAvatar(path) {
    if (!path) {
      return { url: null, error: null };
    }

    try {
      const { data, error } = await supabase.storage
        .from(STORAGE.AVATARS_BUCKET)
        .download(path);

      if (error) {
        ErrorHandler.log('StorageService.downloadAvatar', error);
        return { url: null, error: { message: ErrorHandler.upload(error) } };
      }

      const url = URL.createObjectURL(data);
      return { url, error: null };
    } catch (error) {
      ErrorHandler.log('StorageService.downloadAvatar', error);
      return { url: null, error: { message: ErrorHandler.upload(error) } };
    }
  },

  getPublicUrl(path) {
    if (!path) {
      return null;
    }

    const { data } = supabase.storage
      .from(STORAGE.AVATARS_BUCKET)
      .getPublicUrl(path);

    return data?.publicUrl || null;
  },
};
