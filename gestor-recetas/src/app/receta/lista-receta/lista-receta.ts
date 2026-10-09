import { Component, computed, inject, signal } from '@angular/core';
import { RecetaService } from '../receta-service';
import { SesionService } from '../../sesion/sesion-service';
import { Router } from '@angular/router';
import { Receta } from '../../interfaces/receta';
import { HttpErrorResponse } from '@angular/common/http';
import { Error } from '../../error/error';
import { TarjetaReceta } from '../tarjeta-receta/tarjeta-receta';

type Filtros = "facil" | "media" | "dificil" | null

@Component({
  imports: [Error, TarjetaReceta],
  selector: 'app-lista-receta',
  styleUrl: './lista-receta.css',
  templateUrl: './lista-receta.html',
})
export class ListaReceta {
  recetaService = inject(RecetaService)
  sesion = inject(SesionService)
  router = inject(Router)

  usuario = this.sesion.usuario()

  recetas = signal<Receta[]>([])

  filtro = signal<Filtros>(null)

  cargando = signal(true)
  errorApi = signal("")

  listadoFiltrado = computed(() => {
    const lista = this.recetas()
    const filtro = this.filtro()

    if (filtro == "facil") return lista.filter( l => l.dificultad === filtro)
    if (filtro == "media") return lista.filter( l => l.dificultad === filtro)
    return lista
  })

  constructor() {
    const usuario = this.sesion.usuario()
    if (!usuario) return

    this.recetaService.obtenerTodos(usuario.id).subscribe({
      next: (receta) => {
        this.recetas.set(receta)
        this.cargando.set(false)
      },
      error: (e: HttpErrorResponse) => {
        this.errorApi.set(e.error?.error ?? "No se pudo conectar al servidor")
        this.cargando.set(false)
      }
    })
  }

  cambiarFiltro(valor: string): void {
    const usuario = this.sesion.usuario()
    this.filtro.set(valor as Filtros)
  }

  recetaToggle(receta: Receta, estado: boolean) {
    const u = this.sesion.usuario()
    if(!u) return

    this.recetaService.toggleFavorita(receta.id, estado, u.id).subscribe({
      error: () => console.log("Error")
    })
  }

}
