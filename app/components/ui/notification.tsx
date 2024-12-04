import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

interface NotificationProps {
  message: string;
  type?: "success" | "error";
  duration?: number;
  onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({
  message,
  type = "success",
  duration = 3000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade-out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed bottom-4 right-4 p-3 rounded-md shadow-md text-sm flex items-center transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${
        type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
      }`}
    >
      <span>{message}</span>
      <button
        onClick={() => setIsVisible(false)}
        className="ml-2 focus:outline-none"
      >
        <X size={16} />
      </button>
    </div>
  );
};
