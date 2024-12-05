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
    accessorKey: "edicion",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        
      >
        Edicion
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="capitalize text-center">{row.getValue("edicion")}</div>,
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
      <div className="capitalize text-center">{row.getValue("nombre")}</div>
    ),
  },
  {
    accessorKey: "fecha_inicio",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Fecha Inicio
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const fechaIn = new Date(row.getValue("fecha_inicio")).toLocaleDateString();
      return <div className="capitalize text-center">{fechaIn}</div>;
    },
  },

  {
    accessorKey: "fecha_fin",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Fecha Fin
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const fechaFin = new Date(row.getValue("fecha_fin")).toLocaleDateString();
      return <div className="capitalize text-center">{fechaFin}</div>;
    },
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
    cell: ({ row }) => <div className="capitalize text-center">{row.getValue("lugar")}</div>,
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
    cell: ({ row }) => <div className="capitalize text-center">{row.getValue("tematica")}</div>,
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
