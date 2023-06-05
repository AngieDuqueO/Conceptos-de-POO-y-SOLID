//Identifiquen herencia, polimorfismo,clases(propiedades y metodos)
//Identifiquen S O L I D 
// Aplicar principios que no estén

// Obtenemos los elementos del DOM
const formulario = document.querySelector("#formulario"); // Obtener el formulario
const cardsEstudiantes = document.querySelector("#cardsEstudiantes"); // Obtener el contenedor de tarjetas de estudiantes
const cardsProfesores = document.querySelector("#cardsProfesores"); // Obtener el contenedor de tarjetas de profesores
const templateEstudiante = document.querySelector("#templateEstudiante").content; // Obtener la plantilla de tarjeta de estudiante
const templateProfesor = document.querySelector("#templateProfesor").content; // Obtener la plantilla de tarjeta de profesor
const alert = document.querySelector(".alert"); // Obtener el elemento de alerta

// Arreglos para almacenar estudiantes y profesores
const estudiantes = []; // Arreglo para almacenar objetos de tipo Estudiante
const profesores = []; // Arreglo para almacenar objetos de tipo Profesor

// Evento de click en el documento
document.addEventListener("click", (e) => {
    // Preguntamos por el atributo 'data-uid'
    if (e.target.dataset.uid) {
        if (e.target.matches(".btn-success")) {
            // Si el botón presionado es de éxito (aprobación)
            estudiantes.map((item) => {
                // Recorremos el arreglo de estudiantes
                if (item.uid === e.target.dataset.uid) {
                    item.setEstado = true; // Establecemos el estado del estudiante como aprobado
                }
                return item;
            });
        }
        if (e.target.matches(".btn-danger")) {
            // Si el botón presionado es de peligro (reprobación)
            estudiantes.map((item) => {
                if (item.uid === e.target.dataset.uid) {
                    item.setEstado = false; // Establecemos el estado del estudiante como reprobado
                }
                console.log(item);
                return item;
            });
        }
        Persona.pintarPersonaUI(estudiantes, "Estudiante"); // Volvemos a pintar las tarjetas de estudiantes en la interfaz de usuario
    }
});

// Clase base Persona que utiliza herencia
class Persona {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
        this.uid = `${Date.now()}`; // Generamos un identificador único para la persona basado en la fecha y hora actual
    }

    // Método estático para pintar elementos en la interfaz de usuario
    static pintarPersonaUI(personas, tipo) {
        if (tipo === "Estudiante") {
            cardsEstudiantes.textContent = ""; // Limpiamos el contenedor de tarjetas de estudiantes
            const fragment = document.createDocumentFragment(); // Creamos un fragmento para almacenar las tarjetas

            personas.forEach((item) => {
                fragment.appendChild(item.agregarNuevoEstudiante()); // Agregamos las tarjetas de estudiantes al fragmento
            });

            cardsEstudiantes.appendChild(fragment); // Agregamos el fragmento al contenedor de tarjetas de estudiantes
        }

        if (tipo === "Profesor") {
            cardsProfesores.textContent = ""; // Limpiamos el contenedor de tarjetas de profesores
            const fragment = document.createDocumentFragment(); // Creamos un fragmento para almacenar las tarjetas

            personas.forEach((item) => {
                fragment.appendChild(item.agregarNuevoProfesor()); // Agregamos las tarjetas de profesores al fragmento
            });

            cardsProfesores.appendChild(fragment); // Agregamos el fragmento al contenedor de tarjetas de profesores
        }
    }
}

// Clase Estudiante que hereda de Persona
class Estudiante extends Persona {
    #estado = false; // Propiedad privada para almacenar el estado del estudiante
    #estudiante = "Estudiante"; // Propiedad privada para almacenar la etiqueta de estudiante

    set setEstado(estado) {
        this.#estado = estado; // Setter para modificar el estado del estudiante
    }

    get getEstudiante() {
        return this.#estudiante; // Getter para obtener la etiqueta de estudiante
    }

    // Método para agregar un nuevo estudiante en la interfaz de usuario
    agregarNuevoEstudiante() {
        const clone = templateEstudiante.cloneNode(true); // Clonamos la plantilla de tarjeta de estudiante

        clone.querySelector("h5 .text-primary").textContent = this.nombre; // Asignamos el nombre del estudiante a la tarjeta
        clone.querySelector("h6").textContent = this.getEstudiante; // Asignamos la etiqueta de estudiante a la tarjeta
        clone.querySelector(".lead").textContent = this.edad; // Asignamos la edad del estudiante a la tarjeta

        if (this.#estado) {
            clone.querySelector(".badge").className = "badge bg-success"; // Cambiamos la clase CSS para mostrar el estado aprobado
            clone.querySelector(".btn-success").disabled = true; // Desactivamos el botón de aprobación
            clone.querySelector(".btn-danger").disabled = false; // Habilitamos el botón de reprobación
        } else {
            clone.querySelector(".badge").className = "badge bg-danger"; // Cambiamos la clase CSS para mostrar el estado reprobado
            clone.querySelector(".btn-danger").disabled = true; // Desactivamos el botón de reprobación
            clone.querySelector(".btn-success").disabled = false; // Habilitamos el botón de aprobación
        }
        clone.querySelector(".badge").textContent = this.#estado ? "Aprobado" : "Reprobado"; // Asignamos el texto de estado a la tarjeta

        clone.querySelector(".btn-success").dataset.uid = this.uid; // Asignamos el identificador único al botón de aprobación
        clone.querySelector(".btn-danger").dataset.uid = this.uid; // Asignamos el identificador único al botón de reprobación

        return clone; // Devolvemos la tarjeta de estudiante clonada y modificada
    }
}

// Clase Profesor que hereda de Persona
class Profesor extends Persona {
    #profesor = "Profesor"; // Propiedad privada para almacenar la etiqueta de profesor

    // Método para agregar un nuevo profesor en la interfaz de usuario
    agregarNuevoProfesor() {
        const clone = templateProfesor.cloneNode(true); // Clonamos la plantilla de tarjeta de profesor
        clone.querySelector("h5").textContent = this.nombre; // Asignamos el nombre del profesor a la tarjeta
        clone.querySelector("h6").textContent = this.#profesor; // Asignamos la etiqueta de profesor a la tarjeta
        clone.querySelector(".lead").textContent = this.edad; // Asignamos la edad del profesor a la tarjeta
        return clone; // Devolvemos la tarjeta de profesor clonada y modificada
    }
}

// Evento de submit en el formulario
formulario.addEventListener("submit", (e) => {
    e.preventDefault(); // Evitamos que el formulario se envíe

    alert.classList.add("d-none"); // Ocultamos el elemento de alerta

    const datos = new FormData(formulario); // Obtenemos los datos del formulario

    const [nombre, edad, opcion] = [...datos.values()]; // Extraemos los valores de los campos del formulario

    // Validación de campos vacíos
    if (!nombre.trim() || !edad.trim() || !opcion.trim()) {
        console.log("Elemento vacío");
        alert.classList.remove("d-none"); // Mostramos el elemento de alerta
        return;
    }

    if (opcion === "Estudiante") {
        const estudiante = new Estudiante(nombre, edad); // Creamos un objeto de tipo Estudiante
        estudiantes.push(estudiante); // Agregamos el estudiante al arreglo de estudiantes
        Persona.pintarPersonaUI(estudiantes, opcion); // Pintamos las tarjetas de estudiantes en la interfaz de usuario
    }

    if (opcion === "Profesor") {
        const profesor = new Profesor(nombre, edad); // Creamos un objeto de tipo Profesor
        profesores.push(profesor); // Agregamos el profesor al arreglo de profesores
        Persona.pintarPersonaUI(profesores, opcion); // Pintamos las tarjetas de profesores en la interfaz de usuario
    }
});


/****
 
Herencia: Se utiliza herencia en las clases Estudiante y Profesor, que heredan de la clase base Persona. 
La herencia permite que las clases derivadas (Estudiante y Profesor) hereden propiedades 
y métodos de la clase base (Persona). Esto evita la duplicación de código y
 establece una relación de especialización entre las clases.

Polimorfismo: El polimorfismo se evidencia en el método estático pintarPersonaUI de la clase Persona. 
Este método puede recibir tanto un array de objetos Estudiante como un array de objetos Profesor, 
gracias a la herencia y al polimorfismo en JavaScript. 
El polimorfismo permite tratar a los objetos de diferentes clases de manera uniforme, 
utilizando una interfaz común.

Clases (propiedades y métodos): El código utiliza clases para representar entidades como Persona, 
Estudiante y Profesor. Estas clases encapsulan propiedades (como nombre, edad, uid, estado, etc.) 
y métodos (como agregarNuevoEstudiante, agregarNuevoProfesor, pintarPersonaUI, etc.).
 Las clases ayudan a organizar y estructurar el código de manera más intuitiva y modular.

SOLID (Principios de Diseño Orientado a Objetos):

Principio de Responsabilidad Única (SRP): En el código , las clases tienen una única responsabilidad.
 Por ejemplo, la clase Estudiante se encarga de representar y 
 manejar la información relacionada con un estudiante, 
 mientras que la clase Profesor se encarga de hacer lo mismo con los profesores.
  Esto cumple con el principio SRP al tener una única razón para cambiar.

Principio de Abierto/Cerrado (OCP): El código se puede extender para agregar nuevos tipos de personas 
(por ejemplo, agregar una clase Empleado que herede de Persona) sin modificar las clases existentes. 
Esto cumple con el principio OCP al estar abierto a la extensión pero cerrado a la modificación.

Principio de Sustitución de Liskov (LSP): Las clases Estudiante y Profesor son subtipos de Persona y
 se pueden usar en lugar de objetos de tipo Persona sin afectar el comportamiento esperado. 
 Esto cumple con el principio LSP al respetar la sustitución de objetos por objetos de sus subtipos.

Principio de Segregación de Interfaces (ISP): No se aplica directamente en el código , 
ya que no hay interfaces explícitas. Sin embargo, las clases Estudiante y 
Profesor tienen sus propios métodos específicos que cumplen con el principio ISP al 
tener interfaces de cliente específicas en lugar de interfaces genéricas.

Principio de Inversión de Dependencia (DIP): No se aplica directamente en el código , 
ya que no hay una inyección de dependencias explícita. 
Sin embargo, el código utiliza herencia para establecer relaciones de dependencia entre las clases, 
lo que puede considerarse una forma de inversión de dependencia al depender de abstracciones (clase base) 
en lugar de implementaciones concretas (clases derivadas).
** */
