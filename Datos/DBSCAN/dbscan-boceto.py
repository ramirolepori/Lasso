from sklearn.datasets import make_blobs
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import DBSCAN
from sklearn import metrics
import matplotlib.pyplot as plt
import numpy as np

def vacas_dbscan(vacas, eps = 0.43):
    """Esta funcion toma un arreglo de vacas, las procesa y ejecuta
    DBSCAN sobre ellas"""
    # Aquí se generaria la lista que contiene solo ubicaciones
    vacas_aisladas = []
    ubicaciones = []
    clusters, labels = _vacas_dbscan(ubicaciones, eps)
    for i in range(len(labels)):
        if labels[i] is -1:
            vacas_aisladas.append(vacas[i].id) # Es una vaca aislada
    
    return vacas_aisladas # Debería retornar otra estructura de datos


def _vacas_dbscan(vacas, eps = 0.43):
    """
    Generamos puntos. La idea es tomar los puntos de 'vacas' pero por el momento
    los generamos nostros
    """
    centers = [[1, 1], [-1, -1], [1, -1]]
    X, labels_true = make_blobs(
        n_samples=75, centers=centers, cluster_std=0.4, random_state=0
    )
    db = DBSCAN(eps, min_samples=10).fit(X)
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