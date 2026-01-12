/**
 * Auth - Página de autenticação
 * Regra 010: Single Responsibility Principle
 * Regra 002: Sem cláusula else (guard clauses)
 * Regra 007: Componente pequeno
 */

import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

function AuthWelcome({ onCreateAccount, onLogin }) {
  return (
    <div className="auth-container">
      <div className="auth-welcome">
        <div className="auth-logo-icon">💕</div>
        <h1 className="auth-logo">LoveConnect</h1>
        <p className="auth-subtitle">
          Encontre pessoas incríveis<br />perto de você
        </p>
      </div>
      <div className="auth-buttons">
        <button className="button block primary" onClick={onCreateAccount}>
          Criar Conta
        </button>
        <button className="button block secondary" onClick={onLogin}>
          Já tenho conta
        </button>
      </div>
    </div>
  );
}

function AuthForm({ isSignUp, onBack, onToggleMode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error, successMessage, signUp, signIn, clearMessages } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSignUp) {
      const { success } = await signUp(email, password);
      if (success) {
        onToggleMode();
        setPassword('');
      }
      return;
    }

    await signIn(email, password);
  };

  const handleToggleMode = () => {
    clearMessages();
    onToggleMode();
  };

  const message = error || successMessage;
  const isSuccess = Boolean(successMessage);

  return (
    <div className="auth-container">
      <button
        type="button"
        className="auth-back-btn"
        onClick={onBack}
      >
        ← Voltar
      </button>

      <div className="auth-form-container">
        <div className="auth-form-header">
          <h2>{isSignUp ? 'Criar Conta' : 'Welcome back'}</h2>
          <p>{isSignUp ? 'Preencha seus dados' : 'Faça login na sua conta'}</p>
        </div>

        {message && (
          <div className={`auth-message ${isSuccess ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-with-icon">
              <Mail size={18} className="input-icon" />
              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                minLength={6}
              />
            </div>
          </div>

          {!isSignUp && (
            <div className="forgot-password">
              <a href="#">Esqueceu a senha?</a>
            </div>
          )}

          <button className="button block primary" type="submit" disabled={loading}>
            {loading ? 'Aguarde...' : isSignUp ? 'Criar conta' : 'Entrar'}
          </button>
        </form>

        <div className="auth-switch">
          <span className="text-muted">
            {isSignUp ? 'Já tem uma conta? ' : 'Não tem conta? '}
          </span>
          <button
            type="button"
            className="auth-switch-button"
            onClick={handleToggleMode}
          >
            {isSignUp ? 'Faça login' : 'Cadastre-se'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Auth() {
  const [showForm, setShowForm] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  if (!showForm) {
    return (
      <AuthWelcome
        onCreateAccount={() => {
          setShowForm(true);
          setIsSignUp(true);
        }}
        onLogin={() => {
          setShowForm(true);
          setIsSignUp(false);
        }}
      />
    );
  }

  return (
    <AuthForm
      isSignUp={isSignUp}
      onBack={() => setShowForm(false)}
      onToggleMode={() => setIsSignUp(!isSignUp)}
    />
  );
}
