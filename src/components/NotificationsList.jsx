import { formatDistance } from "date-fns";

const NotificationsList = ({ data }) => {
  const timestamp = new Date(
    data.timestamp._seconds * 1000 + data.timestamp._nanoseconds / 1000000
  );
  const now = new Date();
  const displayTime = formatDistance(timestamp, now, { addSuffix: true });

  return (
    <div className="divide-y divide-gray-100">
      <a href="#" className="flex px-4 py-3 hover:bg-gray-100">
        <div className="w-full">
          <div className="text-gray-500 text-sm mb-1.5">
            {" "}
            <span className="font-semibold text-gray-900">
              {data.title}
            </span>: {data.body}
          </div>
          <div className="text-xs text-blue-600">{displayTime}</div>
        </div>
      </a>
    </div>
  );
};

export default NotificationsList;
