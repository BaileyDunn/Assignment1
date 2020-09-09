import { Component, OnInit, ɵɵNgOnChangesFeature } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SocketService } from '../../services/socket.service';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css']
})
export class LeftPanelComponent implements OnInit {
  readonly Root_url = "http://localhost:3000";
  constructor(private http: HttpClient, private socketService:SocketService) { }

  username = "";
  password = "";
  user:Account = null;
  loggedIn = false;
  selectedChannel:string = null;
  currentChannel:string = "";

  newChannel = "";
  selectedRemoveChannel:string = null
  channels = [];

  newGroup = "";
  selectedRemoveGroup:string = null
  groups = [];

  ngOnInit(): void {
    this.socketService.initSocket();
    this.socketService.getChannelList((l) => {
      this.channels = JSON.parse(l);
    });
    this.socketService.getGroupList((g) => {
      console.log(g)
      this.groups = JSON.parse(g);
    });
  }

  login() {
    //console.log(this.username + this.password);
    this.http.post(this.Root_url + "/login", { username: this.username, password: this.password }, httpOptions)
    .subscribe((data: any) => {
      if(data.result != null) {
        this.user = data.result;
        this.loggedIn = true;
        //store into session
        sessionStorage.setItem("username", this.user.username);
        sessionStorage.setItem("email", this.user.email);
        sessionStorage.setItem("super", this.user.superUser.toString());

        //probably gonna wanna refresh side
        this.socketService.reqChannelList();
        this.socketService.reqGroupList();
      } else {
        alert("Incorrect username or password!");
      }
    });
  }

  channelChanged() {
    console.log("Channel Changed to: ");
  }

  createChannel() {
    this.socketService.createChannel(this.newChannel);
    this.socketService.reqChannelList();
    this.newChannel = "";
  }

  removeChannel() {
    this.socketService.removeChannel(this.removeChannel);
    this.socketService.reqChannelList();
    this.removeChannel = null;
  }

  createGroup() {
    this.socketService.createGroup(this.newGroup);
    this.socketService.reqGroupList();
    this.newGroup = "";
  }

  removeGroup() {
    this.socketService.removeGroup(this.removeGroup);
    this.socketService.reqGroupList();
    this.removeChannel = null;
  }

  joinChannel() {
    if(this.selectedChannel != null) {
      this.socketService.joinChannel(this.selectedChannel)
    }
  }

  leaveChannel() {
    this.socketService.leaveChannel(this.currentChannel)
  }

}

class Account {
  username:string;
  password:string;
  email:string;
  superUser:boolean;
  constructor(Name, Password, Email, SuperUser) { 
      this.username = Name;
      this.password = Password;
      this.email = Email;
      this.superUser = SuperUser
   }
}
