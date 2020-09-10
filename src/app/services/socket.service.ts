import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { SelectControlValueAccessor } from '@angular/forms';

const SERVER_URL = 'http://localhost:3000/chat';

@Injectable({
  providedIn: 'root'
})

export class SocketService {
  private socket;

  constructor() { }

  initSocket() {
    this.socket = io(SERVER_URL);
  }

  joinChannel(channelName) {
    this.socket.emit("joinChannel", channelName);
  }

  leaveChannel(channelName) {
    this.socket.emit("leaveChannel", channelName);
  }

  joinedChannel(next) {
    this.socket.on("joinedChannel", result=>next(result));
  }

  leftChannel(next) {
    this.socket.on("leftChannel", result=>next(result));
  }

  createChannel(channelName) {
    this.socket.emit("createChannel", channelName);
  }

  removeChannel(channelName) {
    this.socket.emit("removeChannel", channelName);
  }

  createGroup(groupName) {
    this.socket.emit("createGroup", groupName);
  }

  removeGroup(groupName) {
    this.socket.emit("removeGroup", groupName);
  }

  reqChannelList() {
    this.socket.emit("reqChannelList");
  }
  
  reqGroupList() {
    this.socket.emit("reqGroupList");
  }

  getChannelList(next) {
    this.socket.on("getChannelList", result=>next(result));
  }

  getGroupList(next) {
    this.socket.on("getGroupList", result=>next(result));
  }

  sendMessage(message) {
    console.log(message);
    this.socket.emit("message", message);
  }

  getMessage(next) {
    this.socket.on("message", result=>next(result));
  }
}
