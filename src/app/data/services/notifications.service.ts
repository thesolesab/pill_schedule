import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor() { }

  public async requestPermission(): Promise<boolean> {
    const result = await Notification.requestPermission()
    console.log("Notification permission:", result);
    return result === 'granted'
  }

  public showNotification(title: string, options?: NotificationOptions): void {
    console.log("Попытка показать уведомление", title, options);

    if (!("Notification" in window)) {
      console.warn("Этот браузер не поддерживает уведомления");
      return;
    }
    if (Notification.permission === 'granted') {
      new Notification(title, options)
    } else {
      console.warn("Уведомления не разрешены");
    }
  }

  public scheduleWeeklyNotification(title: string, options?: NotificationOptions): void {
    const now = new Date()
    const dayOfWeek = now.getDay()
    const daysUntilNextWeek = 7 - dayOfWeek
    const timeUntilNotification = daysUntilNextWeek * 24 * 60 * 60 * 1000

    setTimeout(() => {
      this.showNotification(title, options)
      this.scheduleWeeklyNotification(title, options)
    }, timeUntilNotification)
  }
}
