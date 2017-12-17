import { Component, OnInit } from '@angular/core';
import {Notif } from '../../entities/notif';
import {NotifService} from '../../services/notif.service';



@Component({
  selector: 'app-notification-center',
  templateUrl: './notification-center.component.html',
  styleUrls: ['./notification-center.component.css'],
  providers:[NotifService]
})
export class NotificationCenterComponent implements OnInit {

  private notifications : Notif[];
  constructor(private notifService:NotifService) { }

  ngOnInit() {
    this.notifService.getNotifications().subscribe(notifs => this.notifications = notifs);
  }

}
