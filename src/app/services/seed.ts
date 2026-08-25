import { Injectable, inject } from '@angular/core';
import { doc, setDoc } from 'firebase/firestore';

import { USUARIOS } from '../data/usuarios.data';
import { ORGANIZACIONES } from '../data/organizaciones.data';
import { OPORTUNIDADES } from '../data/oportunidades.data';
import { POSTULACIONES } from '../data/postulaciones.data';

import { FIRESTORE } from './firebase';

@Injectable({
  providedIn: 'root',
})
export class SeedService {
  private readonly db = inject(FIRESTORE);

  async cargarTodo(): Promise<void> {
    console.log('🌱 Iniciando seed...');

    // 1. Usuarios
    for (const usuario of USUARIOS) {
      await setDoc(doc(this.db, 'usuarios', usuario.id), usuario);
    }

    console.log(`OK Usuarios: ${USUARIOS.length}`);

    // 2. Organizaciones
    for (const organizacion of ORGANIZACIONES) {
      await setDoc(doc(this.db, 'organizaciones', organizacion.id), organizacion);
    }

    console.log(`OK Organizaciones: ${ORGANIZACIONES.length}`);

    // 3. Oportunidades
    for (const oportunidad of OPORTUNIDADES) {
      await setDoc(doc(this.db, 'oportunidades', oportunidad.id), oportunidad);
    }

    console.log(`OK Oportunidades: ${OPORTUNIDADES.length}`);

    // 4. Postulaciones
    for (const postulacion of POSTULACIONES) {
      await setDoc(doc(this.db, 'postulaciones', postulacion.id), postulacion);
    }

    console.log(`OK Postulaciones: ${POSTULACIONES.length}`);

    console.log('SEED COMPLETADO');
  }
}
