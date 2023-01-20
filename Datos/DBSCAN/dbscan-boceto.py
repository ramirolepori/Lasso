from sklearn.datasets import make_blobs
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import DBSCAN
from sklearn import metrics
import matplotlib.pyplot as plt
import numpy as np
import json

def read_json_file(filepath = 'Datos\\boceto-vaca.json'):
    """ Lee un archivo JSON ubicado en 'filepath'
    Convierte el archivo a un dict
    """
    f = open(filepath)
    d = json.load(f)
    f.close()
    return d

def vacas_dbscan(vacas, eps = 0.43):
    """Esta funcion toma un dict de vacas, las procesa y ejecuta
    DBSCAN sobre ellas"""
    ubicaciones = []
    vacas_ids = list(vacas.keys())
    for id in vacas_ids:
        latitud = vacas[id]["ubicaciones"][0]["lat"]
        longitud = vacas[id]["ubicaciones"][0]["long"]
        ubicaciones.append([latitud, longitud])

    clusters, labels = _dbscan(ubicaciones, eps)  

    vacas_aisladas = []
    for i in range(len(labels)):
        if labels[i] == -1:
            vacas_aisladas.append(vacas_ids[i]) # Es una vaca aislada
    
    return vacas_aisladas # Debería retornar otra estructura de datos

def _dbscan(ubicaciones, eps = 0.43, min_samples = 2):
    """
    """
    db = DBSCAN(eps, min_samples).fit(ubicaciones)
    labels = db.labels_

    # Number of clusters in labels, ignoring noise if present.
    n_clusters_ = len(set(labels)) - (1 if -1 in labels else 0)
    n_noise_ = list(labels).count(-1)

    clusters = dict()
    for l in labels:
        if l in clusters.keys():
            clusters[l] += 1
        else:
            clusters[l] = 1

    return clusters, labels

vacas = read_json_file('Datos\\boceto-vaca.json')
print("Vacas aisladas: ", vacas_dbscan(vacas))
#print(vacas["1"]["ubicaciones"][0]["lat"])