import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
// import { AuthService } from "../../services/AuthServices";

const AltaUser = () => {
  const [userData, setUserData] = useState({
    id: "",
    nombre: "",
    correo: "",
    clave: "",
    celular: "",
    permiso: "",
  });
  //   const { altaAbogados } = AuthService;
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubmitted(true);

    try {
      //   await altaAbogados(userData);
      setUserData({
        id: "",
        nombre: "",
        correo: "",
        clave: "",
        celular: "",
        permiso: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error al registrar el abogado");
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <text className="text-center font-bold">Registrar Abogado</text>
          <text className="text-center">
            Por favor, complete el siguiente formulario
          </text>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="nombre">Nombre Completo</Label>
              <Input
                id="nombre"
                name="nombre"
                value={userData.nombre}
                onChange={handleInputChange}
                required
                // helperText="Ingrese su nombre completo"
              />
            </div>

            <div>
              <Label htmlFor="correo">Correo Electrónico</Label>
              <Input
                id="correo"
                name="correo"
                type="email"
                value={userData.correo}
                onChange={handleInputChange}
                required
                // helperText="Ingrese una dirección de correo válida"
              />
            </div>

            <div className="flex items-center">
              <Label htmlFor="clave">Contraseña</Label>
              <div className="flex items-center">
                <Input
                  id="clave"
                  name="clave"
                  type={showPassword ? "text" : "password"}
                  value={userData.clave}
                  onChange={handleInputChange}
                  required
                  // helperText="Debe contener al menos 8 caracteres"
                />
                <button type="button" onClick={handleClickShowPassword}>
                  {showPassword ? "Ocultar" : "Mostrar"}
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="celular">Teléfono</Label>
              <Input
                id="celular"
                name="celular"
                type="tel"
                value={userData.celular}
                onChange={handleInputChange}
                required
                // helperText="Ingrese su número con código de área"
              />
            </div>

            <div>
              <Label htmlFor="permiso">Permiso</Label>
              <select
                id="permiso"
                name="permiso"
                value={userData.permiso}
                onChange={handleInputChange}
                required
                className="block w-full mt-1"
              >
                <option value="">Seleccione el nivel de permiso</option>
                <option value={2}>Permiso 2 - Consultor</option>
                <option value={3}>Permiso 3 - Abogado</option>
              </select>
            </div>

            <CardFooter>
              <Button
                type="submit"
                // variant="primary"
                className="w-full"
                disabled={
                  !userData.id ||
                  !userData.nombre ||
                  !userData.correo ||
                  !userData.clave ||
                  !userData.celular ||
                  !userData.permiso ||
                  userData.clave.length < 8
                }
              >
                Registrar Usuario
              </Button>
              {isSubmitted && (
                <text className="text-center mt-4">
                  {userData.id
                    ? "Error al registrar el usuario."
                    : "Usuario registrado exitosamente"}
                </text>
              )}
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AltaUser;
