import pandas as pd
import numpy as np
from matplotlib import pyplot as plt

from datetime import datetime
from sklearn.datasets import make_blobs
from sklearn.preprocessing import MinMaxScaler

def _scale_ubicaciones(
        Ub, 
        lon_range = (-62.472255, -62.272098),
        lat_range = (-31.952209, -31.835612)):
    # Escalea la longitud y latitud
    # Devuelve lista de ubicaciones escalada

    # Separamos latitud y longitud en listas diferentes
    # Tambien modificamos el shape para el scaler
    lon = np.reshape([ub[0] for ub in Ub], (-1, 1))
    lat = np.reshape([ub[1] for ub in Ub], (-1, 1))

    # Construimos los escaladores
    scaler_lon = MinMaxScaler(lon_range)
    scaler_lat = MinMaxScaler(lat_range)

    # Escalamos
    lon = scaler_lon.fit_transform(lon)
    lat = scaler_lat.fit_transform(lat)

    return np.concatenate([lon, lat], 1)
    

def gen_ubicaciones(
        n_vacas = 10,
        centros = 3,
        seed = None, 
        lon_range = (-62.472255, -62.272098),
        lat_range = (-31.952209, -31.835612)):
    # Genera una lista 2D con ubicaciones de vacas
    Ub, y = make_blobs(n_samples= n_vacas, centers= centros, random_state= seed)
    # Tenemos que scalear latitud y longitud
    Ubs = _scale_ubicaciones(Ub, lon_range, lat_range)

    return Ubs

def gen_dataframe(Ub):
    n_vacas = Ub.shape[0]
    df = pd.DataFrame({
        "ID Sensor": list(range(0, n_vacas)),
        "ID Vaca": list(range(0, n_vacas)),
        "Longitud": [ub[0] for ub in Ub],
        "Latitud": [ub[1] for ub in Ub],
        "Fecha/Hora": datetime.now().isoformat(sep='T', timespec='auto')
    }).set_index('ID Sensor')

    return df

def main():
    n_vacas = 1000                          # Cantidad de vacas a generar
    centros = 5                             # Cantidad de "manadas"
    seed = None                             # Semilla para generar ubicaciones
    lon_range = (-62.472255, -62.272098)    # Rango de longitudes a generar
    lat_range = (-31.952209, -31.835612)    # Rango de latitudes a generar
    path = "Datos/registroGanado.csv"       # Ruta del archivo a guardar
    plot = False                            # Generar un gráfico de dispersión

    Ub = gen_ubicaciones(n_vacas, centros, seed, lon_range, lat_range)
    if plot:
        plt.scatter(Ub[:, 0], Ub[:, 1])
        plt.show()
    df = gen_dataframe(Ub)
    #print(df)
    df.to_csv(path)

if __name__ == '__main__':
    main()