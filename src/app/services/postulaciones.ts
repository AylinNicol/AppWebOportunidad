import { Injectable, inject } from '@angular/core';
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { EstadoPostulacion, HistorialPostulacion, Postulacion } from '../domain/postulacion';
import { FIRESTORE } from './firebase';

@Injectable({ providedIn: 'root' })
export class PostulacionesService {
  private readonly db = inject(FIRESTORE);
  private readonly collectionName = 'postulaciones';

  async porId(id: string): Promise<Postulacion | null> {
    const snap = await getDoc(doc(this.db, this.collectionName, id));
    return snap.exists() ? ({ ...(snap.data() as Postulacion), id: snap.id }) : null;
  }
  async porPostulante(usuarioId: string): Promise<Postulacion[]> {
    const snap = await getDocs(query(collection(this.db, this.collectionName), where('usuarioId', '==', usuarioId)));
    return snap.docs.map((d) => ({ ...(d.data() as Postulacion), id: d.id }));
  }
  async porOrganizacion(organizacionId: string): Promise<Postulacion[]> {
    const snap = await getDocs(query(collection(this.db, this.collectionName), where('organizacionId', '==', organizacionId)));
    return snap.docs.map((d) => ({ ...(d.data() as Postulacion), id: d.id }));
  }
  async porOportunidad(oportunidadId: string): Promise<Postulacion[]> {
    const snap = await getDocs(query(collection(this.db, this.collectionName), where('oportunidadId', '==', oportunidadId)));
    return snap.docs.map((d) => ({ ...(d.data() as Postulacion), id: d.id }));
  }
  async yaPostulo(usuarioId: string, oportunidadId: string): Promise<boolean> {
    const snap = await getDocs(query(collection(this.db, this.collectionName), where('usuarioId', '==', usuarioId), where('oportunidadId', '==', oportunidadId)));
    return !snap.empty;
  }
  async crear(data: Omit<Postulacion, 'id'>): Promise<string> {
    if (await this.yaPostulo(data.usuarioId, data.oportunidadId)) throw new Error('Ya existe una postulación para esta oportunidad.');
    const ref = await addDoc(collection(this.db, this.collectionName), data);
    return ref.id;
  }
  async cambiarEstado(id: string, estado: EstadoPostulacion, observacion?: string): Promise<void> {
    const actual = await this.porId(id);
    if (!actual) throw new Error('La postulación no existe.');
    const ahora = new Date().toISOString();
    const evento: HistorialPostulacion = { estado, fecha: ahora, ...(observacion ? { observacion } : {}) };
    await updateDoc(doc(this.db, this.collectionName, id), {
      estado,
      historial: [...actual.historial, evento],
      fechaActualizacion: ahora,
    });
  }
}
