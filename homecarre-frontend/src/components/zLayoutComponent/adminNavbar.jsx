import React from 'react';
import AdminSidebar from './AdminSidebar';

const AdminNavbar = () => {
    return (
        <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <div className="flex items-center">
                <img src="/path/to/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
            </div>
            <div>
                <span className="text-lg font-semibold">Admin Name</span>
            </div>
        </div>
    );
};

export default AdminNavbar;