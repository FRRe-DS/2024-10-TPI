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
import { Checkbox } from "@/components/ui/checkbox";
import { deleteAutor, updateAutor } from "@/app/autores/action";
import { Autor } from "@/types";
import { Modal } from "../Component/modalAutor";
import { EditAutorModal } from "../Component/modalEditAutor";

export const columns: ColumnDef<Autor>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ID
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize text-center">{row.getValue("id")}</div>
    ),
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
    accessorKey: "apellido",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Apellido
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("apellido")}</div>
    ),
  },

  {
    accessorKey: "fec_nac",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Fecha nacimiento
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("fec_nac")}</div>
    ),
  },

  // Columna oculta para filtrado combinado de nombre y apellido
  {
    id: "nombreApellido",
    filterFn: (row, _columnId, filterValue) => {
      const fullName =
        `${row.original.nombre} ${row.original.apellido}`.toLowerCase();
      return fullName.includes(filterValue.toLowerCase());
    },
  },
  {
    accessorKey: "pais_origen",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        País
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("pais_origen")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      const [isDeleteModalOpen, setDeleteModalOpen] = React.useState(false);
      const [selectedAutor, setSelectedAutor] = useState<Autor | null>(null);
      const [isEditModalOpen, setEditModalOpen] = useState(false);

      const handleEditClick = (autor: Autor) => {
        setSelectedAutor(autor);
        setEditModalOpen(true);
      };

      const update = async (id: number, updatedData: Autor) => {
        try {
          await updateAutor(id, updatedData);
        } catch (error) {}
      };
      return (
        <>
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
                  navigator.clipboard.writeText(payment.id.toString())
                }
              >
                Copiar id Autor
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDeleteModalOpen(true)}>
                Eliminar Autor
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEditClick(payment)}>
                Editar Autor
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Modal para eliminar */}
          <Modal
            title="Confirmar Eliminación"
            isOpen={isDeleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={() => {
              deleteAutor(payment.id);
              setDeleteModalOpen(false);
            }}
          >
            <p>
              ¿Estás seguro de que deseas eliminar al autor{" "}
              <strong>{payment.nombre}</strong>?
            </p>
          </Modal>
          {selectedAutor && (
            <EditAutorModal
              title="Editar Autor"
              isOpen={isEditModalOpen}
              onClose={() => setEditModalOpen(false)}
              autorData={selectedAutor}
              onUpdate={update}
            />
          )}
        </>
      );
    },
  },
];
