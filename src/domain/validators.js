/**
 * Validadores de domínio
 * Regra 003: Encapsulamento de Primitivos
 * Regra 040: Validação de Input com Whitelist
 */

import { VALIDATION, STORAGE } from '../constants';

export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const EmailValidator = {
  EMAIL_REGEX: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  validate(email) {
    if (!email || typeof email !== 'string') {
      return { valid: false, error: 'Email é obrigatório' };
    }

    const trimmed = email.trim().toLowerCase();

    if (!this.EMAIL_REGEX.test(trimmed)) {
      return { valid: false, error: 'Formato de email inválido' };
    }

    return { valid: true, value: trimmed };
  },
};

export const PasswordValidator = {
  validate(password) {
    if (!password || typeof password !== 'string') {
      return { valid: false, error: 'Senha é obrigatória' };
    }

    if (password.length < VALIDATION.MIN_PASSWORD_LENGTH) {
      return {
        valid: false,
        error: `Senha deve ter pelo menos ${VALIDATION.MIN_PASSWORD_LENGTH} caracteres`,
      };
    }

    return { valid: true, value: password };
  },
};

export const UsernameValidator = {
  USERNAME_REGEX: /^[a-zA-Z0-9_]+$/,

  validate(username) {
    if (!username || typeof username !== 'string') {
      return { valid: false, error: 'Nome de usuário é obrigatório' };
    }

    const trimmed = username.trim();

    if (trimmed.length < 3) {
      return { valid: false, error: 'Nome deve ter pelo menos 3 caracteres' };
    }

    if (trimmed.length > VALIDATION.MAX_USERNAME_LENGTH) {
      return {
        valid: false,
        error: `Nome deve ter no máximo ${VALIDATION.MAX_USERNAME_LENGTH} caracteres`,
      };
    }

    return { valid: true, value: trimmed };
  },
};

export const BioValidator = {
  validate(bio) {
    if (!bio) {
      return { valid: true, value: '' };
    }

    if (typeof bio !== 'string') {
      return { valid: false, error: 'Bio deve ser um texto' };
    }

    const trimmed = bio.trim();

    if (trimmed.length > VALIDATION.MAX_BIO_LENGTH) {
      return {
        valid: false,
        error: `Bio deve ter no máximo ${VALIDATION.MAX_BIO_LENGTH} caracteres`,
      };
    }

    return { valid: true, value: trimmed };
  },
};

export const MessageValidator = {
  validate(message) {
    if (!message || typeof message !== 'string') {
      return { valid: false, error: 'Mensagem é obrigatória' };
    }

    const trimmed = message.trim();

    if (trimmed.length === 0) {
      return { valid: false, error: 'Mensagem não pode estar vazia' };
    }

    if (trimmed.length > VALIDATION.MAX_MESSAGE_LENGTH) {
      return {
        valid: false,
        error: `Mensagem deve ter no máximo ${VALIDATION.MAX_MESSAGE_LENGTH} caracteres`,
      };
    }

    return { valid: true, value: trimmed };
  },
};

export const ImageFileValidator = {
  validate(file) {
    if (!file) {
      return { valid: false, error: 'Selecione uma imagem' };
    }

    if (!STORAGE.ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return {
        valid: false,
        error: 'Tipo de arquivo não permitido. Use JPG, PNG ou WebP',
      };
    }

    if (file.size > STORAGE.MAX_IMAGE_SIZE_BYTES) {
      return { valid: false, error: 'A imagem deve ter no máximo 5MB' };
    }

    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!extension || !STORAGE.ALLOWED_IMAGE_EXTENSIONS.includes(extension)) {
      return { valid: false, error: 'Extensão de arquivo não permitida' };
    }

    return { valid: true, value: file, extension };
  },
};
