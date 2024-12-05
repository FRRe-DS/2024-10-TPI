import React from "react";
import { Button } from "@/components/ui/button";

interface ModalProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

export function Modal({
  title,
  children,
  isOpen,
  onClose,
  onConfirm,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md shadow-lg w-96">
        <h2 className="text-lg font-bold">{title}</h2>
        <div className="mt-2">{children}</div>
        <div className=" flex justify-between ">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          {onConfirm && (
            <Button variant="default" onClick={onConfirm}>
              Confirmar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
