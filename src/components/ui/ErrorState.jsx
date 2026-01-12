/**
 * ErrorState - Componente de estado de erro
 * Regra 021: Elimina duplicação de código
 * Regra 046: Tratamento de erros seguro
 */

import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function ErrorState({
  message = 'Algo deu errado',
  onRetry = null
}) {
  return (
    <div className="empty-state">
      <AlertCircle size={48} color="#ff6b6b" />
      <h3>Erro</h3>
      <p>{message}</p>
      {onRetry && (
        <button className="button primary" onClick={onRetry}>
          Tentar novamente
        </button>
      )}
    </div>
  );
}
