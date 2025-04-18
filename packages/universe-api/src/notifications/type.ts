export type requestPermissionFn = () => Promise<boolean>;

export type sendNotificationFn = (title: string, message: string) => void;

export type isPermissionGrantedFn = () => Promise<boolean>;

export type isSupportedFn = () => boolean;

export interface NotificationApi {
  requestPermission: requestPermissionFn;
  sendNotification: sendNotificationFn;
  isPermissionGranted: isPermissionGrantedFn;
  isSupported: isSupportedFn;
}
