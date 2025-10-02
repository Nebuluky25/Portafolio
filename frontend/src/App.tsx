import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import CodeRainBackground from "./CodeRainBackground"; // Fondo de lluvia de código
import "./App.css";

// URL del backend (Render o local)
const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "https://portafolio-73wj.onrender.com";

interface Proyecto {
  id: number;
  nombre: string;
  descripcion: string;
  url: string;
}

interface SobreMi {
  nombre?: string;
  fotoPerfil?: string;
  profesion?: string;
  skills?: string[];
}

interface Contacto {
  email?: string;
  telefono?: string;
  linkedin?: string;
}

export function App() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [sobreMi, setSobreMi] = useState<SobreMi>({});
  const [contacto, setContacto] = useState<Contacto>({});

  useEffect(() => {
    // Obtener proyectos
    axios
      .get(`${BACKEND_URL}/proyectos`)
      .then((res) =>
        setProyectos(Array.isArray(res.data) ? res.data : [])
      )
      .catch(() =>
        setProyectos([
          {
            id: 1,
            nombre: "Proyecto Demo",
            descripcion: "Ejemplo de proyecto en GitHub",
            url: "https://github.com/Nebuluky25/Portafolio",
          },
          {
            id: 2,
            nombre: "Proyecto Demo en Render",
            descripcion: "Ejemplo de proyecto desplegado en Render",
            url: "https://portafolio-73wj.onrender.com",
          },
        ])
      );

    // Obtener datos sobre mí
    axios
      .get(`${BACKEND_URL}/sobre-mi`)
      .then((res) => setSobreMi(res.data || {}))
      .catch(() =>
        setSobreMi({
          nombre: "Miguel Sierra",
          fotoPerfil: "/foto_perfil.jpeg", // se sirve desde public
          profesion: "Desarrollador Junior Python",
          skills: ["Python", "Flask", "FastAPI", "React"],
        })
      );

    // Obtener datos de contacto
    axios
      .get(`${BACKEND_URL}/contacto`)
      .then((res) => setContacto(res.data || {}))
      .catch(() =>
        setContacto({
          email: "msworkpy@gmail.com",
          telefono: "+34 658973241",
          linkedin:
            "https://www.linkedin.com/in/miguel-sierra-sacie-830324261",
        })
      );
  }, []);

  return (
    <div className="App">
      <CodeRainBackground />

      <div className="content-overlay">
        {/* Foto de perfil */}
        {sobreMi.fotoPerfil && (
          <motion.div
            className="foto-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring", stiffness: 90 }}
          >
            <img
              src={sobreMi.fotoPerfil || "/foto_perfil.jpeg"}
              alt="Foto de perfil"
              className="foto-perfil"
            />
          </motion.div>
        )}

        {/* Nombre y profesión */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <span style={{ fontSize: "3rem", color: "#c2c2d2ff" }}>
            {sobreMi.nombre || "Miguel Sierra"}
          </span>
        </motion.h1>

        <motion.h3
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <span style={{ fontSize: "2rem", color: "#a1a9f0ff" }}>
            {sobreMi.profesion || "Desarrollador Junior Python"}
          </span>
        </motion.h3>

        {/* Sobre mí */}
        <section className="sobre-mi">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            ¡Hola! Soy <strong>{sobreMi.nombre || "Miguel Sierra"}</strong>,
            Desarrollador con Python.
            <br />
            Muchas ganas de trabajar en equipo y seguir aprendiendo.
            <br />
            <span>
              <strong>Experiencia en:</strong>{" "}
              {sobreMi.skills?.join(", ") ||
                "Python, Flask, FastAPI, Django, React"}
              .
            </span>
          </motion.p>
        </section>

        {/* Proyectos */}
        <section className="proyectos-section">
          <h2 style={{ fontSize: "2.2rem", color: "#9da9f5ff" }}>Proyectos</h2>
          <div className="proyectos">
            {proyectos.length > 0 ? (
              proyectos.map((p, i) => (
                <motion.div
                  key={p.id}
                  className="proyecto-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.2 + i * 0.2,
                    type: "spring",
                    stiffness: 150,
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow:
                      "0 0 20px rgba(83,117,209,0.7), 0 0 40px rgba(83,117,209,0.5)",
                  }}
                >
                  <h3>{p.nombre}</h3>
                  <p>{p.descripcion}</p>
                  <button
                    className="proyecto-boton"
                    onClick={() =>
                      window.open(p.url, "_blank", "noopener,noreferrer")
                    }
                  >
                    {p.url.includes("github.com") ? "Ver en GitHub" : "Ver Proyecto"}
                  </button>
                </motion.div>
              ))
            ) : (
              <p>No hay proyectos disponibles.</p>
            )}
          </div>
        </section>

        {/* Contacto */}
        <section className="contacto" style={{ color: "#929eeeff" }}>
          <h2 style={{ color: "#9ba7f0ff" }}>Contacto</h2>
          {contacto.email && (
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              style={{ color: "#5c7ff1ff" }}
            >
              📧 {contacto.email}
            </motion.p>
          )}
          {contacto.telefono && (
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
              style={{ color: "#5c7ff1ff" }}
            >
              📱 {contacto.telefono}
            </motion.p>
          )}
          {contacto.linkedin && (
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              href={contacto.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#5c7ff1ff" }}
            >
              LinkedIn
            </motion.a>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
