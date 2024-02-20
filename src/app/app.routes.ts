import {mapToCanActivate, Route, Routes} from '@angular/router';
import {LoginPageComponent} from "./pages/login/login-page/login-page.component";
import {SignupPageComponent} from "./pages/signup/signup-page/signup-page.component";
import {HomeComponent} from "./pages/app/home/home.component";
import {AuthGuard} from "./services/auth/auth.guard";
import {BoardEditComponent} from "./pages/app/board-edit/board-edit.component";
import {ShowBoardsComponent} from "./pages/app/show-boards/show-boards.component";

export const routes: Routes = [
  {
    path: "",
    component: LoginPageComponent
  },
  {
    path: "signup",
    component: SignupPageComponent
  },
  {
    path:"",
    canActivate: mapToCanActivate([AuthGuard]),
    children:[
      {
        path:"home",
        component: HomeComponent
      },
      {
        path:"b",
        children:[
          {
            path: "",
            component: ShowBoardsComponent
          },
          {
            path:":id",
            component: BoardEditComponent
          }
        ]
      }
    ]
  }
];
