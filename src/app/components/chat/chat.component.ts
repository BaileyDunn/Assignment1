import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public selectedRoom:string = "Login to Join a Room";

  constructor() { }

  ngOnInit(): void {
  }

  uploadImage() {

  }

  sendMessage() {

  }

}
