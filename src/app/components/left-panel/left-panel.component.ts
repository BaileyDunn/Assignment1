import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  constructor(private http: HttpClient) { }

  username = "";
  password = "";
  selectedChannel = "";
  channels = ["Channel 1", "Channel 2", "Channel 3"];

  ngOnInit(): void {

  }

  login() {
    console.log(this.username + this.password);
    this.http.post(this.Root_url + "/login", { username: this.username, password: this.password }, httpOptions)
    .subscribe((data: any) => {
      console.log(data);
    });
  }

}
