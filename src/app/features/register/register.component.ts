import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { GotoService } from '../../core/services/goto.service';
import { Icons } from '../../ui-components/button/icon/icon.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  Icons = Icons;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private goto: GotoService,
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
