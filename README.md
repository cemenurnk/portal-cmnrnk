# Portal del paciente

## Despliegue con docker

 ~~~cmd
 docker build . -t portal-cmnrnk  
 docker run -d -p 8081:80 --name portal-cmnrnk portal-cmnrnk
 ~~~

 ## Variables de entorno para desarrollo

- **VITE_USERNAME**=*sievert*
- **VITE_PASSWORD**=*PwXWeJfNWKaJ*
- **VITE_APIREST**=*https://apirest.cemenurnk.org.ar/*
- **VITE_DOMINIO_PORTAL**=*https://miportal.cemenurnk.org.ar/*
- **VITE_ENVIRONMENT**=*DESA*