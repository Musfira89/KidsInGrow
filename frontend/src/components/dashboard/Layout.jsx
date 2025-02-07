import React, { useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import CustomSidebar from './Sidebar';
import Topbar from './Topbar';

const Layout = () => {
  const { parentId, childId } = useParams(); // Get parentId and childId from URL parameters
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to control sidebar visibility
  const sidebarWidth = isSidebarOpen ? '250px' : '0px'; // Sidebar width depending on state

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full transition-all duration-300`}
        style={{ width: sidebarWidth }}
      >
        <CustomSidebar parentId={parentId} childId={childId} />
      </div>

      {/* Main Content Area */}
      <div
        className="flex-1 flex flex-col"
        style={{
          marginLeft: isSidebarOpen ? sidebarWidth : '0px',
          transition: 'margin-left 0.3s',
        }}
      >
        <Topbar />
        <div className="flex-1 p-4 bg-gray-100 overflow-y-auto">
          <div className="relative w-full h-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
