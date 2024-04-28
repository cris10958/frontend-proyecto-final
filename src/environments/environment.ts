// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
//const baseUrlRegistro = 'https://3001-abenitezm20-registrousu-lgd8q05juco.ws-us110.gitpod.io/registro-usuarios';
const baseUrlRegistro = 'http://127.0.0.1:3001/registro-usuarios';
const baseUrlGestorUsuarios = 'http://127.0.0.1:3002/gestor-usuarios';
export const environment = {
  production: false,
  baseUrlRegistro,
  baseUrlGestorUsuarios
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
