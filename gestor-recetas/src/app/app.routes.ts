import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Registro } from './registro/registro';
import { ListaReceta } from './receta/lista-receta/lista-receta';
import { CrearReceta } from './receta/crear-receta/crear-receta';
import { DetalleReceta } from './receta/detalle-receta/detalle-receta';

export const routes: Routes = [
    {
        path: "", redirectTo: "login", pathMatch: "full"
    },
    {
        path: "login", component: Login
    },
    {
        path: "registro", component: Registro
    },
    {
        path: "recetas", component: ListaReceta
    },
    {
        path: "recetas/crear", component: CrearReceta
    },
    {
        path: "recetas/:id", component: DetalleReceta
    },
    {
        path: "**", redirectTo: "login"
    }
];
