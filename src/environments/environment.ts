// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const URL_INGRES = 'http://k8s-ekssport-sportapp-a5d22e537b-1623025658.us-east-1.elb.amazonaws.com'
const baseUrlRegistro = URL_INGRES+'/registro-usuarios';
const baseUrlGestorUsuarios = URL_INGRES+'/gestor-usuarios';
const baseUrlGestorSesiones = URL_INGRES+'/gestor-sesion-deportiva';
const baseUrlGestionProductosServicios = URL_INGRES+'/gestor-productos-servicios';
// const baseUrlRegistro = 'http://127.0.0.1:3001/registro-usuarios';
// const baseUrlGestorUsuarios = 'http://127.0.0.1:3001/gestor-usuarios';
// const baseUrlGestorSesiones = 'http://127.0.0.1:3005/gestor-sesion-deportiva';
// const baseUrlGestionProductosServicios = 'http://127.0.0.1:3006/gestor-productos-servicios';

export const environment = {
  production: false,
  baseUrlRegistro,
  baseUrlGestorUsuarios,
  baseUrlGestorSesiones,
  baseUrlGestionProductosServicios
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
