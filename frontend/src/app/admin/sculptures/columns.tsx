"use client";

import React, { useState } from "react";
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
import { Escultura } from "@/types";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export const columns: ColumnDef<Escultura>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "nombre_obra",
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
      <div className="capitalize">{row.getValue("nombre_obra")}</div>
    ),
  },
  {
    accessorKey: "descripcion",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Descripcion
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("descripcion")}</div>,
  },
  {
    accessorKey: "tecnica",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Tecnica
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize text-center">{row.getValue("tecnica")}</div>
    ),
  },
  {
    accessorKey: "cant_votos",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Votos
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize text-center">{row.getValue("cant_votos")}</div>
    ),
  },
  {
    accessorKey: "autor.nombre",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Autor
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.original.autor.nombre}</div>
    ),
  },
  {
    accessorKey: "imagenes",
    header: "Imágenes",
    cell: ({ row }) => {
      const [selectedImage, setSelectedImage] = useState<string | null>(null);

      return (
        <>
          <Dialog open={!!selectedImage} onOpenChange={(isOpen) => !isOpen && setSelectedImage(null)}>
            <DialogTrigger asChild>
              <Button onClick={() => setSelectedImage(row.original.imagenes[0]?.url)}>
                Ver
              </Button>
            </DialogTrigger>
            {selectedImage && (
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Escultura {row.original.nombre_obra}</DialogTitle>
                  
                </DialogHeader>
                <div className="flex justify-center">
                  <img
                    src={selectedImage}
                    alt="Detalle de imagen"
                    className="max-w-full max-h-96"
                  />
                </div>
                <DialogFooter>
                  <Button variant="ghost" onClick={() => setSelectedImage(null)}>
                    Cerrar
                  </Button>
                </DialogFooter>
              </DialogContent>
            )}
          </Dialog>
        </>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const escultura = row.original;

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
              onClick={() =>
                navigator.clipboard.writeText(escultura.id.toString())
              }
            >
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
