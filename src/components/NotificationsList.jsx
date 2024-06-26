import { formatDistance } from "date-fns";

import Text from "./Text";

const NotificationsList = ({ data }) => {
  const timestamp = new Date(
    data.timestamp._seconds * 1000 + data.timestamp._nanoseconds / 1000000
  );
  const now = new Date();
  const displayTime = formatDistance(timestamp, now, { addSuffix: true });

  return (
    <div>
      <div className="flex flex-col px-4 py-3">
        <Text className="text-sm mb-1.5">{data.body}</Text>
        <span className="text-xs text-queen-black/80">{displayTime}</span>
      </div>
    </div>
  );
};

export default NotificationsList;
