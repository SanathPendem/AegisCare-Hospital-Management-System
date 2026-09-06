import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { ToastProvider } from '../context/ToastContext';

const DashboardLayout = () => {
  return (
    <ToastProvider>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f8fafc' }}>
        <Navbar />
        <div style={{ display: 'flex', flex: 1 }}>
          <Sidebar />
          <main className="main-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
            <Breadcrumbs />
            <div style={{ flex: 1, padding: '0 2rem 2rem 2rem' }}>
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </ToastProvider>
  );
};

export default DashboardLayout;
