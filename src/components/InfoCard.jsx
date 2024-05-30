import React from 'react';

const InfoCard = ({ title, value }) => {
  return (
    <div className="flex bg-white rounded-2xl shadow-sm">
      <div className="flex flex-col justify-between p-4">
        <dd className="text-gray-500 pb-4">{title}</dd>
        <dt className="text-3xl font-extrabold">{value}</dt>
      </div>
    </div>
  );
};

export default InfoCard;
