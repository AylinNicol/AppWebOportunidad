import { Injectable, computed, inject, signal } from '@angular/core';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

import { RolUsuario, Usuario } from '../domain/usuario';
import { Organizacion } from '../domain/organizacion';
import { AUTH, FIRESTORE } from './firebase';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly auth = inject(AUTH);
  private readonly db = inject(FIRESTORE);

  private readonly _usuario = signal<Usuario | null>(null);
  private readonly _loading = signal(true);

  readonly usuario = this._usuario.asReadonly();
  readonly loading = this._loading.asReadonly();

  readonly autenticado = computed(() => this._usuario() !== null);
  readonly rol = computed(() => this._usuario()?.rol ?? null);

  readonly ready: Promise<void>;
  private markReady!: () => void;

  constructor() {
    this.ready = new Promise<void>((resolve) => (this.markReady = resolve));

    if (!this.auth) {
      this._loading.set(false);
      this.markReady();
      return;
    }

    onAuthStateChanged(this.auth, async (firebaseUser) => {
      try {
        if (!firebaseUser) {
          this._usuario.set(null);
          return;
        }

        const perfil = await this.leerPerfil(firebaseUser.uid);

        this._usuario.set(perfil);

        if (perfil) {
          await updateDoc(doc(this.db, 'usuarios', firebaseUser.uid), {
            ultimoAcceso: new Date().toISOString(),
          }).catch(() => undefined);
        }
      } finally {
        this._loading.set(false);
        this.markReady();
      }
    });
  }

  async loginCorreo(correo: string, password: string): Promise<void> {
    if (!this.auth) return;

    await signInWithEmailAndPassword(this.auth, correo, password);
  }

  async registrarCorreo(
    nombre: string,
    correo: string,
    password: string,
    rol: RolUsuario,
    nombreOrganizacion?: string,
  ): Promise<Usuario> {
    if (!this.auth) {
      throw new Error('Authentication no está disponible en el servidor.');
    }

    const credential = await createUserWithEmailAndPassword(this.auth, correo, password);

    await updateProfile(credential.user, {
      displayName: nombre,
    });

    const usuario = this.nuevoUsuario(credential.user.uid, nombre, correo, rol);

    if (rol === 'Organización') {
      usuario.organizacionId = credential.user.uid;
    }

    await setDoc(doc(this.db, 'usuarios', credential.user.uid), usuario);

    if (rol === 'Organización' && nombreOrganizacion) {
      const organizacion = this.nuevaOrganizacion(credential.user.uid, nombreOrganizacion);

      await setDoc(doc(this.db, 'organizaciones', organizacion.id), organizacion);
    }

    this._usuario.set(usuario);

    return usuario;
  }

  async loginGoogle(
    rolSiEsNuevo: RolUsuario = 'Postulante',
    nombreOrganizacion?: string,
  ): Promise<Usuario | null> {
    if (!this.auth) return null;

    const credential = await signInWithPopup(this.auth, new GoogleAuthProvider());

    let usuario = await this.leerPerfil(credential.user.uid);

    if (!usuario) {
      usuario = this.nuevoUsuario(
        credential.user.uid,
        credential.user.displayName ?? 'Sin nombre',
        credential.user.email ?? '',
        rolSiEsNuevo,
      );

      usuario.fotoPerfil = credential.user.photoURL ?? undefined;

      if (rolSiEsNuevo === 'Organización') {
        usuario.organizacionId = credential.user.uid;
      }

      await setDoc(doc(this.db, 'usuarios', credential.user.uid), usuario);

      if (rolSiEsNuevo === 'Organización' && nombreOrganizacion) {
        const organizacion = this.nuevaOrganizacion(credential.user.uid, nombreOrganizacion);

        await setDoc(doc(this.db, 'organizaciones', organizacion.id), organizacion);
      }
    }

    this._usuario.set(usuario);

    return usuario;
  }

  async cerrarSesion(): Promise<void> {
    if (!this.auth) return;

    await firebaseSignOut(this.auth);

    this._usuario.set(null);
  }

  async recargarPerfil(): Promise<Usuario | null> {
    if (!this.auth?.currentUser) return null;

    const perfil = await this.leerPerfil(this.auth.currentUser.uid);

    this._usuario.set(perfil);

    return perfil;
  }

  private async leerPerfil(uid: string): Promise<Usuario | null> {
    const snapshot = await getDoc(doc(this.db, 'usuarios', uid));

    return snapshot.exists() ? (snapshot.data() as Usuario) : null;
  }

  private nuevoUsuario(uid: string, nombre: string, correo: string, rol: RolUsuario): Usuario {
    const ahora = new Date().toISOString();

    return {
      id: uid,
      uidFirebase: uid,
      slug: this.slug(nombre || correo.split('@')[0]),
      nombre,
      correo,
      rol,
      estado: 'Activo',
      fechaRegistro: ahora,
      ultimoAcceso: ahora,
    };
  }

  private nuevaOrganizacion(uid: string, nombre: string): Organizacion {
    const ahora = new Date().toISOString();
    return {
      id: uid,
      slug: this.slug(nombre),
      usuarioId: uid,
      nombre,
      categoria: '',
      ubicacion: '',
      descripcion: '',
      cantidadOportunidades: 0,
      verificada: false,
      correo: '',
      fechaRegistro: ahora,
      estado: 'Activa',
    };
  }

  private slug(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }
}
