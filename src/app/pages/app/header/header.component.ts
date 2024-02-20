import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {AuthService} from "../../../services/auth/auth.service";
import {BehaviorSubject, Subject, Subscription} from "rxjs";
import {Router, RouterLink} from "@angular/router";
import {User} from "../../../models/user/user.model";
import {AsyncPipe, NgIf} from "@angular/common";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {LogoComponent} from "../../../components/logo/logo.component";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatMenuModule} from "@angular/material/menu";
import {CreateMenuComponent} from "./create-menu/create-menu.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {SidenavService} from "../../../services/sidenav/sidenav.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatButtonModule,
    AsyncPipe,
    MatToolbarModule,
    MatIconModule,
    LogoComponent,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatMenuModule,
    NgIf,
    CreateMenuComponent,
    MatSidenavModule,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy{
  private userSub!: Subscription;
  isAuthenticated: boolean = false;
  userInfo: BehaviorSubject<User | null> = this.authService.user;

  constructor(private authService: AuthService, public sidenavService: SidenavService, private router: Router){
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user=>{
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  public navigateTo(url: string[]) {
    this.router.navigate(url);
    this.sidenavService.toggle();
  }
}
