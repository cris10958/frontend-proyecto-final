//const baseUrlRegistro = 'http://127.0.0.1:3001/registro-usuarios';

const URL_INGRES = 'http://k8s-ekssport-sportapp-a5d22e537b-1703746054.us-east-1.elb.amazonaws.com'
const baseUrlRegistro = URL_INGRES+'/registro-usuarios';
const baseUrlGestorUsuarios = URL_INGRES+'/gestor-usuarios';
const baseUrlGestorSesiones = URL_INGRES+'/gestor-sesion-deportiva';
const baseUrlGestionProductosServicios = URL_INGRES+'/gestor-productos-servicios';


export const environment = {
  production: true,
  baseUrlRegistro,
  baseUrlGestorUsuarios,
  baseUrlGestorSesiones,
  baseUrlGestionProductosServicios
};
