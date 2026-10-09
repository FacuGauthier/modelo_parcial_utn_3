export interface Usuario {
    id: number,
    username: string
    contrasena: string
}

export interface DatosRegistro {
    username: string
    mail: string
    contrasena: string
}

export interface DatosLogin {
    username: string
    contrasena: string
}