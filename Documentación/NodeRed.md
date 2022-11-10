![Imagen del flujo](Fotos/Sin%20t%C3%ADtulo.png)

En la primera pestaña "GeneradorDatosMock" lo que se hace es generar un lote de datos aleatorios (en el nodo GeneradorDeDatosMock) para luego pasarselos al nodo "Sensor". Este se encarga subirlo a la plataforma IBM Watson IoT Platform. De esta forma se simula el sensado de datos.
Luego el nodo "IBM Iot" se encarga de tomar los datos desde la paltaforma IBM Watson IoT Platform para traerlos a NodeRed.
Los nodos debug son para visualizar datos en el debug de NodeRed