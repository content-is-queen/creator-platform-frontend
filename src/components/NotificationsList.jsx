import { formatDistance } from "date-fns";
import { Menu } from "@headlessui/react";

import Text from "./Text";

const NotificationsList = ({ data }) => {
  const timestamp = new Date(
    data.timestamp._seconds * 1000 + data.timestamp._nanoseconds / 1000000
  );
  const now = new Date();
  const displayTime = formatDistance(timestamp, now, { addSuffix: true });

  return (
    <Menu className="divide-y divide-gray-100">
      <div className="flex px-4 py-3">
        <Text className="text-sm mb-1.5">{data.body}</Text>
        <span className="text-xs text-queen-black/80">{displayTime}</span>
      </div>
    </Menu>
  );
};

export default NotificationsList;
