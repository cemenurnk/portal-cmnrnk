sudo docker build . -t portal-app:1.0
echo Imagen portal-app:1.0 creada correctamente.
read -p 'Puerto: ' port
read -p 'VITE_USERNAME: ' vite_username
read -p 'VITE PASSWORD: ' vite_password
sudo docker run -p $port:8080 -e VITE_USERNAME=$vite_username -e VITE_PASSWORD=$vite_password --name portal-app -d portal-app:1.0
echo Contenedor portal-app corriendo en el puerto $port