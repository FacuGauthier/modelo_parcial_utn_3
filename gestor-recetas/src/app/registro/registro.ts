import { Component, inject, signal } from '@angular/core';
import { UsuarioService } from '../usuario/usuario-service';
import { SesionService } from '../sesion/sesion-service';
import { Router } from '@angular/router';
import { DatosRegistro } from '../interfaces/usuario';
import { email, form, minLength, required, FormField } from '@angular/forms/signals';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '../../../node_modules/@angular/common/types/_common_module-chunk';

@Component({
  imports: [FormField, NgClass],
  selector: 'app-registro',
  styleUrl: './registro.css',
  templateUrl: './registro.html',
})
export class Registro {
  usuarioService = inject(UsuarioService)
  sesion = inject(SesionService)
  router = inject(Router)

  repetirContrasena = signal("")

  modelo = signal<DatosRegistro>({ username:"", mail:"", contrasena:"" })

  formulario = form(this.modelo, (ruta) => {
    required(ruta.username, { message: "El usuario es obligatorio" })
    required(ruta.mail, { message: "El email es obligatorio" })
    required(ruta.contrasena, { message: "La contraseña es obligatoria" })
    email(ruta.mail, { message: "El email es obligatorio" })
    minLength(ruta.contrasena, 8, { message: "La contraseña debe tener mas de 8 caracteres" })
  })

  enviando = signal(false)
  errorApi = signal("")

  enviar(evento: Event): void {
    evento.preventDefault()

    if (this.formulario().invalid()) return
    if (this.enviando()) return

    this.enviando.set(true)
    this.errorApi.set("")

    this.usuarioService.registro(this.modelo()).subscribe({
      next: (usuario) => this.router.navigate(["/login"]),
      error: (e: HttpErrorResponse) => {
        this.errorApi.set(e.error?.error ?? "No se pudo conectar con el servidor")
        this.enviando.set(false)
      }
    })
  }
}
