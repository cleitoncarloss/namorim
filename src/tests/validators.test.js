/**
 * Testes de Validadores
 * Regra 032: Cobertura Mínima de Teste
 * Seguindo padrão AAA (Arrange, Act, Assert)
 */

import { describe, it, expect } from 'vitest';
import {
  EmailValidator,
  PasswordValidator,
  UsernameValidator,
  BioValidator,
  MessageValidator,
  ImageFileValidator,
  ValidationError,
} from '../domain/validators';

describe('EmailValidator', () => {
  describe('validate', () => {
    it('retorna erro quando email é vazio', () => {
      const result = EmailValidator.validate('');

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Email é obrigatório');
    });

    it('retorna erro quando email é null', () => {
      const result = EmailValidator.validate(null);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Email é obrigatório');
    });

    it('retorna erro quando email é undefined', () => {
      const result = EmailValidator.validate(undefined);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Email é obrigatório');
    });

    it('retorna erro para formato inválido sem @', () => {
      const result = EmailValidator.validate('invalido');

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Formato de email inválido');
    });

    it('retorna erro para formato inválido sem domínio', () => {
      const result = EmailValidator.validate('user@');

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Formato de email inválido');
    });

    it('valida email correto', () => {
      const result = EmailValidator.validate('user@example.com');

      expect(result.valid).toBe(true);
      expect(result.value).toBe('user@example.com');
    });

    it('converte email para lowercase', () => {
      const result = EmailValidator.validate('User@EXAMPLE.COM');

      expect(result.valid).toBe(true);
      expect(result.value).toBe('user@example.com');
    });

    it('remove espaços do email', () => {
      const result = EmailValidator.validate('  user@example.com  ');

      expect(result.valid).toBe(true);
      expect(result.value).toBe('user@example.com');
    });
  });
});

describe('PasswordValidator', () => {
  describe('validate', () => {
    it('retorna erro quando senha é vazia', () => {
      const result = PasswordValidator.validate('');

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Senha é obrigatória');
    });

    it('retorna erro quando senha é null', () => {
      const result = PasswordValidator.validate(null);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Senha é obrigatória');
    });

    it('retorna erro quando senha é muito curta', () => {
      const result = PasswordValidator.validate('12345');

      expect(result.valid).toBe(false);
      expect(result.error).toContain('pelo menos');
    });

    it('valida senha com tamanho mínimo', () => {
      const result = PasswordValidator.validate('123456');

      expect(result.valid).toBe(true);
      expect(result.value).toBe('123456');
    });

    it('valida senha longa', () => {
      const result = PasswordValidator.validate('senhaSuper$ecreta123');

      expect(result.valid).toBe(true);
      expect(result.value).toBe('senhaSuper$ecreta123');
    });
  });
});

describe('UsernameValidator', () => {
  describe('validate', () => {
    it('retorna erro quando username é vazio', () => {
      const result = UsernameValidator.validate('');

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Nome de usuário é obrigatório');
    });

    it('retorna erro quando username é muito curto', () => {
      const result = UsernameValidator.validate('ab');

      expect(result.valid).toBe(false);
      expect(result.error).toContain('pelo menos 3 caracteres');
    });

    it('valida username válido', () => {
      const result = UsernameValidator.validate('joao123');

      expect(result.valid).toBe(true);
      expect(result.value).toBe('joao123');
    });

    it('remove espaços do username', () => {
      const result = UsernameValidator.validate('  joao123  ');

      expect(result.valid).toBe(true);
      expect(result.value).toBe('joao123');
    });

    it('retorna erro quando username é muito longo', () => {
      const longName = 'a'.repeat(31);
      const result = UsernameValidator.validate(longName);

      expect(result.valid).toBe(false);
      expect(result.error).toContain('no máximo');
    });
  });
});

describe('BioValidator', () => {
  describe('validate', () => {
    it('aceita bio vazia', () => {
      const result = BioValidator.validate('');

      expect(result.valid).toBe(true);
      expect(result.value).toBe('');
    });

    it('aceita bio null', () => {
      const result = BioValidator.validate(null);

      expect(result.valid).toBe(true);
      expect(result.value).toBe('');
    });

    it('retorna erro para tipo inválido', () => {
      const result = BioValidator.validate(123);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Bio deve ser um texto');
    });

    it('valida bio válida', () => {
      const result = BioValidator.validate('Olá, sou João!');

      expect(result.valid).toBe(true);
      expect(result.value).toBe('Olá, sou João!');
    });

    it('retorna erro quando bio é muito longa', () => {
      const longBio = 'a'.repeat(501);
      const result = BioValidator.validate(longBio);

      expect(result.valid).toBe(false);
      expect(result.error).toContain('no máximo');
    });
  });
});

describe('MessageValidator', () => {
  describe('validate', () => {
    it('retorna erro quando mensagem é vazia', () => {
      const result = MessageValidator.validate('');

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Mensagem é obrigatória');
    });

    it('retorna erro quando mensagem contém apenas espaços', () => {
      const result = MessageValidator.validate('   ');

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Mensagem não pode estar vazia');
    });

    it('valida mensagem válida', () => {
      const result = MessageValidator.validate('Olá!');

      expect(result.valid).toBe(true);
      expect(result.value).toBe('Olá!');
    });

    it('retorna erro quando mensagem é muito longa', () => {
      const longMessage = 'a'.repeat(1001);
      const result = MessageValidator.validate(longMessage);

      expect(result.valid).toBe(false);
      expect(result.error).toContain('no máximo');
    });
  });
});

describe('ImageFileValidator', () => {
  describe('validate', () => {
    it('retorna erro quando arquivo é null', () => {
      const result = ImageFileValidator.validate(null);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Selecione uma imagem');
    });

    it('retorna erro para tipo de arquivo inválido', () => {
      const file = { type: 'application/pdf', name: 'doc.pdf', size: 1000 };
      const result = ImageFileValidator.validate(file);

      expect(result.valid).toBe(false);
      expect(result.error).toContain('Tipo de arquivo não permitido');
    });

    it('retorna erro para arquivo muito grande', () => {
      const file = {
        type: 'image/jpeg',
        name: 'photo.jpg',
        size: 6 * 1024 * 1024,
      };
      const result = ImageFileValidator.validate(file);

      expect(result.valid).toBe(false);
      expect(result.error).toContain('no máximo 5MB');
    });

    it('valida arquivo JPEG válido', () => {
      const file = {
        type: 'image/jpeg',
        name: 'photo.jpg',
        size: 1024 * 1024,
      };
      const result = ImageFileValidator.validate(file);

      expect(result.valid).toBe(true);
      expect(result.extension).toBe('jpg');
    });

    it('valida arquivo PNG válido', () => {
      const file = {
        type: 'image/png',
        name: 'image.png',
        size: 500 * 1024,
      };
      const result = ImageFileValidator.validate(file);

      expect(result.valid).toBe(true);
      expect(result.extension).toBe('png');
    });

    it('valida arquivo WebP válido', () => {
      const file = {
        type: 'image/webp',
        name: 'image.webp',
        size: 500 * 1024,
      };
      const result = ImageFileValidator.validate(file);

      expect(result.valid).toBe(true);
      expect(result.extension).toBe('webp');
    });
  });
});

describe('ValidationError', () => {
  it('cria erro com nome correto', () => {
    const error = new ValidationError('Teste');

    expect(error.name).toBe('ValidationError');
    expect(error.message).toBe('Teste');
  });
});
