from sklearn.cluster import DBSCAN
import json

def read_json_file(filepath = 'Datos\\boceto-vaca.json'):
    """ Lee un archivo JSON ubicado en 'filepath'
    
    Parameters
    ----------
    filepath : string, default = Datos\\boceto-vaca.json
        La ruta relativa del archivo a leer
    
    Returns
    -------
    d : Dict()
        El contenido del archivo transformado en un Diccionario
    """
    f = open(filepath)
    d = json.load(f)
    f.close()
    return d

def vacas_dbscan(vacas, eps = 0.009, _min_samples = 10):
    """Esta funcion toma un dict de vacas, las procesa y ejecuta
    DBSCAN sobre ellas
    
    Parameters
    ----------
    vacas : Dict(String -> Object)
        Un diccionario de 'IDVaca' -> {ubicaciones, estado}

    eps : Float
        La distancia máxima entre dos ubicaciones para que sean
        consideradas vecinas
    
    _min_samples : Int
        La cantidad de vecinos de un punto para que sea considerado
        punto núcleo según DBSCAN

    Returns
    -------
    clusters : Dict(Int -> Int)
        Un Diccionario de IDManada -> n_vacas

        IDManada representa el id del cluster (o manada) asignado por DBSCAN
        Un ID = -1 representa las vacas aisladas

        n_vacas representa la cantidad de vacas en ese cluster
    
    vacas_aisladas : List(Int)
        Una lista de todos los Id's de las vacas aisladas
    """
    # Generamos una lista de las ubicaciones a partir de 'vacas'
    ubicaciones = []
    vacas_ids = list(vacas.keys())
    for id in vacas_ids:
        latitud = float(vacas[id]["ubicaciones"][-1]["lat"])
        longitud = float(vacas[id]["ubicaciones"][-1]["long"])
        ubicaciones.append([latitud, longitud])

    # Ejecutamos DBSCAN
    db = DBSCAN(eps, min_samples = _min_samples).fit(ubicaciones)
    labels = db.labels_

    # Number of clusters in labels, ignoring noise if present.
    n_clusters_ = len(set(labels)) - (1 if -1 in labels else 0) # Por el momento no usamos ésta info
    n_noise_ = list(labels).count(-1) # Por el momento no usamos ésta info

    # Calculamos la cantidad de vacas por cluster
    clusters = dict()
    for l in labels:
        if l in clusters.keys():
            clusters[l] += 1
        else:
            clusters[l] = 1

    # Obtenemos la lista de vacas aisladas
    vacas_aisladas = []
    for i in range(len(labels)):
        if labels[i] == -1: # Es una vaca aislada
            vacas_aisladas.append(vacas_ids[i])
    
    return clusters, vacas_aisladas # Debería retornar otra estructura de datos

vacas = read_json_file('Datos\\registroGanado.json')
manadas, vacas_aisladas = vacas_dbscan(vacas, 0.009)
print("Manadas: ", manadas)
print("Vacas aisladas: ", vacas_aisladas)