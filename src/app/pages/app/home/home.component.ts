import {Component, HostBinding, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {HeaderComponent} from "../header/header.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {SidenavService} from "../../../services/sidenav/sidenav.service";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    HeaderComponent,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(public sidenavService: SidenavService) {
  }


}
