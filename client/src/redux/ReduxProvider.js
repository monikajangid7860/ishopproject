"use client";

import React from 'react'
import store from '@/redux/store/store';
import { Provider } from 'react-redux'
import AppInitializer from '@/components/website/AppInitializer';

export default function StoreProvider({ children }) {
  return (
    <Provider store={store}>
       <AppInitializer />
        {children}
    </Provider>
  )
}