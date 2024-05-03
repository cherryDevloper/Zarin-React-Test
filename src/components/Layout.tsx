import React, { ReactNode } from 'react';

interface LayoutProps {
  header?: ReactNode;
  sidebar?: ReactNode;
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ header, sidebar, children }) => {
  return (
    <div className="min-h-screen flex flex-col w-screen">
      {/* Header */}
      <header className="bg-blue-500 text-white p-4">{header}</header>

      <div className="flex flex-1">
        {sidebar && <aside className="bg-gray-200 w-64 p-4">{sidebar}</aside>}

        {/* Main content */}
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
