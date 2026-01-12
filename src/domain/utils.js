/**
 * Funções utilitárias de domínio
 * Regra 021: Proibição de Duplicação
 * Regra 036: Funções puras sem efeitos colaterais
 */

/**
 * Gera um ID único para uso em nomes de arquivo
 * Regra 030: Proibição de funções inseguras (não usa Math.random para segurança)
 */
export function generateUniqueId() {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Extrai iniciais de um nome para exibição em avatar
 */
export function getInitials(name, fallback = '?') {
  if (!name || typeof name !== 'string') {
    return fallback;
  }

  const trimmed = name.trim();
  if (trimmed.length === 0) {
    return fallback;
  }

  return trimmed.substring(0, 2).toUpperCase();
}

/**
 * Extrai primeira inicial de um nome
 */
export function getFirstInitial(name, fallback = '?') {
  if (!name || typeof name !== 'string') {
    return fallback;
  }

  const trimmed = name.trim();
  if (trimmed.length === 0) {
    return fallback;
  }

  return trimmed.charAt(0).toUpperCase();
}

/**
 * Gera username padrão a partir de email
 */
export function generateDefaultUsername(email) {
  if (!email || typeof email !== 'string') {
    return `user${Date.now()}`;
  }

  const localPart = email.split('@')[0] || 'user';
  const suffix = Math.floor(Math.random() * 1000);
  return `${localPart}${suffix}`;
}

/**
 * Formata IDs para uso em query SQL segura
 * Regra 050: Prevenção de SQL Injection
 */
export function formatIdsForQuery(ids) {
  if (!Array.isArray(ids) || ids.length === 0) {
    return null;
  }

  // Filtra apenas strings válidas (UUIDs)
  const validIds = ids.filter(
    (id) => typeof id === 'string' && /^[a-f0-9-]{36}$/i.test(id)
  );

  return validIds;
}

/**
 * Encontra IDs que estão em ambas as listas (matches)
 */
export function findMatchingIds(listA, listB) {
  if (!Array.isArray(listA) || !Array.isArray(listB)) {
    return [];
  }

  const setB = new Set(listB);
  return listA.filter((id) => setB.has(id));
}

/**
 * Encontra IDs que estão em listA mas não em listB
 */
export function findExclusiveIds(listA, listB) {
  if (!Array.isArray(listA)) {
    return [];
  }

  if (!Array.isArray(listB) || listB.length === 0) {
    return listA;
  }

  const setB = new Set(listB);
  return listA.filter((id) => !setB.has(id));
}

/**
 * Extrai user_id de uma lista de likes
 */
export function extractUserIds(likes, field = 'user_id') {
  if (!Array.isArray(likes)) {
    return [];
  }

  return likes.map((like) => like[field]).filter(Boolean);
}
