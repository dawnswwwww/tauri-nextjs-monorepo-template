import {
  NotificationApi,
  requestPermissionFn,
  sendNotificationFn,
  isPermissionGrantedFn,
  isSupportedFn,
} from "./type";
import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from "@tauri-apps/plugin-notification";

export class TauriNotification implements NotificationApi {
  requestPermission: requestPermissionFn = async () => {
    const permission = await requestPermission();
    return permission === "granted";
  };

  sendNotification: sendNotificationFn = (title: string, message: string) => {
    console.log("sendNotification", title, message);
    sendNotification({
      title,
      body: message,
    });
    return Promise.resolve();
  };

  isPermissionGranted: isPermissionGrantedFn = async () => {
    const permission = await isPermissionGranted();
    return permission;
  };

  isSupported: isSupportedFn = () => {
    return true;
  };
}
