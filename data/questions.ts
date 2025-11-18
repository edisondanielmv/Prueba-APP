import { Question } from '../types';

export const questions: Question[] = [
  {
    id: 1,
    question: "¿Qué define a la solución de un sistema de ecuaciones lineales con dos variables?",
    options: [
      "Es el punto donde las rectas cruzan el eje X.",
      "Es el conjunto de valores de x y y que satisfacen ambas ecuaciones simultáneamente.",
      "Es cualquier par de números que sumen cero.",
      "Es el valor de la pendiente de la recta más inclinada."
    ],
    correctAnswer: 1,
    explanation: "La solución de un sistema es la intersección de las rectas, es decir, los valores que hacen verdaderas a ambas ecuaciones al mismo tiempo."
  },
  {
    id: 2,
    question: "En el método de eliminación, ¿cuál es el objetivo principal al sumar las ecuaciones?",
    options: [
      "Encontrar el valor de la constante.",
      "Eliminar una de las variables para resolver la otra.",
      "Graficar ambas líneas.",
      "Multiplicar ambas variables para obtener un producto."
    ],
    correctAnswer: 1,
    explanation: "El método de eliminación busca igualar los coeficientes de una variable con signos opuestos para que, al sumar, esa variable desaparezca."
  },
  {
    id: 3,
    question: "Si al resolver un sistema de ecuaciones las rectas son paralelas, ¿cuántas soluciones tiene el sistema?",
    options: [
      "Una solución única.",
      "Dos soluciones.",
      "Infinitas soluciones.",
      "No tiene solución."
    ],
    correctAnswer: 3,
    explanation: "Las líneas paralelas nunca se cortan, por lo tanto, no existe ningún punto que satisfaga ambas ecuaciones simultáneamente."
  },
  {
    id: 4,
    question: "Si las líneas de un sistema de ecuaciones coinciden (son la misma recta), ¿cuál es la solución?",
    options: [
      "No hay solución.",
      "Tiene un número infinito de soluciones.",
      "La solución es (0,0).",
      "Tiene exactamente dos soluciones."
    ],
    correctAnswer: 1,
    explanation: "Si las líneas coinciden, cada punto sobre la línea satisface ambas ecuaciones, resultando en infinitas soluciones."
  },
  {
    id: 5,
    question: "En el contexto de administración, ¿qué representa el 'Punto de Equilibrio'?",
    options: [
      "Cuando los costos superan a los ingresos.",
      "Cuando se venden todos los productos del inventario.",
      "El punto donde los Ingresos son iguales a los Costos Totales.",
      "El punto donde la utilidad es máxima."
    ],
    correctAnswer: 2,
    explanation: "El punto de equilibrio ocurre cuando la empresa no gana ni pierde dinero, es decir, Ingresos = Costos."
  },
  {
    id: 6,
    question: "Dada la función de costo C(x) = 15x + 2000 y Ingreso I(x) = 20x. ¿Cuál es la ecuación para encontrar el punto de equilibrio?",
    options: [
      "20x = 15x + 2000",
      "20x + 15x = 2000",
      "15x = 2000 - 20x",
      "x = 2000 / 20"
    ],
    correctAnswer: 0,
    explanation: "El equilibrio se encuentra igualando Ingresos y Costos: I(x) = C(x), por lo tanto 20x = 15x + 2000."
  },
  {
    id: 7,
    question: "¿Qué es el DOMINIO de una función?",
    options: [
      "El conjunto de todos los valores posibles de la variable dependiente (y).",
      "El conjunto de todos los valores posibles de la variable independiente (x).",
      "El punto más alto de la gráfica.",
      "La intersección con el eje Y."
    ],
    correctAnswer: 1,
    explanation: "El dominio son todos los valores de entrada (x) para los cuales la función está definida y produce un número real."
  },
  {
    id: 8,
    question: "Para la función f(x) = √(x + 2), ¿cuál es la restricción para encontrar el dominio?",
    options: [
      "x + 2 ≠ 0",
      "x + 2 < 0",
      "x + 2 ≥ 0",
      "x puede ser cualquier número real."
    ],
    correctAnswer: 2,
    explanation: "Dentro de una raíz cuadrada par, el radicando debe ser mayor o igual a cero para que el resultado sea un número real."
  },
  {
    id: 9,
    question: "¿Cuál es el dominio de la función f(x) = √(x + 2)?",
    options: [
      "x ≥ 2",
      "x ≥ -2",
      "x > -2",
      "Todos los reales excepto -2"
    ],
    correctAnswer: 1,
    explanation: "Resolviendo x + 2 ≥ 0, obtenemos x ≥ -2. En notación de intervalo: [-2, ∞)."
  },
  {
    id: 10,
    question: "¿Qué es el RANGO de una función?",
    options: [
      "Los valores de x que hacen cero al denominador.",
      "El conjunto de valores resultantes de y después de sustituir el dominio.",
      "El conjunto de números enteros positivos.",
      "La distancia entre dos puntos en la gráfica."
    ],
    correctAnswer: 1,
    explanation: "El rango es el conjunto de todas las salidas posibles (valores de y) que la función puede producir."
  },
  {
    id: 11,
    question: "Si f(x) = 2x² - 5x + 1, ¿cuánto es f(3)?",
    options: [
      "1",
      "4",
      "10",
      "-2"
    ],
    correctAnswer: 1,
    explanation: "Sustituyendo x=3: 2(3)² - 5(3) + 1 = 2(9) - 15 + 1 = 18 - 15 + 1 = 4."
  },
  {
    id: 12,
    question: "En una función racional, ¿qué condición debe cumplir el denominador para determinar el dominio?",
    options: [
      "El denominador debe ser positivo.",
      "El denominador no puede ser cero.",
      "El denominador debe ser igual al numerador.",
      "No hay restricciones para el denominador."
    ],
    correctAnswer: 1,
    explanation: "La división por cero no está definida, por lo tanto, cualquier valor de x que haga cero al denominador debe excluirse del dominio."
  },
  {
    id: 13,
    question: "¿Cuál es la forma estándar de una función cuadrática?",
    options: [
      "f(x) = mx + b",
      "f(x) = ax² + bx + c, (con a ≠ 0)",
      "f(x) = |x|",
      "f(x) = √x"
    ],
    correctAnswer: 1,
    explanation: "Una función cuadrática se representa como un polinomio de segundo grado: ax² + bx + c."
  },
  {
    id: 14,
    question: "Si en una función cuadrática f(x) = ax² + bx + c, el valor de 'a' es negativo (a < 0), ¿hacia dónde abre la parábola?",
    options: [
      "Hacia arriba.",
      "Hacia la derecha.",
      "Hacia abajo.",
      "Hacia la izquierda."
    ],
    correctAnswer: 2,
    explanation: "Si el coeficiente cuadrático 'a' es negativo, la parábola se abre hacia abajo y tiene un punto máximo."
  },
  {
    id: 15,
    question: "¿Cuál es la fórmula para encontrar la coordenada x del vértice de una parábola?",
    options: [
      "x = -b / 2a",
      "x = b² - 4ac",
      "x = -b ± √Δ",
      "x = c / a"
    ],
    correctAnswer: 0,
    explanation: "La coordenada x del vértice de una parábola dada por ax² + bx + c es x = -b / (2a)."
  },
  {
    id: 16,
    question: "Dada la función de utilidad U = -45p² + 1575p - 8750. ¿Qué tipo de gráfica representa?",
    options: [
      "Una línea recta creciente.",
      "Una parábola que abre hacia abajo.",
      "Un círculo.",
      "Una hipérbola."
    ],
    correctAnswer: 1,
    explanation: "Al ser una función cuadrática con el coeficiente cuadrático negativo (-45), es una parábola que abre hacia abajo."
  },
  {
    id: 17,
    question: "¿Qué ecuación representa un círculo con centro (h, k) y radio r?",
    options: [
      "y = mx + b",
      "(x - h)² + (y - k)² = r²",
      "y = ax² + bx + c",
      "x² - y² = r"
    ],
    correctAnswer: 1,
    explanation: "La ecuación estándar de un círculo es la suma de los cuadrados de las distancias al centro igual al radio al cuadrado."
  },
  {
    id: 18,
    question: "¿Cuál es la característica geométrica principal de la gráfica de la función valor absoluto f(x) = |x|?",
    options: [
      "Es una línea recta horizontal.",
      "Tiene forma de 'U'.",
      "Tiene forma de 'V'.",
      "Es una curva en forma de S."
    ],
    correctAnswer: 2,
    explanation: "La función valor absoluto consiste en dos rayos que parten del origen formando una 'V'."
  },
  {
    id: 19,
    question: "Si f(x) = 1/(x-2) y g(x) = √x, ¿cuál es el dominio de la composición (f ∘ g)(x)?",
    options: [
      "x ≥ 0",
      "x ≠ 2",
      "x ≥ 0 y x ≠ 4",
      "Todos los reales."
    ],
    correctAnswer: 2,
    explanation: "Para g(x)=√x, x debe ser ≥ 0. Para f(g(x)) = 1/(√x - 2), el denominador no puede ser 0, asi que √x ≠ 2, lo que implica x ≠ 4. Dominio: [0, 4) U (4, ∞)."
  },
  {
    id: 20,
    question: "Para encontrar la función inversa f⁻¹(x), ¿qué paso es fundamental respecto a las variables?",
    options: [
      "Elevar ambas variables al cuadrado.",
      "Intercambiar las variables x y y, y luego despejar y.",
      "Hacer y = 0.",
      "Multiplicar la función por -1."
    ],
    correctAnswer: 1,
    explanation: "Geométricamente, la inversa refleja la gráfica sobre y=x. Algebraicamente, esto se logra intercambiando x por y y resolviendo para la nueva y."
  }
];