import { Button } from 'antd';
import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  header?: ReactNode;
  sidebar?: ReactNode;
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ sidebar, children }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col w-screen">
      {/* Header */}
      <header className="bg-blue-500 text-white p-4 ">
        <Button onClick={() => navigate(-1)}>{'<Back'}</Button>
      </header>

      <div className="flex flex-1">
        {sidebar && <aside className="bg-gray-200 w-64 p-4">{sidebar}</aside>}

        {/* Main content */}
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
