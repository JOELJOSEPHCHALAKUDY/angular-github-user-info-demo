import { Injectable } from '@angular/core';
import { Observable,Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  constructor() { }

  private subject = new Subject<any>();

  sendMessage(message: object) {
      this.subject.next(message);
  }

  clearMessage() {
      this.subject.next({});
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }

  
}