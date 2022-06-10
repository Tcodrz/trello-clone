import { Icons } from '@ui-components';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  messages: string[] = [''];
  Icons = Icons;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required])
    });
  }
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.showMessage('Looks like one or more details is incorrect.');
    }
    console.log(this.loginForm.value);
  }

  showMessage(message: string): void {
    this.messages.push(message);
    setTimeout(() => {
      this.messages = [''];
    }, 2000);
  }
  onLogInWithGoogle() {
    this.userService.signInWithGoogle();
  }
}
