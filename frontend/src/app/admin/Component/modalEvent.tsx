"use client";

import { Eventos } from "@/types";
import React, { useState } from "react";
import { createEvento } from "../events/action";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (evento: Eventos) => void;
}

export const EventoModal: React.FC<ModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<Eventos>({
    edicion: 1,
    nombre: "",
    fecha_inicio: "",
    fecha_fin: "",
    lugar: "",
    descripcion: "",
    tematica: "",
  });

  const [error, setError] = useState<string | null>(null); // Estado para manejar errores de validación

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    for (const key in formData) {
      if (formData[key as keyof Eventos] === "") {
        setError("Por favor, completa todos los campos.");
        return false;
      }
    }
    setError(null); // Limpia el error si no hay problemas
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return; // Detiene el envío si no pasa la validación

    try {
      const data = await createEvento(formData);
      onSave(data);
      resetForm();
      onClose();
    } catch (error: unknown) {
      console.error(error);
      setError("Ocurrió un error al guardar el evento.");
    }
  };

  const resetForm = () => {
    setFormData({
      edicion: 1,
      nombre: "",
      fecha_inicio: "",
      fecha_fin: "",
      lugar: "",
      descripcion: "",
      tematica: "",
    });
    setError(null); // Limpia errores al reiniciar el formulario
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Crear Evento</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="edicion" className="block text-sm font-medium">
              Edición
            </label>
            <input
              type="number"
              id="edicion"
              name="edicion"
              value={formData.edicion}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="fecha_inicio" className="block text-sm font-medium">
              Fecha Inicio
            </label>
            <input
              type="date"
              id="fecha_inicio"
              name="fecha_inicio"
              value={formData.fecha_inicio}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="fecha_fin" className="block text-sm font-medium">
              Fecha Fin
            </label>
            <input
              type="date"
              id="fecha_fin"
              name="fecha_fin"
              value={formData.fecha_fin}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="lugar" className="block text-sm font-medium">
              Lugar
            </label>
            <input
              type="text"
              id="lugar"
              name="lugar"
              value={formData.lugar}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="descripcion" className="block text-sm font-medium">
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="tematica" className="block text-sm font-medium">
              Temática
            </label>
            <input
              type="text"
              id="tematica"
              name="tematica"
              value={formData.tematica}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
