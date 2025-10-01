from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from typing import List
import os

app = FastAPI(title="Portafolio API")

# Permitir que React acceda al backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cambia a tu dominio en producción
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Montar la carpeta /static para servir archivos como fotos
static_path = os.path.join(os.path.dirname(__file__), "static")
if not os.path.exists(static_path):
    os.makedirs(static_path)
app.mount("/static", StaticFiles(directory=static_path), name="static")

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
    "fotoPerfil": "/static/foto_perfil.jpeg"  # <-- aquí apuntamos al static
}

contacto = {
    "email": "msworkpy@gmail.com",
    "telefono": "+34 658973241",
    "linkedin": "https://www.linkedin.com/in/miguel-sierra-sacie-830324261"
}

# Endpoints
@app.get("/")
async def read_root():
    return {"message": "Hola Mundo"}

@app.get("/proyectos", response_model=List[dict])
def get_proyectos():
    return proyectos

@app.get("/sobre-mi")
def get_sobre_mi():
    return sobre_mi

@app.get("/contacto")
def get_contacto():
    return contacto

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
