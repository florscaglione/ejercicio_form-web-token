from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)

    city_id = db.Column(db.Integer, db.ForeignKey('city.id'), nullable=True)

    city = db.relationship('City', backref=db.backref('users', lazy=True))

    def __repr__(self):
        return '<User %r>' % self.email

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "city_id": self.city_id   # siempre es interesante incluir aquí la columna de las relaciones

        }

    def save(self):
        db.session.add(self)   
        db.session.commit()

class City(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    
    country_id = db.Column(db.Integer, db.ForeignKey('country.id'), nullable=True)

    country = db.relationship('Country', backref=db.backref('cities', lazy=True))

    def __repr__(self):
        return '<City %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "country_id": self.country_id   # siempre es interesante incluir aquí la columna de las relaciones
        } 

    def save(self):
        db.session.add(self)      # lo guardo en la BBDD. Paso "self" porque estoy dentro de su modelo, por eso es "sí mismo"
        db.session.commit()               

class Country(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)

    def __repr__(self):
        return '<Country %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }

    def save(self):
        db.session.add(self)      # lo guardo en la BBDD. Paso "self" porque estoy dentro del modelo country, por eso es "sí mismo"
        db.session.commit()