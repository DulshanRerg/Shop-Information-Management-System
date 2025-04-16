
import React from 'react';
import Layout from '@/components/Layout';
import { AlertTriangle } from 'lucide-react';

interface UnderConstructionProps {
  pageName: string;
}

const UnderConstruction: React.FC<UnderConstructionProps> = ({ pageName }) => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <AlertTriangle className="h-16 w-16 text-yellow-500 mb-4" />
        <h1 className="text-3xl font-bold mb-4">{pageName} Page</h1>
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-6 max-w-lg">
          <p className="text-lg text-yellow-800 mb-2">This page is under construction</p>
          <p className="text-gray-600">
            We're working hard to bring you this feature soon. Check back later for updates!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default UnderConstruction;
