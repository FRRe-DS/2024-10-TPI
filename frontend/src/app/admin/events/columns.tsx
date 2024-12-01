"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Eventos } from "@/types";



export const columns: ColumnDef<Eventos>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "edicion",
    header: "Edicion",
    cell: ({ row }) => <div className="capitalize">{row.getValue("edicion")}</div>,
  },
  {
    accessorKey: "nombre",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nombre
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("nombre")}</div>
    ),
  },
  {
    accessorKey: "fechaInicio",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Fecha Inicio
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("fechaInicio")}</div>,
  },
  // Columna oculta para filtrado combinado de nombre y apellido
  // {
  //   id: "nombreApellido",
  //   filterFn: (row, _columnId, filterValue) => {
  //     const fullName =
  //       `${row.original.nombre} ${row.original.apellido}`.toLowerCase();
  //     return fullName.includes(filterValue.toLowerCase());
  //   },
  // },
  {
    accessorKey: "fechaFin",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Fecha Fin
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("fechaFin")}</div>,
  },
  {
    accessorKey: "lugar",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Lugar
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("lugar")}</div>,
  },
  {
    accessorKey: "tematica",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Tematica
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("tematica")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acción</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.edicion.toString())}
            >
              Copiar edicion evento
            </DropdownMenuItem>
            {/* <DropdownMenuItem
              onClick={() => deleteAutor(payment.id)}
            >
              Eliminar Autor
            </DropdownMenuItem> */}
            {/* <DropdownMenuItem
              onClick={() => updateAutor(payment.id, payment)}
            >
              Editar Autor
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
