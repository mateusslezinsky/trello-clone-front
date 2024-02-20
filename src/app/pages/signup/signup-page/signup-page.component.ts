import {Component} from '@angular/core';
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {LogoComponent} from "../../../components/logo/logo.component";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../services/auth/auth.service";
import {RegisterDTO} from "../../../models/auth/register/registerDTO";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [
    FormsModule,
    LogoComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    RouterLink,
    MatProgressSpinnerModule,
    NgIf
  ],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})
export class SignupPageComponent {
  passwordsMatch = false;
  password = '';
  confirmPassword = '';
  isLoading = false;
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    this.isLoading = true
    this.authService.signUp(
      new RegisterDTO(form.value.email, form.value.password, form.value.name)
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

  checkIfPasswordsMatch() {
    this.passwordsMatch = this.password === this.confirmPassword;
  }

  onValueChange(newValue: string, propertyName: string) {
    Object.assign(this, {[propertyName]: newValue});
    this.checkIfPasswordsMatch();
  }
}
