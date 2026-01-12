/**
 * LoadingState - Componente de estado de carregamento
 * Regra 021: Elimina duplicação de código
 */

import React from 'react';
import { Loader } from 'lucide-react';

export default function LoadingState({ message = 'Carregando...' }) {
  return (
    <div className="empty-state">
      <Loader size={48} className="loading-spinner" />
      <p>{message}</p>
    </div>
  );
}
