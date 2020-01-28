import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userCredintalsForm;
  constructor(
    private route: Router,
    private forBuilder :FormBuilder
  ) { 
    this.userCredintalsForm = this.forBuilder.group({
      email:'',
      password:''
    });
    
  }

  ngOnInit() {
  }
  
  onLoginSubmit(){
    console.warn("Your Logining in");
    this.route.navigate(['/operations']);
  }


}
