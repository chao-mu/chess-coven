// React
import React from "react";

type ProgressBarProps = {
  progress: number;
};

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className="mb-4 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
      <div
        className="h-2.5 rounded-full bg-blue-600 dark:bg-blue-500"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};
