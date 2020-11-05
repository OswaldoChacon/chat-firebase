import { ChatService } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit {

  mensaje: string = '';
  elemento: any;
  constructor(
    public chatService: ChatService
  ) {
    this.chatService.cargarMensajes().subscribe(() => {
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight
      }, 20);
    })
  }

  ngOnInit(): void {
    this.elemento = document.getElementById('app-mensajes');
  }

  enviarMensaje() {
    this.chatService.agregarMensaje(this.mensaje)
      .then(() => {
        this.mensaje = '';
      })
      .catch((error) => console.error('Error', error))
  }
}
