/**
 * Testes de Utilitários
 * Regra 032: Cobertura Mínima de Teste
 * Seguindo padrão AAA (Arrange, Act, Assert)
 */

import { describe, it, expect } from 'vitest';
import {
  generateUniqueId,
  getInitials,
  getFirstInitial,
  generateDefaultUsername,
  formatIdsForQuery,
  findMatchingIds,
  findExclusiveIds,
  extractUserIds,
} from '../domain/utils';

describe('generateUniqueId', () => {
  it('gera string não vazia', () => {
    const id = generateUniqueId();

    expect(id).toBeTruthy();
    expect(typeof id).toBe('string');
  });

  it('gera IDs únicos', () => {
    const ids = new Set();

    for (let i = 0; i < 100; i++) {
      ids.add(generateUniqueId());
    }

    expect(ids.size).toBe(100);
  });

  it('inclui timestamp', () => {
    const before = Date.now();
    const id = generateUniqueId();
    const after = Date.now();

    const timestamp = parseInt(id.split('-')[0], 10);
    expect(timestamp).toBeGreaterThanOrEqual(before);
    expect(timestamp).toBeLessThanOrEqual(after);
  });
});

describe('getInitials', () => {
  it('retorna fallback quando nome é null', () => {
    const result = getInitials(null);

    expect(result).toBe('?');
  });

  it('retorna fallback quando nome é vazio', () => {
    const result = getInitials('');

    expect(result).toBe('?');
  });

  it('retorna fallback customizado', () => {
    const result = getInitials(null, 'XX');

    expect(result).toBe('XX');
  });

  it('extrai duas primeiras letras', () => {
    const result = getInitials('João');

    expect(result).toBe('JO');
  });

  it('converte para maiúsculas', () => {
    const result = getInitials('maria');

    expect(result).toBe('MA');
  });

  it('trata espaços no início', () => {
    const result = getInitials('  pedro');

    expect(result).toBe('PE');
  });
});

describe('getFirstInitial', () => {
  it('retorna fallback quando nome é null', () => {
    const result = getFirstInitial(null);

    expect(result).toBe('?');
  });

  it('retorna fallback quando nome é vazio', () => {
    const result = getFirstInitial('');

    expect(result).toBe('?');
  });

  it('extrai primeira letra', () => {
    const result = getFirstInitial('João');

    expect(result).toBe('J');
  });

  it('converte para maiúscula', () => {
    const result = getFirstInitial('maria');

    expect(result).toBe('M');
  });
});

describe('generateDefaultUsername', () => {
  it('gera username quando email é null', () => {
    const result = generateDefaultUsername(null);

    expect(result).toMatch(/^user\d+$/);
  });

  it('usa parte local do email', () => {
    const result = generateDefaultUsername('joao@example.com');

    expect(result).toMatch(/^joao\d+$/);
  });
});

describe('formatIdsForQuery', () => {
  it('retorna null para array vazio', () => {
    const result = formatIdsForQuery([]);

    expect(result).toBeNull();
  });

  it('retorna null para input inválido', () => {
    const result = formatIdsForQuery('not-array');

    expect(result).toBeNull();
  });

  it('filtra apenas UUIDs válidos', () => {
    const validUuid = '550e8400-e29b-41d4-a716-446655440000';
    const result = formatIdsForQuery([validUuid, 'invalid', '123']);

    expect(result).toEqual([validUuid]);
  });

  it('retorna todos UUIDs válidos', () => {
    const uuid1 = '550e8400-e29b-41d4-a716-446655440000';
    const uuid2 = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
    const result = formatIdsForQuery([uuid1, uuid2]);

    expect(result).toEqual([uuid1, uuid2]);
  });
});

describe('findMatchingIds', () => {
  it('retorna array vazio quando listA é inválida', () => {
    const result = findMatchingIds(null, ['1', '2']);

    expect(result).toEqual([]);
  });

  it('retorna array vazio quando listB é inválida', () => {
    const result = findMatchingIds(['1', '2'], null);

    expect(result).toEqual([]);
  });

  it('encontra IDs em comum', () => {
    const listA = ['1', '2', '3'];
    const listB = ['2', '3', '4'];
    const result = findMatchingIds(listA, listB);

    expect(result).toEqual(['2', '3']);
  });

  it('retorna vazio quando não há interseção', () => {
    const listA = ['1', '2'];
    const listB = ['3', '4'];
    const result = findMatchingIds(listA, listB);

    expect(result).toEqual([]);
  });
});

describe('findExclusiveIds', () => {
  it('retorna array vazio quando listA é inválida', () => {
    const result = findExclusiveIds(null, ['1']);

    expect(result).toEqual([]);
  });

  it('retorna listA quando listB é vazia', () => {
    const listA = ['1', '2'];
    const result = findExclusiveIds(listA, []);

    expect(result).toEqual(['1', '2']);
  });

  it('retorna listA quando listB é inválida', () => {
    const listA = ['1', '2'];
    const result = findExclusiveIds(listA, null);

    expect(result).toEqual(['1', '2']);
  });

  it('exclui IDs presentes em listB', () => {
    const listA = ['1', '2', '3'];
    const listB = ['2'];
    const result = findExclusiveIds(listA, listB);

    expect(result).toEqual(['1', '3']);
  });
});

describe('extractUserIds', () => {
  it('retorna array vazio para input inválido', () => {
    const result = extractUserIds(null);

    expect(result).toEqual([]);
  });

  it('extrai user_id por padrão', () => {
    const likes = [
      { user_id: 'a', name: 'A' },
      { user_id: 'b', name: 'B' },
    ];
    const result = extractUserIds(likes);

    expect(result).toEqual(['a', 'b']);
  });

  it('extrai campo customizado', () => {
    const items = [
      { profile_id: 'x' },
      { profile_id: 'y' },
    ];
    const result = extractUserIds(items, 'profile_id');

    expect(result).toEqual(['x', 'y']);
  });

  it('filtra valores falsy', () => {
    const likes = [
      { user_id: 'a' },
      { user_id: null },
      { user_id: 'c' },
    ];
    const result = extractUserIds(likes);

    expect(result).toEqual(['a', 'c']);
  });
});
