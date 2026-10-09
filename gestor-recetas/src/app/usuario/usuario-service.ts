import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { DatosLogin, DatosRegistro, Usuario } from '../interfaces/usuario';
import { Observable } from 'rxjs';

@Service()
export class UsuarioService {
    http = inject(HttpClient)
    url = "http://localhost:3000/api/usuarios"

    registro(datos: DatosRegistro): Observable<Usuario> {
        return this.http.post<Usuario>(`${this.url}/registro`, datos)
    }

    login(datos: DatosLogin): Observable<Usuario> {
        return this.http.post<Usuario>(`${this.url}/login`, datos)
    }
}
