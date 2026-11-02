// Prueba de vida: antes de marcar, la persona gira la cabeza al lado que se le pide (al azar, para que no sirva un video
// grabado). En una foto la nariz no se desplaza respecto de los ojos aunque se incline el papel: los puntos de un plano
// conservan sus proporciones. Funciones puras, sin camara ni face-api.

export const UMBRAL_DE_GIRO = 0.22; // desplazamiento de la nariz, en distancias entre ojos
export const UMBRAL_DE_FRENTE = 0.12;

const centro = (puntos) => ({
  x: puntos.reduce((suma, p) => suma + p.x, 0) / puntos.length,
  y: puntos.reduce((suma, p) => suma + p.y, 0) / puntos.length,
});

/** Giro horizontal del rostro en la imagen: 0 de frente, positivo si la nariz va a la derecha de la imagen. */
export function giroHorizontal(ojoIzquierdo, ojoDerecho, punta) {
  const a = centro(ojoIzquierdo);
  const b = centro(ojoDerecho);
  const entreOjos = Math.hypot(b.x - a.x, b.y - a.y);
  if (entreOjos === 0) return 0;
  return (punta.x - (a.x + b.x) / 2) / entreOjos;
}

export const estaDeFrente = (giro) => Math.abs(giro) <= UMBRAL_DE_FRENTE;

/** La camara mira de frente a la persona: su izquierda es la derecha de la imagen. */
export const cumpleReto = (reto, giro) => (reto === 'IZQUIERDA' ? giro >= UMBRAL_DE_GIRO : giro <= -UMBRAL_DE_GIRO);

export const retoAlAzar = (azar = Math.random()) => (azar < 0.5 ? 'IZQUIERDA' : 'DERECHA');
