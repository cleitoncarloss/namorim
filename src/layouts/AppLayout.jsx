/**
 * AppLayout - Layout principal para páginas autenticadas
 * Regra 010: Single Responsibility - gerencia layout com navegação
 */

import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { ROUTES } from '../constants';

const ROUTES_WITHOUT_NAV = [ROUTES.CHAT];

function shouldHideNav(pathname) {
  return ROUTES_WITHOUT_NAV.some(route => {
    const pattern = route.replace(':partnerId', '[^/]+');
    return new RegExp(`^${pattern}$`).test(pathname);
  });
}

export default function AppLayout() {
  const location = useLocation();
  const hideNav = shouldHideNav(location.pathname);

  return (
    <div className="container">
      <Outlet />
      {!hideNav && <BottomNav />}
    </div>
  );
}
