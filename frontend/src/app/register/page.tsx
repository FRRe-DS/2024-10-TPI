"use client";
import Link from "next/link";
import { handleRegister } from "./actions";
import { useFormStatus } from "react-dom";
import { useState } from "react";
export default function Page() {
  const { pending } = useFormStatus();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState<boolean | null>(null);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (confirmPassword) {
      setPasswordsMatch(confirmPassword === newPassword);
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const confirmValue = e.target.value;
    setConfirmPassword(confirmValue);
    setPasswordsMatch(password === confirmValue);
  };

  const getBorderColor = (field: 'password' | 'confirm') => {
    if (field === 'password' && passwordsMatch !== null) {
      return passwordsMatch ? 'border-green-500' : 'border-red-500';
    }
    if (field === 'confirm' && confirmPassword) {
      return passwordsMatch ? 'border-green-500' : 'border-red-500';
    }
    return 'border-gray-300';
  };

  return (
    <div className="mx-auto flex p-5 flex-col justify-center items-center">
      <div className="p-10 border drop-shadow-md shadow-sm w-96 rounded-xl">
        <h1 className="font-bold text-xl mb-4">Registrarse</h1>
        <form className="flex flex-col space-y-4" action={handleRegister}>
          <input
            type="name"
            placeholder="Nombre"
            name="nombre"
            className="border p-2 rounded"
            required
          />
          <input
            type="lastname"
            placeholder="Apellido"
            name="apellido"
            className="border p-2 rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="correo"
            className="border p-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            name="contrasenia_hasheada"
            className={`border p-2 rounded transition-colors ${getBorderColor('password')}`}
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            className={`border p-2 rounded transition-colors ${getBorderColor('confirm')}`}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          {passwordsMatch === false && (
            <p className="text-red-500 text-sm">Las contraseñas no coinciden</p>
          )}
          <button
            disabled={pending || passwordsMatch === false || !passwordsMatch}
            type="submit"
            className="disabled:bg-gray-400 bg-blue-500 text-white p-2 rounded"
          >
            Registrarse
          </button>
        </form>
        <Link href="/login" className="mt-4 text-blue-500 underline block">
          Volver a Login
        </Link>
      </div>
    </div>
  );
}

