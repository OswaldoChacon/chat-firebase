import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { tap, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<any>;
  chats: any[] = [];
  usuario: any = {};
  constructor(
    public auth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.auth.authState.subscribe(usuario => {
      if (!usuario)
        return


      this.usuario.nombre = usuario.displayName;
      this.usuario.uid = usuario.uid;
      console.log(this.usuario)
    });
  }

  login(proveedor: string) {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.auth.signOut();
  }

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



