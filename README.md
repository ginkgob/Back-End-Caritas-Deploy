# Habit+

Aplicación web para mejorar los hábitos de los usuarios de Cáritas

#### Sobre el proyecto

------------
Habit+ nace de la necesidad de dar a conocer y enriquecer hábitos saludables dentro de la comunidad de Cáritas. 

Distribuidas en cuatro categorias, la web permite a lxs usuarixs obtener mejor información sobre hábitos de sueño, deportivos, nutricionales y salud mental.  A su vez, la web permite el envio de consultas a lxs administadorxs para aclarar cualquier duda que surga sobre el seguimiento de estos hábitos. 

------------

------------


## Back-end

### Funcionalidades
1. Creación, vista, edición y deleción (CRUD) de usuarixs
2. Envio de un correo electrónico con las credenciales de autentificación al usuario
3. Obtención de un Jason Web Token (JWT) en loguearse usuarixs y administradorxs
4. Encriptación de contraseña 
5. Creación de endpoints para el CRUD de usuarios y secciones
6. CRUD de secciones 

### Instalación

Clona el repositorio con el siguiente comando: `git clone https://github.com/Caritas-Habits/Back-End.git`. Luego, inicia el back-end con `npm run dev`, este comando inciará el back-end en http://localhost:5050. Si lo prefieres, puedes cambiar el puerto de conexión en el archivo `./src/index.js`

### Stack 
Para la construcción y desarrollo del Back-End se utilizó el stack:
- MongoDB
- NodeJs
- Express

### Equipo
- [Ales Navarro](https://github.com/aleswebgit "Ales")
- [Alex Vidal](https://github.com/ginkgob "Álex ")
- [Damaris Teoc](https://github.com/DamarisTeoc "Damaris")
- [Daniel Calvo](https://github.com/LvL090 "Daniel calvo")
- [Jessica Mejia](https://github.com/itsberriver "Jessica")
