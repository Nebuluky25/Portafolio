import React, { useEffect, useRef } from "react";

const pythonCodeSnippets = [
  "def suma(a, b):",
  "return a + b",
  "for i in range(10):",
  "print(i)",
  "if x > 0:",
  "print('Positivo')",
  "else:",
  "print('Negativo')",
  "while True:",
  "break",
  "class Persona:",
  "def __init__(self, nombre):",
  "self.nombre = nombre",
  "import math",
  "import random",
  "lambda x: x*2",
  "# Comentario de ejemplo",
  "try:",
  "x = int(input())",
  "except ValueError:",
  "pass",
];

interface Light {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  text: string;
  fontSize: number;
  opacity: number;
  fading: boolean;
}

const CodeRainBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let animationFrameId: number;

    // Configuración de tamaño del canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    // Listener de resize
    const handleResize = () => {
      resizeCanvas();
      protectedAreas = getProtectedAreas();
    };
    window.addEventListener("resize", handleResize);

    // Zonas protegidas
    const getProtectedAreas = () => [
      { x: 20, y: 20, width: 450, height: 450 }, // foto de perfil
      { x: 0, y: 500, width: window.innerWidth, height: 150 }, // sobre mí
      { x: 0, y: 700, width: window.innerWidth, height: 300 }, // proyectos + contacto
    ];

    let protectedAreas = getProtectedAreas();

    // Crear luces
    const numLights = 50;
    const lights: Light[] = Array.from({ length: numLights }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      speedX: Math.random() * 0.3 - 0.15,
      speedY: Math.random() * 0.3 - 0.15,
      text: pythonCodeSnippets[Math.floor(Math.random() * pythonCodeSnippets.length)],
      fontSize: Math.random() * 18 + 12,
      opacity: Math.random() * 0.5 + 0.2,
      fading: Math.random() > 0.5,
    }));

    // Función de dibujo
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const light of lights) {
        light.x += light.speedX;
        light.y += light.speedY;

        // Rebote en bordes
        if (light.x < 0 || light.x > window.innerWidth) light.speedX *= -1;
        if (light.y < 0 || light.y > window.innerHeight) light.speedY *= -1;

        // Evitar zonas protegidas
        const inProtected = protectedAreas.some(
          (area) =>
            light.x > area.x &&
            light.x < area.x + area.width &&
            light.y > area.y &&
            light.y < area.y + area.height
        );

        if (inProtected) {
          light.x += light.speedX * 2;
          light.y += light.speedY * 2;
        }

        // Fading
        if (light.fading) {
          light.opacity -= 0.005;
          if (light.opacity <= 0.1) {
            light.opacity = 0.1;
            light.fading = false;
            light.text =
              pythonCodeSnippets[Math.floor(Math.random() * pythonCodeSnippets.length)];
          }
        } else {
          light.opacity += 0.005;
          if (light.opacity >= 0.5) {
            light.opacity = 0.5;
            light.fading = true;
          }
        }

        // Dibujar si no está en zona protegida
        if (!inProtected) {
          ctx.font = `${light.fontSize}px monospace`;
          ctx.fillStyle = `rgba(200,200,200,${light.opacity})`;
          ctx.shadowColor = `rgba(200,200,200,${light.opacity})`;
          ctx.shadowBlur = 5;
          ctx.fillText(light.text, light.x, light.y);
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default CodeRainBackground;
