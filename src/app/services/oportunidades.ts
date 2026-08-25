import { Injectable, inject } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { EstadoOportunidad, Oportunidad } from '../domain/oportunidad';
import { FIRESTORE } from './firebase';

@Injectable({ providedIn: 'root' })
export class OportunidadesService {
  private readonly db = inject(FIRESTORE);
  private readonly collectionName = 'oportunidades';

  async todas(): Promise<Oportunidad[]> {
    const snap = await getDocs(
      query(collection(this.db, this.collectionName), orderBy('fechaCreacion', 'desc')),
    );
    return snap.docs.map((d) => this.map(d.id, d.data() as Omit<Oportunidad, 'id'>));
  }
  async publicadas(): Promise<Oportunidad[]> {
    const snap = await getDocs(
      query(collection(this.db, this.collectionName), where('estado', '==', 'Publicada')),
    );
    return snap.docs.map((d) => this.map(d.id, d.data() as Omit<Oportunidad, 'id'>));
  }
  async porId(id: string): Promise<Oportunidad | null> {
    const snap = await getDoc(doc(this.db, this.collectionName, id));
    return snap.exists() ? this.map(snap.id, snap.data() as Omit<Oportunidad, 'id'>) : null;
  }
  async porSlug(slug: string): Promise<Oportunidad | null> {
    const snap = await getDocs(
      query(collection(this.db, this.collectionName), where('slug', '==', slug)),
    );
    const first = snap.docs[0];
    return first ? this.map(first.id, first.data() as Omit<Oportunidad, 'id'>) : null;
  }
  async porOrganizacion(organizacionId: string): Promise<Oportunidad[]> {
    const snap = await getDocs(
      query(
        collection(this.db, this.collectionName),
        where('organizacionId', '==', organizacionId),
      ),
    );
    return snap.docs.map((d) => this.map(d.id, d.data() as Omit<Oportunidad, 'id'>));
  }
  async crear(data: Omit<Oportunidad, 'id'>): Promise<string> {
    const ref = await addDoc(collection(this.db, this.collectionName), data);
    return ref.id;
  }
  async actualizar(id: string, cambios: Partial<Oportunidad>): Promise<void> {
    await updateDoc(doc(this.db, this.collectionName, id), {
      ...cambios,
      fechaActualizacion: new Date().toISOString(),
    });
  }
  async cambiarEstado(id: string, estado: EstadoOportunidad): Promise<void> {
    await this.actualizar(id, { estado });
  }
  async aprobar(id: string): Promise<void> {
    await this.cambiarEstado(id, 'Publicada');
  }
  async rechazar(id: string): Promise<void> {
    await this.cambiarEstado(id, 'Rechazada');
  }
  async cerrar(id: string): Promise<void> {
    await this.cambiarEstado(id, 'Cerrada');
  }

  private map(id: string, data: Omit<Oportunidad, 'id'>): Oportunidad {
    return { ...data, id };
  }
}
