//const baseUrlRegistro = 'http://127.0.0.1:3001/registro-usuarios';
const baseUrlRegistro = 'http://k8s-ekssport-sportapp-a5d22e537b-1623025658.us-east-1.elb.amazonaws.com/registro-usuarios';
const baseUrlGestorUsuarios = 'http://k8s-ekssport-sportapp-a5d22e537b-1623025658.us-east-1.elb.amazonaws.com/gestor-usuarios';
const baseUrlGestorSesiones = 'http://k8s-ekssport-sportapp-a5d22e537b-1623025658.us-east-1.elb.amazonaws.com/gestor-sesion-deportiva';
const baseUrlGestionProductosServicios = 'http://k8s-ekssport-sportapp-a5d22e537b-1623025658.us-east-1.elb.amazonaws.com/gestor-productos-servicios';

export const environment = {
  production: true,
  baseUrlRegistro,
  baseUrlGestorUsuarios,
  baseUrlGestorSesiones,
  baseUrlGestionProductosServicios
};
