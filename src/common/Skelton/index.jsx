import React from 'react';

const Skeleton = ({ cols, rows }) => {
  const generateGridTemplateColumns = () => {
    // Create a string for grid-template-columns based on the number of columns
    return `grid-cols-${cols}`;
  };

  const generateSkeletonRows = () => {
    // Create an array of empty elements based on the number of rows
    return Array.from({ length: rows }, (_, index) => (
      <div key={index} className="skeleton-row"></div>
    ));
  };

  return (
    <div
      className={`skeleton-loader grid ${generateGridTemplateColumns()} gap-4`}
    >
      {generateSkeletonRows()}
    </div>
  );
};

export default Skeleton;
