import { Injectable, inject } from '@angular/core';
import { collection, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { EstadoOrganizacion, Organizacion } from '../domain/organizacion';
import { FIRESTORE } from './firebase';

@Injectable({ providedIn: 'root' })
export class OrganizacionesService {
  private readonly db = inject(FIRESTORE);
  private readonly collectionName = 'organizaciones';

  async todas(): Promise<Organizacion[]> {
    const snap = await getDocs(query(collection(this.db, this.collectionName), orderBy('nombre')));
    return snap.docs.map((d) => ({ ...(d.data() as Organizacion), id: d.id }));
  }
  async porId(id: string): Promise<Organizacion | null> {
    const snap = await getDoc(doc(this.db, this.collectionName, id));
    return snap.exists() ? ({ ...(snap.data() as Organizacion), id: snap.id }) : null;
  }
  async porSlug(slug: string): Promise<Organizacion | null> {
    const snap = await getDocs(query(collection(this.db, this.collectionName), where('slug', '==', slug)));
    const first = snap.docs[0];
    return first ? ({ ...(first.data() as Organizacion), id: first.id }) : null;
  }
  async porUsuario(usuarioId: string): Promise<Organizacion | null> {
    const snap = await getDocs(query(collection(this.db, this.collectionName), where('usuarioId', '==', usuarioId)));
    const first = snap.docs[0];
    return first ? ({ ...(first.data() as Organizacion), id: first.id }) : null;
  }
  async guardar(org: Organizacion): Promise<void> {
    await setDoc(doc(this.db, this.collectionName, org.id), org, { merge: true });
  }
  async actualizar(id: string, cambios: Partial<Organizacion>): Promise<void> {
    await updateDoc(doc(this.db, this.collectionName, id), cambios);
  }
  async cambiarEstado(id: string, estado: EstadoOrganizacion): Promise<void> {
    await this.actualizar(id, { estado });
  }
}
