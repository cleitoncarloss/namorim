/**
 * Constantes centralizadas da aplicação
 * Regra 024: Proibição de Constantes Mágicas
 */

export const ERROR_CODES = Object.freeze({
  PROFILE_NOT_FOUND: 'PGRST116',
});

export const VALIDATION = Object.freeze({
  MIN_PASSWORD_LENGTH: 6,
  MAX_USERNAME_LENGTH: 30,
  MAX_BIO_LENGTH: 500,
  MAX_MESSAGE_LENGTH: 1000,
});

export const STORAGE = Object.freeze({
  AVATARS_BUCKET: 'avatars',
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  ALLOWED_IMAGE_EXTENSIONS: ['jpg', 'jpeg', 'png', 'webp'],
  MAX_IMAGE_SIZE_BYTES: 5 * 1024 * 1024, // 5MB
});

export const PROFILE = Object.freeze({
  BATCH_SIZE: 10,
  DEFAULT_BIO: 'Welcome to Namorim!',
  DEFAULT_AGE: 25,
  DEFAULT_LOCATION: 'São Paulo, SP',
});

export const REALTIME = Object.freeze({
  CHAT_CHANNEL_PREFIX: 'chat',
  EVENT_INSERT: 'INSERT',
});

export const ROUTES = Object.freeze({
  AUTH_SIGN_IN: '/auth/sign-in',
  HOME: '/',
  ACCOUNT: '/account',
  MESSAGES: '/messages',
  MATCHES: '/matches',
  CHAT: '/chat/:partnerId',
  LIKES_YOU: '/likes',
  PREMIUM: '/premium',
});

export const SWIPE_ACTIONS = Object.freeze({
  LIKE: 'like',
  DISLIKE: 'dislike',
});

export const TABLES = Object.freeze({
  PROFILES: 'profiles',
  LIKES: 'likes',
  DISLIKES: 'dislikes',
  MESSAGES: 'messages',
});
