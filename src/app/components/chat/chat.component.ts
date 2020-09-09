import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  headerMessage = "Join a Channel";
  selectedChannel:string = "";

  messageInput:string="";
  messages:message[] = [];
  inChannel = false;

  constructor(private socketService:SocketService) { }

  ngOnInit(): void {
    this.socketService.getMessage((m)=>{
      this.messages.push(m)
    });
    this.socketService.joinedChannel((c)=> {
      this.selectedChannel = c;
      this.headerMessage = "";
      this.inChannel = true;
    });
    this.socketService.leftChannel((c)=> {
      this.selectedChannel = "";
      this.headerMessage = "Join a Channel";
      this.messages = [];
      this.inChannel = false;
    })
  }

  uploadImage() {

  }

  sendMessage() {
    if(this.messageInput && this.inChannel) {
      this.socketService.sendMessage(this.messageInput);
      this.messageInput = "";
    }
  }

}

class message {
  message:string;
  sender:string;
  sent:string;
  constructor(Message, Sender, Sent:Date) {
    console.log();
    this.message = Message;
    this.sender = Sender;
    this.sent = Sent.toLocaleTimeString();
  }
}
