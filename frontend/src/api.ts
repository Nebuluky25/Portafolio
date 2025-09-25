// src/api.ts
import axios from "axios";

// Base URL desde variable de entorno
const API_URL = import.meta.env.VITE_API_URL;

// Funciones para llamar al backend
export async function fetchProyectos() {
  try {
    const res = await axios.get(`${API_URL}/proyectos`);
    return res.data;
  } catch (error) {
    // fallback si falla el backend
    return [
      {
        id: 1,
        nombre: "Proyecto Demo",
        descripcion: "Ejemplo de proyecto en GitHub",
        url: "https://github.com/miguel/demo",
      },
    ];
  }
}

export async function fetchSobreMi() {
  try {
    const res = await axios.get(`${API_URL}/sobre-mi`);
    return res.data;
  } catch (error) {
    return {
      nombre: "Miguel Sierra",
      fotoPerfil: "/public/foto_perfil.jpeg",
      profesion: "Desarrollador Junior Python",
      skills: ["Python", "Flask", "FastAPI", "React"],
    };
  }
}

export async function fetchContacto() {
  try {
    const res = await axios.get(`${API_URL}/contacto`);
    return res.data;
  } catch (error) {
    return {
      email: "msworkpy@gmail.com",
      telefono: "+34 658973241",
      linkedin: "https://www.linkedin.com/in/miguel-sierra-sacie-830324261",
    };
  }
}
