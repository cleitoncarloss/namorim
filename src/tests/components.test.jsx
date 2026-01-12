/**
 * Testes de Componentes UI
 * Regra 032: Cobertura Mínima de Teste
 */

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import EmptyState from '../components/ui/EmptyState';
import ErrorState from '../components/ui/ErrorState';
import LoadingState from '../components/ui/LoadingState';

describe('EmptyState', () => {
  it('renderiza com props padrão', () => {
    render(<EmptyState />);

    expect(screen.getByText('📭')).toBeInTheDocument();
    expect(screen.getByText('Nada aqui ainda')).toBeInTheDocument();
  });

  it('renderiza com icon customizado', () => {
    render(<EmptyState icon="🎉" />);

    expect(screen.getByText('🎉')).toBeInTheDocument();
  });

  it('renderiza com título customizado', () => {
    render(<EmptyState title="Lista vazia" />);

    expect(screen.getByText('Lista vazia')).toBeInTheDocument();
  });

  it('renderiza mensagem quando fornecida', () => {
    render(<EmptyState message="Nenhum item encontrado" />);

    expect(screen.getByText('Nenhum item encontrado')).toBeInTheDocument();
  });

  it('não renderiza parágrafo quando mensagem está vazia', () => {
    const { container } = render(<EmptyState />);

    expect(container.querySelector('p')).toBeNull();
  });
});

describe('ErrorState', () => {
  it('renderiza com mensagem padrão', () => {
    render(<ErrorState />);

    expect(screen.getByText('Erro')).toBeInTheDocument();
    expect(screen.getByText('Algo deu errado')).toBeInTheDocument();
  });

  it('renderiza com mensagem customizada', () => {
    render(<ErrorState message="Falha ao carregar dados" />);

    expect(screen.getByText('Falha ao carregar dados')).toBeInTheDocument();
  });

  it('não mostra botão quando onRetry não está definido', () => {
    render(<ErrorState />);

    expect(screen.queryByText('Tentar novamente')).toBeNull();
  });

  it('mostra botão de retry quando onRetry está definido', () => {
    const mockRetry = vi.fn();
    render(<ErrorState onRetry={mockRetry} />);

    expect(screen.getByText('Tentar novamente')).toBeInTheDocument();
  });

  it('chama onRetry quando botão é clicado', () => {
    const mockRetry = vi.fn();
    render(<ErrorState onRetry={mockRetry} />);

    fireEvent.click(screen.getByText('Tentar novamente'));

    expect(mockRetry).toHaveBeenCalledTimes(1);
  });
});

describe('LoadingState', () => {
  it('renderiza com mensagem padrão', () => {
    render(<LoadingState />);

    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  it('renderiza com mensagem customizada', () => {
    render(<LoadingState message="Buscando perfis..." />);

    expect(screen.getByText('Buscando perfis...')).toBeInTheDocument();
  });
});
