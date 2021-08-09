import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Alert, AlertType } from '../types/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<Alert>();

  onAlert(): Observable<Alert> {
    return this.subject.asObservable().pipe(filter(x => x && x.id === 'alert'));
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
    alert.id = alert.id || 'alert';
    this.subject.next(alert);
  }
}
