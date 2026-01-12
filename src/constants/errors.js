/**
 * Mensagens de erro centralizadas
 * Regra 046: Tratamento de Erros Seguro
 * Regra 063: Proteção contra Information Disclosure
 */

export const ERROR_MESSAGES = Object.freeze({
  // Auth errors
  AUTH_GENERIC: 'Erro ao processar autenticação. Tente novamente.',
  AUTH_INVALID_CREDENTIALS: 'Email ou senha incorretos.',
  AUTH_EMAIL_NOT_CONFIRMED: 'Por favor, confirme seu email antes de fazer login.',
  AUTH_WEAK_PASSWORD: 'A senha deve ter pelo menos 6 caracteres.',
  AUTH_INVALID_EMAIL: 'Por favor, insira um email válido.',
  AUTH_USER_EXISTS: 'Este email já está cadastrado.',

  // Profile errors
  PROFILE_LOAD_FAILED: 'Não foi possível carregar o perfil.',
  PROFILE_UPDATE_FAILED: 'Não foi possível atualizar o perfil.',
  PROFILE_NOT_FOUND: 'Perfil não encontrado.',

  // Discovery errors
  DISCOVERY_LOAD_FAILED: 'Não foi possível carregar perfis.',
  SWIPE_FAILED: 'Não foi possível registrar sua escolha.',

  // Match errors
  MATCHES_LOAD_FAILED: 'Não foi possível carregar seus matches.',
  MATCH_CREATE_FAILED: 'Não foi possível criar o match.',

  // Chat errors
  CHAT_LOAD_FAILED: 'Não foi possível carregar as mensagens.',
  MESSAGE_SEND_FAILED: 'Não foi possível enviar a mensagem.',

  // Upload errors
  UPLOAD_NO_FILE: 'Selecione uma imagem para fazer upload.',
  UPLOAD_INVALID_TYPE: 'Tipo de arquivo não permitido. Use JPG, PNG ou WebP.',
  UPLOAD_TOO_LARGE: 'A imagem deve ter no máximo 5MB.',
  UPLOAD_FAILED: 'Não foi possível fazer upload da imagem.',

  // Generic errors
  GENERIC_ERROR: 'Algo deu errado. Tente novamente.',
  NETWORK_ERROR: 'Erro de conexão. Verifique sua internet.',
});

export const SUCCESS_MESSAGES = Object.freeze({
  ACCOUNT_CREATED: 'Conta criada com sucesso! Faça login para continuar.',
  PROFILE_UPDATED: 'Perfil atualizado com sucesso.',
  AVATAR_UPDATED: 'Foto atualizada com sucesso.',
});
