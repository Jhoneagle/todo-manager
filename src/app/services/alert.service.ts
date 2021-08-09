import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Alert, AlertType } from '../types/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<Alert>();

  onAlert(): Observable<Alert> {
    return this.subject.asObservable().pipe();
  }

  success(message: string) {
    this.alert({ type: AlertType.Success, message } as Alert);
  }

  error(message: string) {
    this.alert({ type: AlertType.Error, message } as Alert);
  }

  info(message: string) {
    this.alert({ type: AlertType.Info, message } as Alert);
  }

  warn(message: string) {
    this.alert({ type: AlertType.Warning, message } as Alert);
  }

  alert(alert: Alert) {
    this.subject.next(alert);
  }
}
