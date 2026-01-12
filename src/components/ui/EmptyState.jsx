/**
 * EmptyState - Componente de estado vazio
 * Regra 021: Elimina duplicação de código
 */

import React from 'react';

export default function EmptyState({
  icon = '📭',
  title = 'Nada aqui ainda',
  message = ''
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <h3>{title}</h3>
      {message && <p>{message}</p>}
    </div>
  );
}
