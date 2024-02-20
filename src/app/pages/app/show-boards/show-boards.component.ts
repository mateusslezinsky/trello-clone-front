import {Component, OnInit} from '@angular/core';
import {BoardService} from "../../../services/board/board.service";
import {AuthService} from "../../../services/auth/auth.service";
import {User} from "../../../models/user/user.model";
import {BehaviorSubject, Subscription} from "rxjs";
import {Board} from "../../../models/board/board.model";
import {AsyncPipe, NgForOf} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-show-boards',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    MatCardModule,
    RouterLink,
    HeaderComponent
  ],
  templateUrl: './show-boards.component.html',
  styleUrl: './show-boards.component.css'
})
export class ShowBoardsComponent implements OnInit {
  boardsInfo: BehaviorSubject<Board[] | null> = this.boardService.boardsList;

  constructor(private boardService: BoardService, private authService: AuthService) {
  }

  ngOnInit(): void {
    const user: User | null = this.authService.user.getValue();
    if (!user) return;
    this.boardService.showAllBoards(user);
  }

}
