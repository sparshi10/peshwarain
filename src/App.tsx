import React, { useState } from 'react';
import { RestaurantProvider, useRestaurant } from './context/RestaurantContext';
import { AdminDashboard } from './admin/AdminDashboard';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { FeelingSection } from './components/FeelingSection';
import { MenuSection } from './components/MenuSection';
import { DrinksSection } from './components/DrinksSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { TableReservationModal } from './components/TableReservationModal';

function RestaurantApp() {
  const { currentView } = useRestaurant();
  const [reservationOpen, setReservationOpen] = useState(false);

  if (currentView === 'admin') {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-[#1F1611] text-[#F3EBDD] flex flex-col selection:bg-[#B5502F] selection:text-white">
      {/* Sticky Navigation Bar */}
      <Navigation onOpenReservation={() => setReservationOpen(true)} />

      <main className="flex-1">
        {/* Dark Hero Section with Ticker */}
        <HeroSection onOpenReservation={() => setReservationOpen(true)} />

        {/* 01 — Cream The Feeling Section */}
        <FeelingSection />

        {/* 02 — Cream The Order / Menu Section */}
        <MenuSection onOpenReservation={() => setReservationOpen(true)} />

        {/* Rust / Terracotta Drinks Feature Section */}
        <DrinksSection />

        {/* 03 — Cream The Word on Wari / Reviews Section */}
        <ReviewsSection />

        {/* Deep Forest Green Location & Custom Stylized Map Section */}
        <LocationSection />
      </main>

      {/* Dark Footer Bar */}
      <Footer onOpenReservation={() => setReservationOpen(true)} />

      {/* Table Reservation & Inquiry Modal */}
      <TableReservationModal
        isOpen={reservationOpen}
        onClose={() => setReservationOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <RestaurantProvider>
      <RestaurantApp />
    </RestaurantProvider>
  );
}
