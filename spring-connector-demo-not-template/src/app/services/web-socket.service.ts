import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  topic: string = "/topic/employees";
  stompClient: any;
  greeting: any;
  handler: any;
  webSocketEndPoint: string = 'http://localhost:8080/ws';

  constructor() { }
  _connect(handler, component) {
    console.log(this.webSocketEndPoint);
    let socket = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(socket);

    console.log("socket connection .. ");
    this.stompClient.connect({}, frame => {
      this.stompClient.subscribe(this.topic, sdkEvent => {
        handler(sdkEvent, component);
        //this.onMessageReceived(sdkEvent);
      });
    });
  };
  
  errorCallBack(error) {
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
      //this._connect(handler);
    }, 5000);

  }

  sendUpdates(updatedMessage) {
    console.log("calling logout api via web socket");
    this.stompClient.send("/app/hello", {}, JSON.stringify(updatedMessage));
  }
  onMessageReceived(sdkEvent) {
    console.log(sdkEvent);
  }
  

}
