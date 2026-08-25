# Conecta Oportunidades

Aplicación web para la gestión y búsqueda de oportunidades dirigidas a estudiantes y recién egresados.

El sistema centraliza empleos junior, pasantías, becas, voluntariados y otras oportunidades, permitiendo además realizar postulaciones y hacer seguimiento de su estado.

## Descripción

Los estudiantes y recién egresados suelen encontrar oportunidades profesionales distribuidas en diferentes medios y plataformas. Esto dificulta encontrar opciones relacionadas con su formación, modalidad, ubicación o intereses.

**Conecta Oportunidades** propone una plataforma centralizada en la que:

- Los postulantes pueden explorar oportunidades y postularse.
- Las organizaciones pueden publicar oportunidades y gestionar postulantes.
- Los administradores pueden revisar oportunidades y gestionar la plataforma.

## Roles

### Postulante

- Registro e inicio de sesión.
- Inicio de sesión con Google.
- Consulta de oportunidades.
- Búsqueda y filtros.
- Consulta del detalle de oportunidades.
- Postulación a oportunidades.
- Consulta de sus postulaciones.
- Seguimiento del estado de cada postulación.
- Gestión de información básica del perfil.

### Organización

- Registro e inicio de sesión.
- Gestión del perfil de organización.
- Publicación de oportunidades.
- Consulta y gestión de sus oportunidades.
- Consulta de postulantes.
- Actualización del estado de las postulaciones.

### Administrador

- Acceso a panel administrativo.
- Gestión básica de usuarios.
- Revisión de oportunidades.
- Aprobación y rechazo de oportunidades.
- Cierre y publicación de oportunidades.
- Consulta general del estado de la plataforma.

## Estados principales

### Oportunidades

```text
Pendiente → Publicada → Cerrada
               ↓
           Rechazada
```

### Postulaciones

```text
Enviada → En revisión → Entrevista → Seleccionada
                              ↓
                          Rechazada
```

## Tecnologías

### Frontend

- Angular
- Standalone Components
- Angular Material
- Tailwind CSS
- Angular Signals
- Angular Router

### Firebase

- Firebase Authentication
- Google Authentication
- Cloud Firestore
- Firebase Hosting

La integración con Firebase se realiza mediante el **Firebase Web SDK**, sin utilizar `@angular/fire`.

### Otras características

- SSR para contenido público cuando corresponde.
- Prerenderizado de rutas públicas.
- Renderizado Client para zonas privadas.
- PWA.
- Guards por autenticación y rol.
- Reglas de seguridad de Firestore.

## Arquitectura

La aplicación utiliza una arquitectura web híbrida.

```text
                    Usuario
                       │
                     HTTPS
                       │
                Aplicación Angular
                       │
          ┌────────────┴────────────┐
          │                         │
   Pantallas públicas        Pantallas privadas
          │                         │
   SSR / Prerender                 SPA
          │                         │
          └────────────┬────────────┘
                       │
                    Angular
                       │
          ┌────────────┼────────────┐
          │            │            │
       Signals      Services      Routing
                       │
                    Firebase
          ┌────────────┼────────────┐
          │            │            │
        Auth       Firestore      Hosting
```

## Estructura principal

```text
src/app/
├── domain/
├── services/
└── ui/
    ├── public/
    ├── auth/
    ├── postulante/
    ├── organizacion/
    └── admin/
```

La aplicación está organizada principalmente **por funcionalidad**, facilitando la separación de responsabilidades entre las diferentes áreas del sistema.

## Requerimientos principales implementados

- RF-01 Inicio de sesión.
- RF-02 Gestión del perfil del postulante.
- RF-03 Gestión del perfil de organización.
- RF-04 Consulta de oportunidades.
- RF-05 Búsqueda y filtrado.
- RF-06 Consulta del detalle de una oportunidad.
- RF-07 Publicación de oportunidades.
- RF-08 Aprobación de oportunidades.
- RF-09 Postulación a oportunidades.
- RF-10 Consulta del estado de postulación.
- RF-11 Consulta de postulantes.
- RF-12 Actualización del estado de postulación.

## Instalación

### Requisitos

- Node.js
- npm
- Angular CLI

### Clonar el proyecto

```bash
git clone URL_DEL_REPOSITORIO
cd AppWebOportunidad
```

### Instalar dependencias

```bash
npm install
```

### Ejecutar en desarrollo

```bash
ng serve
```

Abrir:

```text
http://localhost:4200
```

## Compilar

```bash
ng build
```

## Firebase

El proyecto utiliza Firebase para:

- autenticación;
- autenticación mediante Google;
- persistencia de usuarios;
- organizaciones;
- oportunidades;
- postulaciones;
- hosting.

Las colecciones principales de Firestore son:

```text
usuarios
organizaciones
oportunidades
postulaciones
```

## Limitación de almacenamiento de CV

La arquitectura contempla el uso de Firebase Storage para almacenar archivos de CV.

Sin embargo, la carga física de archivos mediante Firebase Storage no se habilitó en la versión entregada debido a las restricciones del plan de Firebase disponible para el proyecto.

La estructura del dominio conserva la referencia `cvUrl` para permitir incorporar esta funcionalidad posteriormente sin modificar el modelo principal.

## Seguridad

Firestore utiliza reglas de seguridad para controlar el acceso según autenticación, propiedad de los datos y rol.

Los roles utilizados por el sistema son:

```text
Postulante
Organización
Administrador
```

La contraseña de los usuarios **no se almacena en Firestore**. Su gestión corresponde a Firebase Authentication.

## Limitaciones del proyecto

No se incluye:

- chat entre postulantes y organizaciones;
- videollamadas;
- gestión interna de entrevistas;
- pagos;
- notificaciones por correo;
- recomendaciones mediante inteligencia artificial;
- selección automática de candidatos;
- generación automática de CV;
- aplicación móvil nativa.

## Autor

**Aylin Nicol Nina Hannover**

Proyecto Final — Full Stack Development

## Herramientas y recursos utilizados

- Angular
- Angular Material
- Tailwind CSS
- Firebase
- Git
- GitHub
- Material Icons

Durante el desarrollo se utilizaron herramientas de asistencia basadas en inteligencia artificial como apoyo para revisión de código, depuración y documentación. Las decisiones de arquitectura, integración y adaptación al proyecto fueron realizadas y verificadas durante el desarrollo.
