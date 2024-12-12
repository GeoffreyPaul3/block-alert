import React from 'react';
import { Bell } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { formatRelativeTime } from '../../utils/formatters';

export const NotificationsPanel: React.FC = () => {
  const { notifications, markNotificationAsRead } = useStore();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h2>
      </div>
      
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No notifications yet
          </p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => markNotificationAsRead(notification.id)}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                notification.read
                  ? 'bg-gray-50 dark:bg-gray-700'
                  : 'bg-blue-50 dark:bg-blue-900'
              }`}
            >
              <p className="text-sm text-gray-900 dark:text-white mb-1">
                {notification.message}
              </p>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatRelativeTime(notification.timestamp)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};