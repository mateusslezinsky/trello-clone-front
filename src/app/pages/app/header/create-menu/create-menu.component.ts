import {Component, ViewChild} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule, MatMenuTrigger} from "@angular/material/menu";
import {NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {CreateMenuSvgComponent} from "./create-menu-svg/create-menu-svg.component";
import {FormsModule, NgForm} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BoardService} from "../../../../services/board/board.service";
import {AuthService} from '../../../../services/auth/auth.service';
import {BoardDTO} from "../../../../models/board/boardDTO";

@Component({
  selector: 'app-create-menu',
  standalone: true,
  imports: [
    MatIconModule,
    MatMenuModule,
    NgIf,
    MatButtonModule,
    CreateMenuSvgComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './create-menu.component.html',
  styleUrl: './create-menu.component.css'
})
export class CreateMenuComponent {
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  menuOption: number = 0;

  constructor(private boardService: BoardService, private authService: AuthService) {
  }

  submitBoardCreate(form: NgForm){
    const user = this.authService.user.getValue();
    if (user){
      const boardDTO: BoardDTO = new BoardDTO(form.value.title, user.email);
      this.boardService.createBoard(boardDTO, user);
    }
  }

  closeMenu(){
    this.trigger.closeMenu();
    this.menuOption = 0;
  }

  setMenuItem(option: number, event: Event){
    event.stopPropagation();
    this.menuOption = option;
  }
}
