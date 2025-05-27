import React from "react";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  Processing: "bg-blue-100 text-blue-800",
  Completed: "bg-green-100 text-green-800",
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[status] || "bg-gray-100 text-gray-800"}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;

