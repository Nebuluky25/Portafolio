import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import CodeRainBackground from "./CodeRainBackground"; // Componente del fondo
import "./App.css";

export function App() {
  const [proyectos, setProyectos] = useState<any[]>([]);
  const [sobreMi, setSobreMi] = useState<any>({});
  const [contacto, setContacto] = useState<any>({});

  useEffect(() => {
    // Proyectos
    axios
      .get("https://portafolio-73wj.onrender.com/proyectos")
      .then((res) => {
        setProyectos(Array.isArray(res.data) ? res.data : []);
      })
      .catch(() =>
        setProyectos([
          {
            id: 1,
            nombre: "Proyecto Demo",
            descripcion: "Ejemplo de proyecto en GitHub",
            url: "https://github.com/miguel/demo",
          },
        ])
      );

    // Sobre mí
    axios
      .get("https://portafolio-73wj.onrender.com/sobre-mi")
      .then((res) => {
        setSobreMi(res.data && typeof res.data === "object" ? res.data : {});
      })
      .catch(() =>
        setSobreMi({
          nombre: "Miguel Sierra",
          fotoPerfil: "/vite.svg",
          profesion: "Desarrollador Junior Python",
          skills: ["Python", "Flask", "FastAPI", "React"],
        })
      );

    // Contacto
    axios
      .get("https://portafolio-73wj.onrender.com/contacto")
      .then((res) => {
        setContacto(res.data && typeof res.data === "object" ? res.data : {});
      })
      .catch(() =>
        setContacto({
          email: "msworkpy@gmail.com",
          telefono: "+34 658973241",
          linkedin: "https://www.linkedin.com/in/miguel-sierra-sacie-830324261",
        })
      );
  }, []);

  return (
    <div className="App">
      {/* Fondo de lluvia de código */}
      <CodeRainBackground />

      {/* Contenido principal */}
      <div className="content-overlay" style={{ overflow: "hidden" }}>
        {/* Header con foto y nombre */}
        {sobreMi.fotoPerfil && (
          <motion.div
            className="foto-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring", stiffness: 90 }}
          >
            <img
              src={sobreMi.fotoPerfil}
              alt="Foto de perfil"
              className="foto-perfil"
            />
          </motion.div>
        )}

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

        {/* Sección Sobre mí */}
        <section className="sobre-mi">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            ¡Hola! Soy <strong>{sobreMi.nombre || "Miguel Sierra"}</strong>, Desarrollador con Python.<br />
            Me encanta crear soluciones prácticas y aprender nuevas tecnologías.<br />
            <span>
              <strong>Experiencia en:</strong>{" "}
              {sobreMi.skills?.join(", ") || "Python, Flask, FastAPI, Django, React"}.
            </span>
          </motion.p>
        </section>

        {/* Sección Proyectos */}
        <section className="proyectos-section">
          <h2 style={{ fontSize: "2.2rem", color: "#9da9f5ff" }}>Proyectos</h2>
          <div className="proyectos">
            {Array.isArray(proyectos) && proyectos.length > 0 ? (
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
                  <a href={p.url} target="_blank" rel="noopener noreferrer">
                    Ver en GitHub
                  </a>
                </motion.div>
              ))
            ) : (
              <p>No hay proyectos disponibles.</p>
            )}
          </div>
        </section>

        {/* Sección Contacto */}
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
