import promptSync from 'prompt-sync';
import chalk from 'chalk';
import { Pelicula } from '../model/model';

const prompt = promptSync({ sigint: true });
const peliculas: Pelicula[] = [];
let nextId = 1;

export function testMovies(): void {
  peliculas.push(
    {
      id: nextId++,
      title: "Inception",
      director: "Christopher Nolan",
      watched: false,
    },
    {
      id: nextId++,
      title: "El Padrino",
      director: "Francis Ford Coppola",
      watched: true,
    },
    {
      id: nextId++,
      title: "Interestellar",
      director: "Cristopher Nolan",
      watched: false,
    }
  );
}

function waitAndClear(): void {
  prompt('Presiona cualquier tecla para continuar...');
  console.clear();
}

export function listarPeliculas(): void {
  if (peliculas.length === 0) {
    console.log(chalk.red("No hay películas registradas."));
  } else {
    console.table(peliculas);
  }
  waitAndClear();
}

export function agregarPelicula(): void {
  const title = prompt("Ingrese el título de la película: ");
  if (!title) {
    console.log(chalk.red("Debe introducir un nombre de película válido"));
    waitAndClear();
    return;
  }
  const director = prompt("Ingrese el director de la película: ");
  if (!director) {
    console.log(chalk.red("Debe introducir un nombre de director válido"));
    waitAndClear();
    return;
  }
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

export function marcarPeliculaComoVista(): void {
  if (peliculas.length === 0) {
    console.log(chalk.red("No hay películas registradas."));
  } else {
    console.table(peliculas);
    const idInput = prompt("Ingrese el ID de la película a marcar como vista (1-" + peliculas.length + "): ");
    if (idInput) {
      const id = parseInt(idInput, 10);
      const pelicula = peliculas.find(p => p.id === id);
      if (pelicula) {
        pelicula.watched = !pelicula.watched;
        const mensaje = pelicula.watched
          ? chalk.cyan(`La película "${pelicula.title}" ha sido marcada como vista.`)
          : chalk.magenta(`La película "${pelicula.title}" ha sido marcada como no vista.`);
        console.log(mensaje);
      } else {
        console.log(chalk.red("No se encontró una película con ese ID."));
      }
    } else {
      console.log(chalk.red("El ID no puede estar vacío"));
    }
  }
  waitAndClear();
}

function mostrarMenu(): string | null {
  const menu = 
`Menú Interactivo:
  1. Listar Películas
  2. Agregar Película
  3. Marcar Película como Vista/No Vista
  4. Salir
  Elige una opción:`;
  console.log(menu);
  const respuesta = prompt('');
  console.clear();
  return respuesta;
}

export function iniciarMenu(): void {
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
        console.log(chalk.yellow("Saliendo del programa."));
        waitAndClear();
        break;
      default:
        console.log(chalk.red("Opción no válida, intente de nuevo."));
        waitAndClear();
    }
  } while (opcion !== '4');
}
