from flask import Flask, render_template
from models.models import Usuario, agregar_usuario, inicializar_bd


app = Flask(__name__, static_folder='static')

# Inicializar la base de datos al inicializar la aplicación
def initialize_database():
    inicializar_bd()

initialize_database()

@app.route('/')
def Index():
    return render_template('Index.html')

# Otros enrutamientos y funciones aquí

if __name__ == '__main__':
    app.run(debug=True)