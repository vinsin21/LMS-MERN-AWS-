import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { StickyFooter } from '../components/ui/sticky-footer';

export const MainLayout: React.FC = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <StickyFooter />
        </>
    );
};
