import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { tap, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<any>;
  chats: any[] = [];  
  constructor(
    private afs: AngularFirestore
  ) { }

  cargarMensajes() {
    this.itemsCollection = this.afs.collection<any>('chats', ref => ref.orderBy('fecha', 'desc').limit(4))
    return this.itemsCollection.valueChanges().pipe(
      map((mensajes: any[]) => {
        this.chats = [];
        for (let mensaje of mensajes) {
          this.chats.unshift(mensaje);
        }
        return this.chats;
      })
    );
  }

  agregarMensaje(texto: string) {
    let mensaje: any = {
      nombre: 'Demo',
      mensaje: texto,
      fecha: new Date().getTime()
    }

    return this.itemsCollection.add(mensaje)

  }
}



