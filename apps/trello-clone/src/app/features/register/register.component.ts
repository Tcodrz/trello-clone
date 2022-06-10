import { Icons } from '@ui-components';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  Icons = Icons;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
  ) { }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email])
    });
  }
  onSubmit() {
    this.userService.register(this.registerForm.value);
  }
  onSignInWithGoogle() {
    this.userService.signInWithGoogle();
  }

}
