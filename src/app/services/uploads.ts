import { Injectable, inject, signal } from '@angular/core';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { STORAGE } from './firebase';

@Injectable({ providedIn: 'root' })
export class UploadsService {
  private readonly storage = inject(STORAGE);
  private readonly _progress = signal(0);
  private readonly _uploading = signal(false);
  readonly progress = this._progress.asReadonly();
  readonly uploading = this._uploading.asReadonly();

  async cv(file: File, usuarioId: string): Promise<string> {
    this.check(file, ['application/pdf'], 5 * 1024 * 1024, 'El CV debe ser PDF y pesar máximo 5 MB.');
    return this.upload(file, `cv/${usuarioId}`);
  }
  async imagen(file: File, folder: string): Promise<string> {
    this.check(file, ['image/jpeg', 'image/png', 'image/webp'], 2 * 1024 * 1024, 'La imagen debe ser JPG, PNG o WEBP y pesar máximo 2 MB.');
    return this.upload(file, folder);
  }
  async eliminar(url: string): Promise<void> {
    if (!url) return;
    try { await deleteObject(ref(this.storage, url)); } catch (e) { console.warn('[uploads] No se pudo eliminar.', e); }
  }
  private async upload(file: File, folder: string): Promise<string> {
    const target = ref(this.storage, `${folder}/${this.safeName(file.name)}`);
    this._progress.set(0); this._uploading.set(true);
    try {
      const task = uploadBytesResumable(target, file, { contentType: file.type });
      task.on('state_changed', s => this._progress.set(Math.round((s.bytesTransferred / s.totalBytes) * 100)));
      await task;
      return await getDownloadURL(target);
    } finally { this._uploading.set(false); }
  }
  private check(file: File, types: string[], max: number, message: string): void {
    if (!types.includes(file.type) || file.size > max) throw new Error(message);
  }
  private safeName(name: string): string {
    const clean = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9.]+/g, '-');
    return `${Date.now()}-${clean}`;
  }
}
