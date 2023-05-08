import React from 'react';
import OurLogoWithoutRect from '@/assets/logo';
import Charts from '@/components/Charts';

const Dashboard = () => {
  return (
    <React.Fragment>
      <div className="bg-gray-50 dark:bg-gray-900 w-full">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <OurLogoWithoutRect width="80" height="80" />
            Insomniak
          </a>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
