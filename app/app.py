from flask import Flask, render_template, request, redirect, url_for, session, flash
from models.models import Usuario, agregar_usuario, obtener_usuario_por_correo, existe_usuario

app = Flask(__name__)
app.secret_key = 'tu_clave_secreta_aqui'

@app.route('/')
def index():
   
    return render_template('Index.html')

@app.route('/registro', methods=['GET', 'POST'])
def registro():
    if request.method == 'POST':
        nombre = request.form['nombres_completos']
        correo = request.form['correo']
        contraseña = request.form['contraseña']
        if existe_usuario(correo):
            flash('El correo electrónico ya está registrado.', 'error')
        else:
            nuevo_usuario = Usuario(nombre, correo, contraseña)
            agregar_usuario(nuevo_usuario)
            flash('Registro exitoso. Por favor inicie sesión.', 'success')
        return redirect(url_for('index'))
    return render_template('Index.html')

@app.route('/inicio_sesion', methods=['GET', 'POST'])
def inicio_sesion():
    if request.method == 'POST':
        correo = request.form['correo']
        contraseña = request.form['contraseña']
        usuario = obtener_usuario_por_correo(correo)
        if usuario and usuario.verificar_contraseña(contraseña):
            session['usuario_logueado'] = usuario.correo
            return redirect(url_for('perfil'))
        else:
            flash('Correo electrónico o contraseña incorrecta.', 'error')
            return redirect(url_for('index'))
    return redirect(url_for('index'))

@app.route('/perfil')
def perfil():
    if 'usuario_logueado' not in session:
        flash('Por favor, inicie sesión para ver esta página.', 'warning')
        return redirect(url_for('index'))
    correo = session['usuario_logueado']
    usuario = obtener_usuario_por_correo(correo)
    return render_template('perfil.html', usuario=usuario)

if __name__ == '__main__':
    app.run(debug=True)
