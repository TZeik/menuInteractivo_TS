"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testMovies = testMovies;
exports.listarPeliculas = listarPeliculas;
exports.agregarPelicula = agregarPelicula;
exports.marcarPeliculaComoVista = marcarPeliculaComoVista;
exports.iniciarMenu = iniciarMenu;
// src/service/pelicula.service.ts
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const chalk_1 = __importDefault(require("chalk"));
const prompt = (0, prompt_sync_1.default)({ sigint: true });
const peliculas = [];
let nextId = 1;
function testMovies() {
    peliculas.push({
        id: nextId++,
        title: "Inception",
        director: "Christopher Nolan",
        watched: false,
    }, {
        id: nextId++,
        title: "El Padrino",
        director: "Francis Ford Coppola",
        watched: true,
    }, {
        id: nextId++,
        title: "Interestellar",
        director: "Cristopher Nolan",
        watched: false,
    });
}
function waitAndClear() {
    prompt('Presiona cualquier tecla para continuar...');
    console.clear();
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
function marcarPeliculaComoVista() {
    if (peliculas.length === 0) {
        console.log(chalk_1.default.red("No hay películas registradas."));
    }
    else {
        console.table(peliculas);
        const idInput = prompt("Ingrese el ID de la película a marcar como vista (1-" + peliculas.length + "): ");
        if (idInput) {
            const id = parseInt(idInput, 10);
            const pelicula = peliculas.find(p => p.id === id);
            if (pelicula) {
                pelicula.watched = !pelicula.watched;
                const mensaje = pelicula.watched
                    ? chalk_1.default.cyan(`La película "${pelicula.title}" ha sido marcada como vista.`)
                    : chalk_1.default.magenta(`La película "${pelicula.title}" ha sido marcada como no vista.`);
                console.log(mensaje);
            }
            else {
                console.log(chalk_1.default.red("No se encontró una película con ese ID."));
            }
        }
        else {
            console.log(chalk_1.default.red("El ID no puede estar vacío"));
        }
    }
    waitAndClear();
}
function mostrarMenu() {
    const menu = `Menú Interactivo:
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
                console.log(chalk_1.default.yellow("Saliendo del programa."));
                waitAndClear();
                break;
            default:
                console.log(chalk_1.default.red("Opción no válida, intente de nuevo."));
                waitAndClear();
        }
    } while (opcion !== '4');
}
