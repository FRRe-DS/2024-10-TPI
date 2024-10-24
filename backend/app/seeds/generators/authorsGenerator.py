import os
from faker import Faker
import json

fake = Faker('es_AR')

def generar_autores(n):
    autores = []
    for _ in range(n):
        autor = {
            "dni": fake.unique.random_number(digits=8, fix_len=True),
            "nombre": fake.first_name(),
            "apellido": fake.last_name(),
            "fec_nac": fake.date_of_birth(minimum_age=18, maximum_age=90).isoformat(),
            "biografia": fake.text(),
            "pais_origen": fake.country()
        }
        autores.append(autor)
    
    return autores

autores = generar_autores(1000)
json_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'authors.json')
with open(json_path, 'w', encoding='utf-8') as file:
    json.dump(autores, file, ensure_ascii=False, indent=4)

print("JSON generado con 1000 autores.")
