"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  votos: number
  nombre: string
  correo: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "correo",
    header: "Correo",
  },
  {
    accessorKey: "votos",
    header: "Votos",
  },
]
