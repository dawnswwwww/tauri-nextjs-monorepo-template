import {
  NotificationApi,
  sendNotificationFn,
  requestPermissionFn,
  isPermissionGrantedFn,
  isSupportedFn,
} from "./type";

/**
 * 从浏览器上下文获取 Notification
 */
const getBrowserNotification = (): typeof Notification | null => {
  if ("Notification" in window) {
    return Notification;
  }
  return null;
};

export class BrowserNotification implements NotificationApi {
  isSupported: isSupportedFn = () => {
    return typeof window !== "undefined" && "Notification" in window;
  };

  isPermissionGranted: isPermissionGrantedFn = () => {
    const _notification = getBrowserNotification();
    if (!_notification) {
      return Promise.resolve(false);
    }

    return Promise.resolve(_notification.permission === "granted");
  };

  requestPermission: requestPermissionFn = async () => {
    const _notification = getBrowserNotification();
    if (!_notification) {
      return Promise.resolve(false);
    }

    const permission = await _notification.requestPermission();
    return permission === "granted";
  };

  sendNotification: sendNotificationFn = (title: string, message: string) => {
    const _notification = getBrowserNotification();
    if (!_notification) {
      return Promise.resolve();
    }

    new _notification(title, { body: message });
    return Promise.resolve();
  };
}
