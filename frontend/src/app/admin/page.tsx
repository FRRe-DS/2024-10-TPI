"use client"
import { useEffect, useState } from "react";
import { Autor, EsculturaPaginatedResponse, Eventos } from "@/types";
import { getEventos } from "./events/action";
import { getAutores } from "./escultores/action";
import { getEsculturas } from "../Esculturas/action";

export default function Home() {
  const [autores, setAutores] = useState<Autor[]>([]);
  const [eventos, setEventos] = useState<Eventos[]>([]);
  const [esculturas, setEsculturas] = useState<EsculturaPaginatedResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const autoresData = await getAutores();
        const eventosData = await getEventos();
        const esculturasData = await getEsculturas();

        setAutores(autoresData);
        setEventos(eventosData);
        setEsculturas(esculturasData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Panel de Administración</h1>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">Total de Autores</h2>
          <p className="text-3xl font-bold text-blue-500">{autores.length}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">Total de Eventos</h2>
          <p className="text-3xl font-bold text-green-500">{eventos.length}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">Total de Esculturas</h2>
          <p className="text-3xl font-bold text-red-500">{esculturas?.items.length || 0}</p>
        </div>
      </div>

      {/* Listados */}
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Gestión de Contenidos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Autores */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Autores</h3>
            <ul className="space-y-2">
              {autores.slice(0, 5).map((autor) => (
                <li key={autor.id} className="text-gray-600">{autor.nombre}</li>
              ))}
            </ul>
            <button className="mt-4 text-blue-500 hover:underline">
              <a href="/admin/escultores">Ver más</a>
            </button>
          </div>
          {/* Eventos */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Eventos</h3>
            <ul className="space-y-2">
              {eventos.slice(0, 5).map((evento) => (
                <li key={evento.edicion} className="text-gray-600">{evento.nombre}</li>
              ))}
            </ul>
            <button className="mt-4 text-blue-500 hover:underline">
              <a href="/admin/events">Ver más</a>
            </button>
          </div>
          {/* Esculturas */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Esculturas</h3>
            <ul className="space-y-2">
              {esculturas?.items.slice(0, 5).map((escultura) => (
                <li key={escultura.id} className="text-gray-600">{escultura.nombre_obra}</li>
              ))}
            </ul>
            <button className="mt-4 text-blue-500 hover:underline">
              <a href="/admin/esculturas">Ver más</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
