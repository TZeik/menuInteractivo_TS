"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const chalk_1 = __importDefault(require("chalk"));
const prompt = (0, prompt_sync_1.default)({ sigint: true });
const peliculas = [];
let nextId = 1;
function mostrarMenu() {
    const menu = `Menú Interactivo:
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
function listarPeliculas() {
    if (peliculas.length === 0) {
        console.log(chalk_1.default.red("No hay películas registradas."));
    }
    else {
        console.table(peliculas);
    }
    waitAndClear();
}
function agregarPelicula() {
    const title = prompt("Ingrese el título de la película: ");
    if (!title) {
        console.log(chalk_1.default.red("Debe introducir un nombre de película válido"));
        waitAndClear();
        return;
    }
    const director = prompt("Ingrese el director de la película: ");
    if (!director) {
        console.log(chalk_1.default.red("Debe introducir un nombre de director válido"));
        waitAndClear();
        return;
    }
    if (title && director) {
        const nuevaPelicula = {
            id: nextId++,
            title,
            director,
            watched: false,
        };
        peliculas.push(nuevaPelicula);
        console.log(chalk_1.default.green("Película agregada exitosamente."));
        waitAndClear();
    }
}
function marcarPeliculaComoVista() {
    const idInput = prompt("Ingrese el ID de la película a marcar como vista:");
    if (idInput) {
        const id = parseInt(idInput, 10);
        let pelicula;
        for (let i = 0; i < peliculas.length; i++) {
            if (peliculas[i].id === id) {
                pelicula = peliculas[i];
                break;
            }
        }
        if (pelicula) {
            pelicula.watched = true;
            console.log(chalk_1.default.green(`La película "${pelicula.title}" ha sido marcada como vista.`));
        }
        else {
            console.log(chalk_1.default.red("No se encontró una película con ese ID."));
        }
    }
    waitAndClear();
}
function waitAndClear() {
    const anyKey = prompt('');
    console.clear();
}
function iniciarMenu() {
    let opcion;
    do {
        opcion = mostrarMenu();
        if (opcion === null)
            break;
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
