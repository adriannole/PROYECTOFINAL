from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String, nullable=False)
    correo = db.Column(db.String, nullable=False, unique=True)
    contraseña = db.Column(db.String, nullable=False)