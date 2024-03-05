sudo docker build . -t portal-app:1.0
echo Imagen portal-app:1.0 creada correctamente.
read -p 'Puerto: ' port
sudo docker run -p $port:8080 --name portal-app -d portal-app:1.0
echo Contenedor portal-app corriendo en el puerto $port