"use client";
import { useState } from "react";
import { handleAuth } from "@/api/authHandler";

export default function Page() {
  const [isLogin, setIsLogin] = useState(true);
  const [confirmarContra, setConfirmarContra] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    correo: "",
    contrasenia_hasheada: "",
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let result;
    if (!isLogin) {
      if (formData.contrasenia_hasheada !== confirmarContra) {
        alert("Passwords do not match");
        return;
      }

      result = await handleAuth({ formData, isLogin });
    } else {
      const loginData = {
        correo: formData.correo,
        contrasenia_hasheada: formData.contrasenia_hasheada,
      };
      result = await handleAuth({ loginData, isLogin });
      localStorage.setItem("token", result.data.token);
    }

    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="mx-auto flex p-5 flex-col justify-center items-center">
      <div className="p-10 border drop-shadow-md shadow-sm w-96 rounded-xl">
        <h1 className="font-bold text-xl mb-4">
          {isLogin ? "Inicio de sesion" : "Registrarse"}
        </h1>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Nombre"
                name="nombre"
                className="border p-2 rounded"
                value={formData.nombre}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                placeholder="Apellido"
                name="apellido"
                className="border p-2 rounded"
                value={formData.apellido}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                placeholder="DNI"
                name="dni"
                className="border p-2 rounded"
                value={formData.dni}
                onChange={handleInputChange}
                required
              />
            </>
          )}
          <input
            type="email"
            placeholder="Email"
            name="correo"
            className="border p-2 rounded"
            value={formData.correo}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            name="contrasenia_hasheada"
            className="border p-2 rounded"
            value={formData.contrasenia_hasheada}
            onChange={handleInputChange}
            required
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirmar contraseña"
              name="confirmarContra"
              className="border p-2 rounded"
              value={confirmarContra}
              onChange={(e) => setConfirmarContra(e.target.value)}
              required
            />
          )}
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            {isLogin ? "Iniciar Sesion" : "Registrarse"}
          </button>
        </form>
        <button onClick={toggleForm} className="mt-4 text-blue-500 underline">
          {isLogin ? "Crea una cuenta" : "Ya tienes una cuenta?, logueate"}
        </button>
      </div>
    </div>
  );
}
