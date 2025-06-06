import { Notification } from "@/core/Entities";
import { NotificationBox } from "@/core/Dispaly";
import { INotification, IScene } from "@/interfaces";

export class NotifyManager {
  static _instance: NotifyManager;
  // private scene!: IScene;
  private entity: Notification = new Notification();
  private uiNotification: NotificationBox = new NotificationBox();

  constructor() {
    if (NotifyManager._instance) {
      return NotifyManager._instance;
    }

    NotifyManager._instance = this;
  }

  setScene(_scene: IScene) {
    // this.scene = scene;
  }

  updateUI() {
    this.entity.getNotifications();
    this.uiNotification.update();
  }

  push(notification: INotification): void {
    this.entity.push(notification);
    this.updateUI();
  }

  pop() {
    this.entity.pop();
    this.updateUI();
  }
}
