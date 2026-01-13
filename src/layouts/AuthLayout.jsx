/**
 * AuthLayout - Layout para páginas de autenticação
 * Regra 010: Single Responsibility - apenas layout de auth
 */

import React from 'react';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="container">
      <Outlet />
    </div>
  );
}
