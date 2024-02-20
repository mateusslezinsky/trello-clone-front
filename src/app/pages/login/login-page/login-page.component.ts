import {Component} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {AsyncPipe, NgIf, NgOptimizedImage} from "@angular/common";
import {LogoComponent} from "../../../components/logo/logo.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, NgForm} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../services/auth/auth.service";
import {LoginDTO} from "../../../models/auth/login/LoginDTO";
import {Observable} from "rxjs";
import {ResponseDTO} from "../../../models/auth/ResponseDTO";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgOptimizedImage,
    LogoComponent,
    NgIf,
    MatProgressSpinnerModule,
    FormsModule,
    MatIconModule,
    HttpClientModule,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent{
  isLoading = false;
  error: string | null = null;
  constructor(private authService: AuthService, private router: Router) {
  }

  onSubmit(form: NgForm){
    if(!form.valid) return;
    this.isLoading = true;

    this.authService.login(
      new LoginDTO(form.value.email, form.value.password)
    ).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.router.navigate(['home'])
      },
      error: (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    });

    form.reset();

  }
}

