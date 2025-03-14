import promptSync from 'prompt-sync';
import chalk from 'chalk';

interface Pelicula {
    id: number;
    title: string;
    director: string;
    watched: boolean;
}

const prompt = promptSync({ sigint: true });
const peliculas: Pelicula[] = [];
  let nextId = 1;
  
function mostrarMenu(): string | null {
    const menu = 
    `Menú Interactivo:
  1. Listar Películas
  2. Agregar Película
  3. Marcar Película como Vista
  4. Salir
  Elige una opción:`;
    console.log(menu);
    const respuesta = prompt('');
    console.clear();
    return respuesta;
}
  
function listarPeliculas(): void {
    if (peliculas.length === 0) {
      console.log(chalk.red("No hay películas registradas."));
    } else {
      console.table(peliculas);
    }
    waitAndClear();
}
  
function agregarPelicula(): void {
    const title = prompt("Ingrese el título de la película: ");
    if(!title) {console.log(chalk.red("Debe introducir un nombre de película válido")); waitAndClear(); return;}
    const director = prompt("Ingrese el director de la película: ");
    if(!director) {console.log(chalk.red("Debe introducir un nombre de director válido")); waitAndClear(); return;}
    if (title && director) { 
      const nuevaPelicula: Pelicula = {
        id: nextId++,
        title,
        director,
        watched: false,
      };
      peliculas.push(nuevaPelicula);
      console.log(chalk.green("Película agregada exitosamente."));
      waitAndClear();
    }
}
  
function marcarPeliculaComoVista(): void {
    const idInput = prompt("Ingrese el ID de la película a marcar como vista: ");
    if (idInput) {
      const id = parseInt(idInput, 10);
      let pelicula: Pelicula | undefined;
      for (let i = 0; i < peliculas.length; i++) {
        if (peliculas[i].id === id) {
          pelicula = peliculas[i];
          break;
        }
      }
      if (pelicula) {
        pelicula.watched = true;
        console.log(chalk.green(`La película "${pelicula.title}" ha sido marcada como vista.`));
      } else {
        console.log(chalk.red("No se encontró una película con ese ID."));
      }
    }
    waitAndClear();
  }
  

  function waitAndClear(): void{
    const anyKey = prompt('')
    console.clear();
  }

  function iniciarMenu(): void {
    let opcion: string | null;
    do {
      opcion = mostrarMenu();
      if (opcion === null) break;
      switch (opcion.trim()) {
        case '1':
          listarPeliculas();
          break;
        case '2':
          agregarPelicula();
          break;
        case '3':
          marcarPeliculaComoVista();
          break;
        case '4':
          console.log("Saliendo del programa.");
          break;
        default:
          console.log("Opción no válida, intente de nuevo.");
      }
    } while (opcion !== '4');
  }
  
  iniciarMenu();
  