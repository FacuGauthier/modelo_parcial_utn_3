import { Component, inject, signal } from '@angular/core';
import { UsuarioService } from '../usuario/usuario-service';
import { SesionService } from '../sesion/sesion-service';
import { DatosLogin } from '../interfaces/usuario';
import { Router, RouterLink } from '@angular/router';
import { form, required, FormField } from '@angular/forms/signals';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  imports: [FormField, RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  usuarioService = inject(UsuarioService)
  sesion = inject(SesionService)
  router = inject(Router)

  modelo = signal<DatosLogin>({ username:"", contrasena:"" })

  formulario = form(this.modelo, (ruta) => {
    required(ruta.username, { message: "El usuario es obligatorio" })
    required(ruta.contrasena, { message: "La contraseña es obligatoria" })
  })

  enviando = signal(false)
  errorApi = signal("")

  enviar(evento: Event): void {
    evento.preventDefault()

    if (this.formulario().invalid()) return
    if (this.enviando()) return

    this.enviando.set(true)
    this.errorApi.set("")

    this.usuarioService.login(this.modelo()).subscribe({
      next: (usuario) => {
        this.sesion.iniciarSesion(usuario)
        this.router.navigate(["/recetas"])
      },
      error: (e: HttpErrorResponse) => {
        this.errorApi.set(e.error?.error ?? "No se pudo conectar con el servidor")
        this.enviando.set(false)
      }
    })
  }
}
