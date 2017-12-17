import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/switchMap';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';


import { Member } from '../entities/member';
import { MemberServiceService } from '../services/member-service.service';


@Component({
  selector: 'app-member-viewer',
  templateUrl: './member-viewer.component.html',
  styleUrls: ['./member-viewer.component.css'],
  providers: [MemberServiceService]
})
export class MemberViewerComponent implements OnInit {

  private member: Member;

  constructor(private memberService: MemberServiceService, private route: ActivatedRoute) {

  }

  memberId: number;
  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.memberService.getMember(+params['id']))
      .subscribe(member => this.member = member);
  }

}
