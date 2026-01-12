import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../../shared/ui/toast/toast.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './../login.scss',
})
export class Register implements OnInit {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);


  passwordVisible: boolean = false
  registerFormGroup!: FormGroup;
  isSubmitted: boolean = false;
  authError: boolean = false;
  authMessage:string = 'Email or Password are wrong';

  initRegisterForm() {
    this.registerFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    this.isSubmitted = true;

    if (this.registerFormGroup.invalid) return;

    this.authService.register(this.registerForm['name'].value,this.registerForm['email'].value, this.registerForm['password'].value).subscribe(
      (user) => {
        this.authError = false;
        this.router.navigate(['/login']);
      },
      (error: HttpErrorResponse) => {
        console.log(error)
        this.authError = true;
        if (error.status !== 400) {
          this.authMessage = error.message;
        }
      }
    );
  }

  get registerForm() {
    return this.registerFormGroup.controls;
  }

  visibilityToggle() {
    if (this.passwordVisible == false) {
      this.passwordVisible = true
    }
    else {
      this.passwordVisible = false
    }
  }
  ngOnInit(): void {
    this.initRegisterForm()
  }
}
