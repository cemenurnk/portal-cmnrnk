# `POST` */login.php*

## Request
~~~js
{
  documento: "44558441",
  pin: "1234"
}
~~~

## Response

### Éxito
~~~js
{
  status: "success",
  sysmedi02_uuid: "d0f15084-4c00-11ee-a5d3-0050568c9146",
  syspers01_apellido: "Vazquez",
  syspers01_nombre: "Iván",
  syspers01_dni: "44558441"
}
~~~

### Validación

~~~js
{
  status: "invalid",
  field: "documento",
  message: "El número de documento es requerido"
}
~~~

### Error interno

~~~js
{
  status: "error",
  message: "Ha ocurrido un error. Consulte con el administrador"
}
~~~

# `GET` */estudios.php?sysmedi02_uuid={sysmedi02_uuid}*

## Response

~~~js
{
  status: "success",
  studies: [
    {
      sysmedi10_uuid: "00323652-4c01-11ee-a5d3-0050568c9146",
      sysmedi09_descripcion: "Tomografía",
      sysmedi09_codigo: "TC",
      sysmedi10_descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae dolorem vitae laborum beatae nesciunt reiciendis illum velit eveniet modi consequatur officia nulla, tempore nostrum suscipit explicabo voluptatum qui, aut quos!",
      sysmedi14_study_date: "2023-07-23 14:50:22"
    },
  ]
}
~~~

# `GET` */estudios.php?sysmedi10_uuid={sysmedi10_uuid}*

## Response

~~~js
{
  status: "success",
  sysmedi09_descripcion: "Mamografía",
  sysmedi14_study_date: "2023-08-23 14:50:22",
  sysmedi07_descripcion: "Mamógrafo GE",
  sysmedi10_medico_responsable: "Trachta, Fernando",
  sysmedi10_medico_derivante: "Albornoz, Gabriela",
  sysmedi10_descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae dolorem vitae laborum beatae nesciunt reiciendis illum velit eveniet modi consequatur officia nulla, tempore nostrum suscipit explicabo voluptatum qui, aut quos!",
  sysmedi14_ui: "1.2.840.113619.2.401.148692532694329114042299683197554365165"
}
~~~

# `GET` */modalidades.php*

## Response

~~~js
{
  status: "success",
  modalities: [
    {sysmedi09_codigo: "TC", sysmedi09_descripcion: "Tomografía"},
    {sysmedi09_codigo: "MG", sysmedi09_descripcion: "Mamografía"}
  ]
}
~~~