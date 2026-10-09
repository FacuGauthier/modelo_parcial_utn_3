import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { NuevaReceta, Receta } from '../interfaces/receta';

@Service()
export class RecetaService {
    http = inject(HttpClient)
    url = "http://localhost:3000/api/recetas"

    obtenerTodos(usuarioId: number): Observable<Receta[]> {
        return this.http.get<Receta[]>(this.url, { params: { usuarioId } })
    }

    crearReceta(datos: NuevaReceta, usuarioId: number): Observable<Receta> {
        return this.http.post<Receta>(this.url, datos, { params: { usuarioId } })
    }

    obtenerPorId(id: number, usuarioId: number): Observable<Receta> {
        return this.http.get<Receta>(`${this.url}/${id}`, { params: { usuarioId } })
    }

    toggleFavorita(id: number, valor: boolean, usuarioId: number): Observable<Receta> {
        return this.http.patch<Receta>(`${this.url}/${id}`, { favorita: valor }, { params: { usuarioId } })
    }

    eliminarReceta(id: number, usuarioId: number): Observable<void> {
        return this.http.delete<void>(`${this.url}/${id}`, { params: { usuarioId } })
    }
}
