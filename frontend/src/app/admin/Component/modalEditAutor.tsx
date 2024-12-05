import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Autor } from "@/types";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  autorData: Autor;
  onUpdate: (id: number, updatedData: Autor) => void;
}

export const EditAutorModal: React.FC<ModalProps> = ({
  title,
  isOpen,
  onClose,
  autorData,
  onUpdate,
}) => {
  const [formData, setFormData] = useState<Autor | null>(autorData);

  useEffect(() => {
    setFormData(autorData);
  }, [autorData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     onUpdate(autorData.id.toString(), {
//       ...autorData,
//       ...formData,
//     });
//     onClose();
//   };

  const handleSave = () => {
    onUpdate(autorData.id, {
      ...autorData,
      ...formData,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="space-y-4">
          <label className="block">
            <span>Nombre</span>
            <input
              type="text"
              name="nombre"
              value={formData?.nombre || ""}
              onChange={handleInputChange}
              className="block w-full border rounded-md px-2 py-1"
            />
          </label>
          <label className="block">
            <span>Apellido</span>
            <input
              type="text"
              name="apellido"
              value={formData?.apellido || ""}
              onChange={handleInputChange}
              className="block w-full border rounded-md px-2 py-1"
            />
          </label>
          <label className="block">
            <span>País de Origen</span>
            <input
              type="text"
              name="pais_origen"
              value={formData?.pais_origen || ""}
              onChange={handleInputChange}
              className="block w-full border rounded-md px-2 py-1"
            />
          </label>
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="default" onClick={handleSave}>
            Guardar
          </Button>
        </div>
      </div>
    </div>
  );
};
