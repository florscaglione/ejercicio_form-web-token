"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, City, Country
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

def get_json(): # esta función es común para varias funciones (así se optimiza el código, mejor que repetir el mismo código en cada una de ellas)
    json = request.get_json()       # con esto cogemos el body que le enviamos para indicar qué país/ciudad/user estamos creando
    
    if json is None:    # si no lo encuentra, tira este error (con esto ya tenemos la comprobación hecha para todas las funciones que usen este get_json())
        raise APIException("No se ha enviado un JSON o no se ha especificado en el header que se nos ha enviado un JSON") # lanzo una excepción que la aplicación captura y devuelve al usuario
   
    return json     # si lo encuentra, lo devuelve

def get_name(json): # json tiene q pasarse por parámetro porque no es un objeto global que esté importado (como el request de la función get_json), sino que es local proveniente de get_json()
    name = json.get("name") # cogemos el nombre del país/ciudad que se ha escrito

    if name is None or name == "":
        raise APIException("El nombre es obligatorio") # lanzo una excepción que la aplicación captura y devuelve al usuario

    return name

# Quiero ver el listado de países:
@api.route('/countries', methods=['GET'])
def list_countries():
    countries = Country.query.all() # para listar los paises, primero tengo que cogerlos de la BBDD

    return jsonify(list(map(lambda country: country.serialize(), countries))), 200  # ahora devuelvo esos países que he buscado en la BBDD

# Quiero crear países nuevos:
@api.route('/countries/create', methods=['POST'])
def create_country():
    json = get_json()       # con esto cogemos el body que le enviamos para indicar qué país es (llamando a la función get_json())
    
    name = get_name(json) # cogemos el nombre del país que se ha escrito

    country = Country(name=name) # creamos el país que queremos dar de alta
    country.save()  # llamo a la función "save" (está en los modelos) para guardar el país en la BBDD

    return jsonify(country.serialize()), 200    # lo devuelvo

# Quiero listar sólo las ciudades de un país:
@api.route('/countries/<int:country_id>/cities', methods=['GET'])  
def list_cities_in_country(country_id):     # paso por parámetro el id del país en cuestión
    country = Country.query.get(country_id) # recojo el país

    return jsonify(list(map(lambda city: city.serialize(), country.cities))), 200  # ahora devuelvo las ciudades de ese país que he encontrado en la BBDD

# Quiero crear ciudades nuevas (en países):
@api.route('/countries/<int:country_id>/cities/create', methods=['POST']) # con este endpoint obligo a crear ciudades DENTRO de un país
def create_city_in_country(country_id): # BELDA TIENE ESTA FCION. DIFERENTE, REVISAR!!!
    json = get_json()       # con esto cogemos el body que le enviamos para indicar qué ciudad es (llamando a la función get_json())
       
    name = get_name(json) # cogemos el nombre de la ciudad que se ha escrito

    country = Country.query.get(country_id)  # busco el country_id en la BBDD y lo asigno a country
    city = City(name=name) # creamos la ciudad que queremos dar de alta
    
    #country.cities.append(city) # la ciudad se va a guardar asociada a ese país (otra forma de hacerlo)
    #country.save()  # luego guardo el país (con esa ciudad ya asociada)

    city.country = country
    city.save()

    return jsonify(city.serialize()), 200    # lo devuelvo

# Quiero crear usuarios:
@api.route('/users/create', methods=['POST'])
def create_user():
    json = get_json()   # con esto cogemos el body que le enviamos para indicar qué usuario es (llamando a la función get_json())
        
    email = json.get("email") # cogemos el email que se ha escrito (lo mismo con el password y el city_id)
    password = json.get("password")
    city_id = json.get("city_id")

    user = User(email=email, password=password) # creamos el usuario: significa que llene la columna email (1er "email") con lo que se haya escrito como email (2o email), y lo mismo con el password
   
    if city_id is not None: # si me han dado una ciudad, la incluimos
        user.city_id = city_id

    user.save()  # llamo a la función "save" (está en los modelos) para guardar el usuario en la BBDD

    return jsonify(user.serialize()), 200 

# Login de usuarios:
@api.route('/login', methods=['POST'])
def login():    
    # completar
    return jsonify({user: user.serialize(), access_token: "akjdsjdbasdjhasdasd"})

# Quiero mostrar la información de un usuario, después de loguearse:
@api.route('/users/<int:user_id>', methods=['GET'])
# @jwt_required
def show_user(user_id):
    user = User.query.get(user_id)      # lo cogemos de la BBDD con el get
    userSerialized = user.serialize()   # creo una vble. para guardar el user serializado

    if user.city is not None:
        userSerialized["city"] = user.city.serialize()  # userSerialized["city"] es un diccionario donde me guardo lo serializado
        userSerialized["city"]["country"] = user.city.country.serialize()   # user.city.serialize() : cuando uso los puntos me refiero a la instancia de la clase

        return jsonify(userSerialized), 200

# Quiero mostrar la información de una ciudad:
@api.route('/cities/<int:city_id>', methods=['GET'])
def show_city(city_id):
    city = City.query.get(city_id)      # lo cogemos de la BBDD con el get
    return jsonify(city.serialize()), 200

# Quiero mostrar la información de un país:
@api.route('/countries/<int:country_id>', methods=['GET'])
def show_country(country_id):
    country = Country.query.get(country_id)      # lo cogemos de la BBDD con el get
    return jsonify(country.serialize()), 200