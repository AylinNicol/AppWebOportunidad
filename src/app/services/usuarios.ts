import { Injectable, inject } from '@angular/core';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { EstadoUsuario, Usuario } from '../domain/usuario';
import { FIRESTORE } from './firebase';

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  private readonly db = inject(FIRESTORE);
  private readonly collectionName = 'usuarios';

  async todos(): Promise<Usuario[]> {
    const snap = await getDocs(query(collection(this.db, this.collectionName), orderBy('nombre')));
    return snap.docs.map((d) => ({ ...(d.data() as Usuario), id: d.id }));
  }
  async porId(id: string): Promise<Usuario | null> {
    const snap = await getDoc(doc(this.db, this.collectionName, id));
    return snap.exists() ? { ...(snap.data() as Usuario), id: snap.id } : null;
  }
  async guardar(usuario: Usuario): Promise<void> {
    await setDoc(doc(this.db, this.collectionName, usuario.id), usuario, { merge: true });
  }
  async actualizar(id: string, cambios: Partial<Usuario>): Promise<void> {
    await updateDoc(doc(this.db, this.collectionName, id), cambios);
  }
  async cambiarEstado(id: string, estado: EstadoUsuario): Promise<void> {
    await this.actualizar(id, { estado });
  }
}
