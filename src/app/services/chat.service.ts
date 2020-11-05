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
    this.auth.authState.pipe(
      tap(console.log)
    ).subscribe(usuario => {      
      if (!usuario)
        return


      this.usuario.nombre = usuario.displayName;
      this.usuario.uid = usuario.uid;      
    });
  }

  login(proveedor: string) {
    if(proveedor === 'google')
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    else if(proveedor === 'twitter')
    this.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
  }

  logout() {
    this.usuario = {};
    this.auth.signOut();
    // console.log(this.usuario);
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
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    }

    return this.itemsCollection.add(mensaje)

  }
}



