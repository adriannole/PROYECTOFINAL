import psycopg2
from psycopg2 import sql

class Usuario:
    def __init__(self, nombre, correo, contraseña):
        self.nombre = nombre
        self.correo = correo
        self.contraseña = contraseña

def inicializar_bd():
    conn = psycopg2.connect(
       dbname='evaindRegistros',
        user='postgres',
        password='arbolito157',
        host='localhost',
        port='5432'
    )
    cursor = conn.cursor()
    cursor.execute("""CREATE TABLE IF NOT EXISTS usuarios (
                        id SERIAL PRIMARY KEY,
                        nombre TEXT NOT NULL,
                        correo TEXT NOT NULL UNIQUE,
                        contraseña TEXT NOT NULL)""")
    conn.commit()
    conn.close()

def agregar_usuario(usuario):
    conn = psycopg2.connect(
        dbname='evaindRegistros',
        user='postgres',
        password='arbolito157',
        host='localhost',
        port='5432'
    )
   
    cursor = conn.cursor()
    cursor.execute("""INSERT INTO usuarios (nombre, correo, contraseña) VALUES (%s, %s, %s)""",
                   (usuario.nombre, usuario.correo, usuario.contraseña))
    conn.commit()
    conn.close()

# Inicializar la base de datos
inicializar_bd()