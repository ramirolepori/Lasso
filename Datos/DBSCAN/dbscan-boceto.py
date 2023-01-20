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
        latitud = float(vacas[id]["ubicaciones"][0]["lat"])
        longitud = float(vacas[id]["ubicaciones"][0]["long"])
        ubicaciones.append([latitud, longitud])

    clusters, labels = _vacas_dbscan(ubicaciones, eps)  

    vacas_aisladas = []
    for i in range(len(labels)):
        if labels[i] == -1:
            vacas_aisladas.append(vacas_ids[i]) # Es una vaca aislada
    
    return vacas_aisladas # Debería retornar otra estructura de datos

def _vacas_dbscan(ubicaciones, _eps = 0.43, _min_samples = 10): # Se produce un error al pasar eps y min_samples al constructor DBSCAN
                                                                # Por ahora lo dejo así
    """
    """
    db = DBSCAN(eps=0.009, min_samples=10).fit(ubicaciones)
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

vacas = read_json_file('Datos\\registroGanado.json')
print("Vacas aisladas: ", vacas_dbscan(vacas))