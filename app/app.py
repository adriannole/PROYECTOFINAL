from flask import Flask, render_template, request, redirect, url_for, session

from models.models import Usuario, agregar_usuario, obtener_usuario_por_correo

app = Flask(__name__)
app.secret_key = 'tu_clave_secreta_aqui'  # Necesaria para manejar sesiones

@app.route('/')
def index():
    return render_template('Index.html')

@app.route('/registro', methods=['GET', 'POST'])
def registro():
    if request.method == 'POST':
        nombre = request.form['nombres_completos']
        correo = request.form['correo']
        contraseña = request.form['contraseña']
        nuevo_usuario = Usuario(nombre, correo, contraseña)
        agregar_usuario(nuevo_usuario)
        return redirect(url_for('Index'))
    return render_template('registro.html')

@app.route('/inicio_sesion', methods=['GET', 'POST'])
def inicio_sesion():
    if request.method == 'POST':
        correo = request.form['correo']
        contraseña = request.form['contraseña']
        usuario = obtener_usuario_por_correo(correo)
        if usuario and usuario.verificar_contraseña(contraseña):
            session['usuario_logueado'] = usuario.id
            return redirect(url_for('perfil'))
        else:
            # Manejar error de inicio de sesión aquí
            pass
    return render_template('inicio_sesion.html')

@app.route('/perfil')
def perfil():
    if 'usuario_logueado' not in session:
        return redirect(url_for('inicio_sesion'))
    # Aquí debes obtener la información del usuario para mostrarla en el perfil
    usuario_id = session['usuario_logueado']
    # usuario = obtener_usuario_por_id(usuario_id)
    # return render_template('perfil.html', usuario=usuario)
    return 'Perfil del usuario'  # Reemplaza con la línea de arriba cuando tengas la función obtener_usuario_por_id

if __name__ == '__main__':
    app.run(debug=True)