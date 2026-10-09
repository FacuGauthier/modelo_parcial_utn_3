export type Dificultad = "facil" | "media" | "dificil"

export interface Receta {
    id: number
    titulo: string
    descripcion: string
    categoria: string
    tiempoPreparacion: number
    dificultad: Dificultad
    favorita: boolean
    creadorId: number
}

export interface NuevaReceta {
    titulo: string
    descripcion: string
    categoria: string
    tiempoPreparacion: number
    dificultad: Dificultad
}