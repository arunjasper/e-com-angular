import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-account',
  imports: [ReactiveFormsModule],
  templateUrl: './account.html',
  styleUrl: './account.scss',
})
export class Account implements OnInit {
  profile: any = {}
  isVisible: boolean = false;
  isSubmitted: boolean = false;
  editUserFormGroup!: FormGroup;
  formBuilder = inject(FormBuilder);
  userService = inject(UserService);
  cdr = inject(ChangeDetectorRef);
  isLoading = false;

  ngOnInit(): void {
    this.userService.getUser().subscribe((user) => {
      this.profile = user
      this.initializeForm();
    })
    this.initializeForm();
  }

  initializeForm() {
    this.editUserFormGroup = this.formBuilder.group({
      name: [this.profile.name, Validators.required],
      email: [this.profile.email, [Validators.required, Validators.email]],
      role: [this.profile.role, Validators.required]
    });
    this.cdr.markForCheck();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.editUserFormGroup.invalid) return;
    const newUser: any = {
      name: this.editUserForm['name'].value,
      email: this.editUserForm['email'].value,
      role: this.editUserForm['role'].value,
    }
    console.log(newUser)
    this.closeEditModal()
    this.userService.updateUser(newUser).subscribe(
      (user:any) => {
          console.log(`${user.name} updated`)
      },
      (error: HttpErrorResponse) => {
        console.log(error)
      }
    );
  }
  get editUserForm() {
    return this.editUserFormGroup.controls;
  }

  openEditModal(user: any) {
    this.isVisible = true;
  }

  closeEditModal() {
    this.isVisible = false;
  }
}
