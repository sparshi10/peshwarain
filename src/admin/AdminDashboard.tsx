import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { ToastProvider } from './ToastContext';
import { LoginScreen } from './LoginScreen';
import { AdminLayout } from './AdminLayout';
import { DashboardOverview } from './screens/DashboardOverview';
import { MenuManagement } from './screens/MenuManagement';
import { ReviewsManagement } from './screens/ReviewsManagement';
import { BusinessInfoManagement } from './screens/BusinessInfoManagement';
import { HomepageContentManagement } from './screens/HomepageContentManagement';
import { PhotoGalleryManagement } from './screens/PhotoGalleryManagement';
import { TableRequestsInbox } from './screens/TableRequestsInbox';
import { UsersManagement } from './screens/UsersManagement';

export const AdminDashboard: React.FC = () => {
  const { currentUser } = useRestaurant();
  const [currentScreen, setCurrentScreen] = useState<string>('dashboard');

  if (!currentUser) {
    return <LoginScreen />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <DashboardOverview onNavigate={setCurrentScreen} />;
      case 'menu':
        return <MenuManagement />;
      case 'reviews':
        return <ReviewsManagement />;
      case 'business':
        return <BusinessInfoManagement />;
      case 'content':
        return <HomepageContentManagement />;
      case 'photos':
        return <PhotoGalleryManagement />;
      case 'requests':
        return <TableRequestsInbox />;
      case 'users':
        return <UsersManagement />;
      default:
        return <DashboardOverview onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <ToastProvider>
      <AdminLayout currentScreen={currentScreen} onSelectScreen={setCurrentScreen}>
        {renderScreen()}
      </AdminLayout>
    </ToastProvider>
  );
};
