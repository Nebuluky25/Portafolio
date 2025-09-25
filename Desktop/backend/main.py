from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from typing import List
import os

app = FastAPI(title="Portafolio API")

# Permitir que cualquier origen acceda (ajusta en producción)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cambia a tu dominio en producción
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Datos de ejemplo
proyectos = [
    {
        "id": 1,
        "nombre": "API Centros Deportivos",
        "descripcion": "API para el control de centros deportivos",
        "url": "https://github.com/Nebuluky25/My_Code"
    },
    {
        "id": 2,
        "nombre": "API Centro de Manicura",
        "descripcion": "API para gestión de citas en un centro de manicura",
        "url": "https://github.com/tuusuario/api-manicura"
    },
    {
        "id": 3,
        "nombre": "API Chatbot, openai y localAI",
        "descripcion": "APIs para chatbots usando openai y localAI",
        "url": "https://github.com/Nebuluky25/Python_code"
    }
]

sobre_mi = {
    "nombre": "Miguel Sierra",
    "profesion": "Desarrollador Python Fullstack Junior",
    "skills": ["Python", "Flask", "FastAPI", "React", "SQL", "Postgresql", "AWS", "Chatbots", "DeepAI", "LocalAI"],
    "fotoPerfil": "/public/foto_perfil.jpeg"
}

contacto = {
    "email": "msworkpy@gmail.com",
    "telefono": "+34 658973241",
    "linkedin": "https://www.linkedin.com/in/miguel-sierra-sacie-830324261"
}

# Endpoints


# Endpoint para listar proyectos
@app.get("/proyectos", response_model=List[dict])
def get_proyectos():
    return proyectos

# Endpoint para obtener información "sobre mí"
@app.get("/sobre-mi")
def get_sobre_mi():
    return sobre_mi

# Endpoint para obtener datos de contacto
@app.get("/contacto")
def get_contacto():
    return contacto

# Montar archivos estáticos del frontend
# La ruta absoluta asumiendo que en tu proyecto frontend está en ../frontend/public
frontend_public_path = os.path.join(os.path.dirname(__file__), "../frontend/public")
app.mount("/public", StaticFiles(directory=frontend_public_path), name="public")

# Para correrlo localmente (esto NO es necesario en despliegue en Render)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)