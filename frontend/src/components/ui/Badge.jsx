import React from 'react';

export function Badge({ status }) {
  const styles = {
    present: "bg-green-100 text-green-800 border-green-200",
    leave: "bg-blue-100 text-blue-800 border-blue-200",
    absent: "bg-yellow-100 text-yellow-800 border-yellow-200",
  };
  
  const labels = {
    present: "🟢 Present",
    leave: "✈️ On Leave",
    absent: "🟡 Absent",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles.absent}`}>
      {labels[status] || labels.absent}
    </span>
  );
}
