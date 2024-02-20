import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, tap} from "rxjs";
import {Board} from "../../models/board/board.model";
import {BaseService} from "../base/base.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BoardDTO} from "../../models/board/boardDTO";
import {User} from "../../models/user/user.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class BoardService extends BaseService {
  board = new BehaviorSubject<Board | null>(null);
  boardsList = new BehaviorSubject<Board[] | null>(null);
  constructor(private http: HttpClient, private router: Router) {
    super();
  }

  createBoard(board: BoardDTO, user: User) {
    const headers: HttpHeaders = this.headers.append('Authorization', 'Bearer ' + user.token);

    this.http.post<Board>(
      this.baseUrl + '/boards',
      JSON.stringify(board),
      {headers}
    ).subscribe(this.handleResponse.bind(this));
  }

  showAllBoards(user: User) {
    const headers: HttpHeaders = this.headers.append('Authorization', 'Bearer ' + user.token);

    this.http.get<Board[]>(
      this.baseUrl + '/boards',
      {headers}
    ).subscribe((response: Board[]) => {
      this.boardsList.next(response);
    });
  }

  handleResponse(response: Board) {
    this.board.next(new Board(response.id, response.name, response.ownerIdentifier));
    this.router.navigate(['/b', this.board.getValue()?.id]);
  }
}
