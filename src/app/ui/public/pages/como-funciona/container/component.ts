import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'como-funciona',
    standalone: true,
    templateUrl: './component.html',
    imports: [CommonModule],
})
export class ComoFuncionaPublicComponent {
    readonly pasos = [
        {
            numero: 1,
            titulo: 'Registrarse',
            descripcion: 'Crea tu cuenta gratuita como estudiante o egresado universitario.'
        },
        {
            numero: 2,
            titulo: 'Completar perfil',
            descripcion: 'Sube tu Curriculum Vitae y define tus áreas de interés.'
        },
        {
            numero: 3,
            titulo: 'Buscar oportunidades',
            descripcion: 'Filtra por categoría, modalidad o ciudad.'
        },
        {
            numero: 4,
            titulo: 'Postularse',
            descripcion: 'Envía tu postulación mediante el formulario interactivo.'
        },
        {
            numero: 5,
            titulo: 'Dar seguimiento',
            descripcion: 'Revisa el avance: En revisión → Entrevista → Seleccionada/Rechazada.'
        }
    ];
}
