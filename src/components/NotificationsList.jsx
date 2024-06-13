import React from "react";
import { formatDistance } from "date-fns";

const NotificationsList = ({ data }) => {
  const timestamp = new Date(
    data.timestamp._seconds * 1000 + data.timestamp._nanoseconds / 1000000
  );
  const now = new Date();
  const displayTime = formatDistance(timestamp, now, { addSuffix: true });
  return (
    <div class="divide-y divide-gray-100">
      <a href="#" class="flex px-4 py-3 hover:bg-gray-100">
        <div class="w-full">
          <div class="text-gray-500 text-sm mb-1.5">
            {" "}
            <span class="font-semibold text-gray-900">{data.title}</span>:{" "}
            {data.body}
          </div>
          <div class="text-xs text-blue-600">{displayTime}</div>
        </div>
      </a>
    </div>
  );
};

export default NotificationsList;
