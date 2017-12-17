import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule ,JsonpModule } from '@angular/http';

//router module
import {RouterModule} from '@angular/router';

//adding hammerjs for slide toggle
import 'hammerjs';


//angular material components
import {MdButtonModule} from '@angular2-material/button';
import {MdIconModule} from '@angular2-material/icon';
import {MdIconRegistry} from '@angular2-material/icon';
import {MdCardModule} from '@angular2-material/card';
import {MdTabsModule} from '@angular2-material/tabs';
import {MdInputModule} from '@angular2-material/input';
import {MdSliderModule} from '@angular2-material/slider';
import {MdListModule} from '@angular2-material/list';
import {MdToolbarModule} from '@angular2-material/toolbar';
import {MdRadioModule} from '@angular2-material/radio';



import { AppComponent } from './app.component';
import { HeadComponent } from './body/head/head.component';
import { FooterComponent } from './body/footer/footer.component';
import { HomeImageComponent } from './home-image/home-image.component';
import { HomeBodyComponent } from './home-body/home-body.component';
// import { HomeComponent } from './accueil/accueil.component';
import { CvViewerComponent } from './cv-viewer/cv-viewer.component';
import { ReportViewerDetailComponent } from './report-viewer-detail/report-viewer-detail.component';
import { ReportViewerComponent } from './report-viewer/report-viewer.component';
import { ListReportViewerComponent } from './list-report-viewer/list-report-viewer.component';
import { AdminContactComponent } from './admin-contact/admin-contact.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForumsViewerComponent } from './forums-viewer/forums-viewer.component';
import { ForumViewerComponent } from './forum-viewer/forum-viewer.component';
import { NewsViewerComponent } from './news-viewer/news-viewer.component';
import { MembersViewerComponent } from './members-viewer/members-viewer.component';
import { MemberViewerComponent } from './member-viewer/member-viewer.component';
import { ForumCreatorComponent } from './forum-creator/forum-creator.component';
import { TimeapiTestComponent } from './test/timeapi-test/timeapi-test.component';
import {AlertComponent} from "./_directives/alert.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AuthGuard} from "./_guards/auth.guard";
import {AlertService} from "./_services/alert.service";
import {AuthenticationService} from "./_services/authentication.service";
import {UserService} from "./_services/user.service";
import {ProfileComponent} from "./membre/components/profile/profile.component";
import {DocsComponent} from "./membre/components/docs/docs.component";
import {ChatComponent} from "./membre/components/chat/chat.component";
import {ProjetsComponent} from "./membre/components/projets/projets.component";
import {ProjetComponent} from "./membre/components/projet/projet.component";
import {NotificationCenterComponent} from "./membre/components/notification-center/notification-center.component";
import {AddGroupChatComponent} from "./membre/components/add-group-chat/add-group-chat.component";
import {PersonneListComponent} from "./membre/components/personne/personne-list.component";
import {AddMemberComponent} from "./membre/components/add-member/add-member.component";
import {WelcomeComponent} from "./membre/components/welcome/welcome.component";
import {OnlineDocComponent} from "./membre/components/online-doc/online-doc.component";
import {NotReadyComponent} from "./membre/components/not-ready/not-ready.component";
import {IdService} from "./membre/services/id.service";
import {HomeComponent} from "./membre/components/home/home.component";
import { AccueilComponent} from "./accueil/accueil.component";
import {PersonneAutoriseeService} from "./_services/personne_autorisee.service";
import {PersonneAddEditComponent} from "./membre/components/personne/personne-add-edit.component";
import {PersonneAddSongComponent} from "./membre/components/personne/personne-add-song.component";
import {PubSubService} from "./_services/pubSubService.service";
import {CommonModule} from "@angular/common";
//--------------




@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    FooterComponent,
    HomeImageComponent,
    HomeBodyComponent,
   // HomeComponent,
    CvViewerComponent,
    ReportViewerDetailComponent,
    ReportViewerComponent,
    ListReportViewerComponent,
    AdminContactComponent,
    SignInComponent,
    SignUpComponent,
    ForumsViewerComponent,
    ForumViewerComponent,
    NewsViewerComponent,
    MembersViewerComponent,
    MemberViewerComponent,
    ForumCreatorComponent,
    TimeapiTestComponent, //////////---------/////////////////
    AlertComponent,
    LoginComponent,
    RegisterComponent, /////////------------membres//////
    ProfileComponent,
    DocsComponent,
    ChatComponent,
    ProjetsComponent,
    ProjetComponent,
    NotificationCenterComponent,
    AddGroupChatComponent,
    //AdminComponent,
    PersonneAddEditComponent,
    PersonneAddSongComponent,
    PersonneListComponent,
    AddMemberComponent,
    WelcomeComponent,
    OnlineDocComponent,
    NotReadyComponent,
    HomeComponent,
    AccueilComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MdIconModule,
    MdButtonModule,
    MdCardModule,
    MdToolbarModule,
    JsonpModule,
    MdTabsModule,
    MdRadioModule,
    MdInputModule,
    MdSliderModule,
   // Browser
    MdListModule,


    RouterModule.forRoot([



      { path: 'home', component: HomeComponent, canActivate: [AuthGuard], children:[
        {path:'profil',component:ProfileComponent, canActivate: [AuthGuard]},
        {path:'docs',component:DocsComponent, canActivate: [AuthGuard]},
        {path:'notif',component:NotificationCenterComponent, canActivate: [AuthGuard]},
        {path:'chat',component:ChatComponent, canActivate: [AuthGuard]},
        {path:'projets',component:ProjetsComponent, canActivate: [AuthGuard]},
        {path:'projet',component:ProjetComponent, canActivate: [AuthGuard]},
        {path:'addgroupechat',component:AddGroupChatComponent, canActivate: [AuthGuard]},
        {path:'personne',component:PersonneListComponent, canActivate: [AuthGuard], children:
        [
          {path:'edit/:id',component:PersonneAddEditComponent, canActivate: [AuthGuard]},
          {path: 'add', component: PersonneAddEditComponent,canActivate: [AuthGuard] },
          {path: 'addsong', component: PersonneAddSongComponent,canActivate: [AuthGuard] }
        ]
        },
        {path:'addmember',component:AddMemberComponent, canActivate: [AuthGuard]},
        {path:'welcome/1',component:WelcomeComponent, canActivate: [AuthGuard]},
        {path:'edit',component:OnlineDocComponent, canActivate: [AuthGuard]},
        {path:'not_ready',component:NotReadyComponent, canActivate: [AuthGuard]},

      ] },
      {path:'connexion',component:SignInComponent},

      {path:'',component:AccueilComponent},
      {path:'news',component:NewsViewerComponent},
      {path:'forums',component:ForumsViewerComponent},
      {path:'membres',component:MembersViewerComponent},
      {path:'membres/:id',component:MemberViewerComponent}, /* copy the component MembreprofieleViewer */
      {path:'publications',component:ListReportViewerComponent},
      {path:'contact',component:AdminContactComponent},
      {path:'inscription',component:SignUpComponent},
//      {path:'inscription',component:SignInComponent},
      {path:'publication/:id',component:ReportViewerDetailComponent},
      {path:'cv/:id',component:CvViewerComponent},
      {path:'forum/:id',component:ForumViewerComponent},
      {path:'forumcreation',component:ForumCreatorComponent}, ///////////-----membr////


      // otherwise redirect to accueil
      // { path: '**', redirectTo: '' }


    ])
  ],
  providers: [
    MdIconRegistry,
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    IdService,
    PersonneAutoriseeService,
    PubSubService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {


}
