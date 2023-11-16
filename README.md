# Portal del paciente

## Despliegue con docker

 ~~~cmd
 docker build . -t portal-cmnrnk  
 docker run -d -p 8081:80 --name portal-cmnrnk portal-cmnrnk
 ~~~
