/**
 * Router - Configuração centralizada de rotas
 * Regra 010: Single Responsibility - definição de rotas
 * Regra 024: Constantes centralizadas
 */

import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '../constants';

import AuthLayout from '../layouts/AuthLayout';
import AppLayout from '../layouts/AppLayout';
import ProtectedRoute from './ProtectedRoute';
import GuestRoute from './GuestRoute';
import PremiumRoute from './PremiumRoute';

import Auth from '../pages/Auth';
import Home from '../pages/Home';
import Account from '../pages/Account';
import Matches from '../pages/Matches';
import Chat from '../pages/Chat';
import LikesYou from '../pages/LikesYou';
import GoPremium from '../pages/GoPremium';

export const router = createBrowserRouter([
  {
    path: '/auth',
    element: (
      <GuestRoute>
        <AuthLayout />
      </GuestRoute>
    ),
    children: [
      {
        path: 'sign-in',
        element: <Auth />,
      },
    ],
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'account',
        element: <Account />,
      },
      {
        path: 'messages',
        element: <Matches showMessages={true} />,
      },
      {
        path: 'matches',
        element: <Matches />,
      },
      {
        path: 'chat/:partnerId',
        element: <Chat />,
      },
      {
        path: 'likes',
        element: (
          <PremiumRoute>
            <LikesYou />
          </PremiumRoute>
        ),
      },
      {
        path: 'premium',
        element: <GoPremium />,
      },
    ],
  },
]);
