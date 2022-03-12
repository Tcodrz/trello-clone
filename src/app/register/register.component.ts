import { Icons } from './../layout/icon/icon.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

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
  ) { }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: this.fb.control('', [Validators.required])
    });
  }
  onSubmit() {
    console.log(this.registerForm.value);
  }

}
