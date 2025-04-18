import { BrowserNotification } from "./browser";
import { TauriNotification } from "./tauri";
import { isBrowser, isTauri } from "../runtime";

export const getNotificationApi = () => {
  switch (true) {
    case isBrowser():
      return new BrowserNotification();
    case isTauri():
      return new TauriNotification();
    default:
      throw new BrowserNotification();
  }
};
