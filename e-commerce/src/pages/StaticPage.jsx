import React from "react";

const StaticPage = ({ title, children }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      <div className="mt-4 prose prose-gray max-w-none">
        {children || (
          <p>
            This page is coming soon. We created a placeholder so your link works.
          </p>
        )}
      </div>
    </div>
  );
};

export default StaticPage;
