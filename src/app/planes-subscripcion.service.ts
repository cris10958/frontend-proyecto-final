import { Injectable } from '@angular/core';

export interface PlanSubscripcion {
  id_plan_subscripcion: string;
  nombre:               string;
  beneficios:           BeneficioPlanSubscripcion[];
}

export interface BeneficioPlanSubscripcion {
  id_detalle_subscripcion: string;
  beneficios:              string;
}

@Injectable({
  providedIn: 'root'
})
export class PlanesSubscripcionService {
  planSubscripcion: PlanSubscripcion[] = [
    { "id_plan_subscripcion": "1",
      "nombre":"Gratis",
      "beneficios": [{
        "id_detalle_subscripcion": "1",
        "beneficios": "Plan de entrenamiento básico basado en las características fisiológicas, demográficas e historial deportivo"
      },
      {
        "id_detalle_subscripcion": "2",
        "beneficios": "Rutas o eventos habilitados"
      },
      {
        "id_detalle_subscripcion": "3",
        "beneficios": "Sugerencia de planes de entrenamiento dentro y fuera de casa"
      },
      {
        "id_detalle_subscripcion": "4",
        "beneficios": "Sugerencias de servicios de acompañamiento para el deporte que practica"
      },
      {
        "id_detalle_subscripcion": "5",
        "beneficios": "Sugerencia de rutinas alimenticias"
      },
      {
        "id_detalle_subscripcion": "6",
        "beneficios": "Integración con aplicaciones de registros deportivos, por ejemplo strava o trainingpeaks que habilita el envió de información registrada en la sesiones deportivas"
      },
      {
        "id_detalle_subscripcion": "7",
        "beneficios": "Tablero de control de resultados obtenido en eventos realizados, en donde se visualizara el cálculo de FTP y VO2max"
      },
      {
        "id_detalle_subscripcion": "8",
        "beneficios": "Calendario de eventos de entrenamiento o salidas programadas"
      },
      {
        "id_detalle_subscripcion": "9",
        "beneficios": "Acceso a la aplicación móvil para que puedas realizar tus sesiones en cualquier lugar"
      }
      ]          
    },
    { "id_plan_subscripcion": "2",
      "nombre":"Intermedio",
      "beneficios": [{
        "id_detalle_subscripcion": "1",
        "beneficios": "Plan de entrenamiento básico basado en las características fisiológicas, demográficas e historial deportivo"
      },
      {
        "id_detalle_subscripcion": "2",
        "beneficios": "Rutas o eventos habilitados"
      },
      {
        "id_detalle_subscripcion": "3",
        "beneficios": "Sugerencia de planes de entrenamiento dentro y fuera de casa"
      },
      {
        "id_detalle_subscripcion": "4",
        "beneficios": "Sugerencias de servicios de acompañamiento para el deporte que practica"
      },
      {
        "id_detalle_subscripcion": "5",
        "beneficios": "Sugerencia de rutinas alimenticias"
      },
      {
        "id_detalle_subscripcion": "6",
        "beneficios": "Integración con aplicaciones de registros deportivos, por ejemplo strava o trainingpeaks que habilita el envió de información registrada en la sesiones deportivas"
      },
      {
        "id_detalle_subscripcion": "7",
        "beneficios": "Tablero de control de resultados obtenido en eventos realizados, en donde se visualizara el cálculo de FTP y VO2max"
      },
      {
        "id_detalle_subscripcion": "8",
        "beneficios": "Calendario de eventos de entrenamiento o salidas programadas"
      },
      {
        "id_detalle_subscripcion": "9",
        "beneficios": "Acceso a la aplicación móvil para que puedas realizar tus sesiones en cualquier lugar"
      },
      {
        "id_detalle_subscripcion": "10",
        "beneficios": "Seguimiento en tiempo real durante la sesión deportiva o evento"
      },
      {
        "id_detalle_subscripcion": "11",
        "beneficios": "Conexión con dispositivos de medición a la aplicación móvil"
      },
      {
        "id_detalle_subscripcion": "12",
        "beneficios": "Alertas de seguridad medica al detectar alguna situación durante la sesión que atente con la vida del deportista"
      },
      {
        "id_detalle_subscripcion": "13",
        "beneficios": "Ajuste de los objetivos de la sesión según el desempeño del deportista"
      },
      {
        "id_detalle_subscripcion": "14",
        "beneficios": "Recomendaciones de consumo de bebida o alimento según la energía gastada para prevenir situaciones criticas"
      },
      {
        "id_detalle_subscripcion": "15",
        "beneficios": "Notificación de situaciones de riesgo"
      }
      ]          
    }
    ,
    { "id_plan_subscripcion": "3",
      "nombre":"Premium",
      "beneficios": [{
        "id_detalle_subscripcion": "1",
        "beneficios": "Plan de entrenamiento básico basado en las características fisiológicas, demográficas e historial deportivo"
      },
      {
        "id_detalle_subscripcion": "2",
        "beneficios": "Rutas o eventos habilitados"
      },
      {
        "id_detalle_subscripcion": "3",
        "beneficios": "Sugerencia de planes de entrenamiento dentro y fuera de casa"
      },
      {
        "id_detalle_subscripcion": "4",
        "beneficios": "Sugerencias de servicios de acompañamiento para el deporte que practica"
      },
      {
        "id_detalle_subscripcion": "5",
        "beneficios": "Sugerencia de rutinas alimenticias"
      },
      {
        "id_detalle_subscripcion": "6",
        "beneficios": "Integración con aplicaciones de registros deportivos, por ejemplo strava o trainingpeaks que habilita el envió de información registrada en la sesiones deportivas"
      },
      {
        "id_detalle_subscripcion": "7",
        "beneficios": "Tablero de control de resultados obtenido en eventos realizados, en donde se visualizara el cálculo de FTP y VO2max"
      },
      {
        "id_detalle_subscripcion": "8",
        "beneficios": "Calendario de eventos de entrenamiento o salidas programadas"
      },
      {
        "id_detalle_subscripcion": "9",
        "beneficios": "Acceso a la aplicación móvil para que puedas realizar tus sesiones en cualquier lugar"
      },
      {
        "id_detalle_subscripcion": "10",
        "beneficios": "Seguimiento en tiempo real durante la sesión deportiva o evento"
      },
      {
        "id_detalle_subscripcion": "11",
        "beneficios": "Conexión con dispositivos de medición a la aplicación móvil"
      },
      {
        "id_detalle_subscripcion": "12",
        "beneficios": "Alertas de seguridad medica al detectar alguna situación durante la sesión que atente con la vida del deportista"
      },
      {
        "id_detalle_subscripcion": "13",
        "beneficios": "Ajuste de los objetivos de la sesión según el desempeño del deportista"
      },
      {
        "id_detalle_subscripcion": "14",
        "beneficios": "Recomendaciones de consumo de bebida o alimento según la energía gastada para prevenir situaciones criticas"
      },
      {
        "id_detalle_subscripcion": "15",
        "beneficios": "Notificación de situaciones de riesgo"
      },
      {
        "id_detalle_subscripcion": "16",
        "beneficios": "Servicio de entrenador / deportologo personalizado"
      },
      {
        "id_detalle_subscripcion": "17",
        "beneficios": "Cuidado despuede de realizar una sesión deportiva"
      },
      {
        "id_detalle_subscripcion": "18",
        "beneficios": "Programación de sesiones virtuales con un entrenado "
      },
      {
        "id_detalle_subscripcion": "19",
        "beneficios": "Registro de histórica clínica y deportiva del usuario para un acompañamiento personalizado"
      },
      {
        "id_detalle_subscripcion": "20",
        "beneficios": "Retroalimentación profesional sobre planes de entrenamiento "
      },
      {
        "id_detalle_subscripcion": "21",
        "beneficios": "Servicio de generación de planes de recuperación ante alguna lesión. Este servicio incluye rutinas como masajes y dispositivos especializados en recuperación de lesiones deportivas y pueden ser prestados en casa o en centros especializados. Tienen un valor adicional y pueden ser agendados a través de la aplicación con centros avalados por SportApp."
      }
      ]          
    },
]

  constructor() { }
}
