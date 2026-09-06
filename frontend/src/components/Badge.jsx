import React from 'react';

const Badge = ({ status }) => {
  const normalized = (status || '').toLowerCase();
  return (
    <span className={`badge badge-${normalized}`}>
      {status}
    </span>
  );
};

export default Badge;
