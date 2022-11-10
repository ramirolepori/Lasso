## Generador de Ubicaciones

Es un script que corre en Node.js creado para generar datos mock de ubicaciones gps de vacas.

### Correr el script

Desde la línea de comandos ejecutar:
```
node "ruta-del-script" [n-listas] [m-vacas]
```

### Funcionalidad

El script genera n cantidad de listas de ubicaciones de m cantidad de vacas.

Cada lista representa la ubicación de todas las vacas en un momento de tiempo y cada lista
siguiente representa la ubicación luego de un intervalo de tiempo. Por defecto el intervalo
es de 5 minutos.

Las ubicaciones de cada vaca se modifican en un intervalo aleatorio.
NOTA: La modificación de ubicaciones es un aspecto a refinar del script para
poder generar ubicaciones más cercanas a la realidad.

Los datos son guardados en un archivo "test.csv" en la misma carpeta del script.

Ejemplo:
La siguiente ejecución genera las ubicaciones de 5 vacas en 5 intervalos de tiempo de 5 minutos.
```
node .\generadorUbicaciones.js 5 5
```