import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { supabase } from '../services/supabase';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    setMessage('');

    if (password.length < 6) {
      setMessage('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    try {
      setLoading(true);

      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setMessage('Conta criada com sucesso! Faça login para continuar.');
        setIsSignUp(false);
        setPassword('');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Tela inicial (Welcome Screen)
  if (!showForm) {
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
          <button
            className="button block"
            onClick={() => {
              setShowForm(true);
              setIsSignUp(true);
            }}
          >
            Criar Conta
          </button>
          <button
            className="button block secondary"
            onClick={() => {
              setShowForm(true);
              setIsSignUp(false);
            }}
          >
            Já tenho conta
          </button>
        </div>
      </div>
    );
  }

  // Formulário de Login/Cadastro
  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <div className="auth-form-header">
          <h2>{isSignUp ? 'Criar Conta' : 'Welcome back'}</h2>
          <p>{isSignUp ? 'Preencha seus dados' : 'Faça login na sua conta'}</p>
        </div>

        {message && (
          <div className={`auth-message ${message.includes('sucesso') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleAuth}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-with-icon">
              <Mail size={18} className="input-icon" />
              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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
          <span style={{ color: '#666', fontSize: '14px' }}>
            {isSignUp ? 'Já tem uma conta? ' : 'Não tem conta? '}
          </span>
          <button
            type="button"
            className="auth-switch-button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setMessage('');
            }}
          >
            {isSignUp ? 'Faça login' : 'Cadastre-se'}
          </button>
        </div>

        <button
          type="button"
          className="back-btn"
          onClick={() => setShowForm(false)}
          style={{ marginTop: '16px', color: '#667eea' }}
        >
          ← Voltar
        </button>
      </div>
    </div>
  );
}
