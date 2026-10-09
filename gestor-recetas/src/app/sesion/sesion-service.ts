import { computed, Service, signal } from '@angular/core';
import { Usuario } from '../interfaces/usuario';

@Service()
export class SesionService {
    _usuario = signal<Usuario | null>(null)

    usuario = this._usuario.asReadonly()
    estaLogueado = computed(() => this._usuario() !== null)

    iniciarSesion(usuario: Usuario) {
        this._usuario.set(usuario)
    }

    cerrarSesion(): void {
        this._usuario.set(null)
    }
}
