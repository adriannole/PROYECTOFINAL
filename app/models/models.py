import psycopg2
from werkzeug.security import generate_password_hash, check_password_hash

class Usuario:
    def __init__(self, id, nombre, correo, contraseña_hash):
        self.id = id
        self.nombre = nombre
        self.correo = correo
        self.contraseña_hash = contraseña_hash

    def verificar_contraseña(self, contraseña):
        return check_password_hash(self.contraseña_hash, contraseña)

def conectar_bd():
    return psycopg2.connect(
        dbname='evaindRegistros',
        user='postgres',
        password='arbolito157',
        host='localhost',
        port='5432'
    )

def inicializar_bd():
    conn = conectar_bd()
    cursor = conn.cursor()
    cursor.execute("""CREATE TABLE IF NOT EXISTS usuarios (
                        id SERIAL PRIMARY KEY,
                        nombre TEXT NOT NULL,
                        correo TEXT NOT NULL UNIQUE,
                        contraseña_hash TEXT NOT NULL)""")
    conn.commit()
    conn.close()

def agregar_usuario(usuario):
    conn = conectar_bd()
    cursor = conn.cursor()
    contraseña_hash = generate_password_hash(usuario.contraseña)
    cursor.execute("""INSERT INTO usuarios (nombre, correo, contraseña_hash) VALUES (%s, %s, %s)""",
                   (usuario.nombre, usuario.correo, contraseña_hash))
    conn.commit()
    conn.close()

def obtener_usuario_por_correo(correo):
    conn = conectar_bd()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM usuarios WHERE correo = %s", (correo,))
    usuario_data = cursor.fetchone()
    conn.close()
    if usuario_data:
        return Usuario(id=usuario_data[0], nombre=usuario_data[1], correo=usuario_data[2], contraseña_hash=usuario_data[3])
    return None

# Inicializar la base de datos al arrancar la aplicación
inicializar_bd()