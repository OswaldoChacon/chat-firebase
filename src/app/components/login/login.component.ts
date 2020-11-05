import { ChatService } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  constructor(
    public chatService: ChatService
  ) { }

  ngOnInit(): void {
  }

  ingresar(proveedor: string) {
    this.chatService.login(proveedor);
  }
}
