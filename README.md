# Challenge Flixxo de NodeJS con TypeScript y TypeORM

## Instalacion:

Revisar el .production.env antes que nada
Para evitar error de conexion a la base de datos por el localhost
cambiar en el env  el DB_HOST=localhost ejecutando ipconfig y tomando el valor de direccion Ipv4 ejemplo 192.168.0.221


Ejecutar comando parado en la raiz del proyecto levantar el docker de la DB:
```
docker-compose up 
```

Ejecutar comando para dockerizacion de la aplicacion:
```
docker build --no-cache --progress=plain -t flixxo-challenge-api .
```

## Inicializar:
```
docker run -it -p 8000:8000 flixxo-challenge-api
```

## Documentacion de Endpoints:
https://documenter.getpostman.com/view/17798014/2s8ZDX2Mnj

## Endpoints Users:
- POST - CREATE USER:
 - Acepta 6 valores name, lastname, email, password, role, username y description(opcional)   
- POST - LOGIN USER:
 - Acepta 2 valores username/email y password
 - Devuelve un token que es requerido para hacer UPDATE,UPDATE-ROLE, CHANGE-PASSWORD, DELETE-USER
- GET USERS:
 - No es requerido estar autenticado trae informacion simple de los usuarios.
- GET USER BY ID:
 - Trae informacion completa del usuario
 - Se necesita estar autenticado
- UPDATE USER:
 - Acepta 3 valores name(opcional), lastname(opcional), country(opcional).
 - Se necesita estar autenticado solo el mismo usuario puede modificarse a menos que sea de rol ADMIN.
- UPDATE ROLE:
 - Acepta 1 valor role(requerido) posibles valores \["ADMIN","USER"\].
 - Solo el usuario ADMIN autenticado puede utilizarlo.
- UPDATE PASSOWRD:
 - Acepta 1 valor password(requerido) posibles valores.
 - Se necesita estar autenticado solo el mismo usuario puede modificarse a menos que sea de rol ADMIN.
- DELETE USER:
 - Se necesita estar autenticado solo el mismo usuario puede modificarse a menos que sea de rol ADMIN
 
## Endpoints Crypto: 
- POST - CREATE CRYPTO:
 - Acepta 4 valores coinName, symbol, price, description(opcional)
 - Se necesita estar autenticado.   
- GET CRYPTOS:
 - No es requerido estar autenticado trae todas las crypto listadas.
- GET CRYPTOS BY ID:
 - No es requerido estar autenticado trae informacion de una crypto especifica.
- UPDATE CRYPTO:
 - Acepta 4 valores coinName, symbol, price, description todos opcionales.
 - Se necesita estar autenticado por el creador o un usuario ADMIN.
 - Al modificar el valor del precio este lo agrega a la entidad CryptocurrencyHistory para luego poder listar todos sus valores.
- GET CRYPTO HISTORY:
 - Permite consultar la historia completa de precios de un token.
 - No es necesario estar autenticado.
- DELETE CRYPTO
 - Elimina una cryptomoneda y su historial
 - Se necesita estar autenticado por el creador o un usuario ADMIN.


 ## Estructura de carpetas: 
 - Components: contiene los distintas entidades y componentes de la aplicacion (Autenticacion y autorizacion, Cryptocurrency y CryptocurrencyHistory, User )
 - Config: contiene toda la configuracion base de las entidades y la configuracion del servidor junto a la configuracion de la DB.
 - Migrations: contiene la creacion de las tablas user, cryptocurrency y cryptocurrencyHistory.

 ## TO DO:
  - test.
  - hosteo de la aplicacion.
  - filtros y parametrizacion de los endpoints en caso de tener muchos registros. 
  - talvez una mejor documentacion con swagger.

Me van a tener que contrartar si quieren que lo haga ????????????

## ??Qu?? es SQL Injection y c??mo puede evitarse?:
SQL Injection es una t??cnica de hacking en la que un atacante inserta c??digo malicioso en una consulta SQL para obtener acceso no autorizado a una base de datos o para causar un da??o en ella. El atacante puede utilizar esta t??cnica para obtener informaci??n confidencial, alterar o eliminar datos, o incluso tomar control del servidor de base de datos.
Para evitar SQL Injection, es importante seguir varias buenas pr??cticas de seguridad:
Utilizar consultas preparadas o parametrizadas: Esto ayuda a asegurar que los datos de entrada no sean interpretados como c??digo SQL.
Validar y sanitizar todos los datos de entrada: Asegurarse de que los datos de entrada cumplen con un formato v??lido y limpiar cualquier c??digo malicioso.
Utilizar cuentas de usuario con privilegios limitados: Esto ayuda a asegurar que si un atacante logra inyectar c??digo malicioso, no tendr?? acceso completo a la base de datos.
Utilizar firewalls y monitores de seguridad: Esto ayuda a detectar y bloquear cualquier intento de inyecci??n de SQL.
Mantener actualizado el software: Asegurarse de que el software de la base de datos y del servidor est?? actualizado y que incluye las ??ltimas mejoras de seguridad.
Siguiendo estas medidas se garantiza una mayor seguridad en su base de datos y se evita que un atacante logre obtener informaci??n confidencial o causar da??os en su sistema.

## ??Cu??ndo es conveniente utilizar SQL Transactions? Dar un ejemplo:
SQL Transactions son un conjunto de operaciones SQL que se ejecutan como una sola unidad de trabajo, de manera que si alguna de las operaciones falla, todas las operaciones realizadas anteriormente en la transacci??n son deshechas (rollback). Esto ayuda a mantener la consistencia y la integridad de los datos en la base de datos.
Es conveniente utilizar transacciones en cualquier situaci??n en la que se requiera asegurar que varias operaciones deben ser ejecutadas juntas y que si alguna de ellas falla, todas las operaciones deben ser deshechas. Algunos ejemplos comunes incluyen:
Realizar una transferencia bancaria: Si se deben actualizar dos registros (un registro de cuenta de origen y un registro de cuenta de destino) y si alguna de las actualizaciones falla, es importante deshacer ambas actualizaciones para mantener la consistencia de los datos.
Crear una orden de compra: Si se deben insertar una orden de compra y actualizar el inventario en una sola transacci??n, es importante deshacer la orden de compra si la actualizaci??n del inventario falla.
Reservar un billete de avi??n: Si se debe actualizar la cantidad de asientos disponibles en un vuelo y crear una reserva al mismo tiempo, si alguna de las operaciones falla, es importante deshacer ambas operaciones para evitar overbooking.
En resumen, SQL Transactions son especialmente ??tiles en situaciones en las que varias operaciones deben ser ejecutadas juntas y en las que es importante asegurar la consistencia y la integridad de los datos en la base de datos.

## Describ?? brevemente las ventajas del patr??n controller/service/repository en nodejs:
El patr??n controller/service/repository es una arquitectura com??nmente utilizada en aplicaciones de Node.js para organizar el c??digo de manera que sea f??cil de mantener y escalar.
Controller: Es el punto de entrada para las solicitudes del usuario. Se encarga de recibir las solicitudes, validar los datos de entrada y delegar las tareas a los servicios.
Service: Se encarga de llevar a cabo las tareas l??gicas de negocio. Es el lugar donde se llevan a cabo las operaciones de negocio y se pueden encadenar varios servicios para lograr una tarea compleja.
Repository: Se encarga de interactuar con la base de datos y devolver los datos al servicio. Es el lugar donde se escriben las consultas SQL y se mapean los datos para ser utilizados por el servicio.
Ventajas:
Facilidad de mantenimiento: Al separar el c??digo en diferentes capas, es m??s f??cil de entender y mantener.
Escalabilidad: Al separar el c??digo en capas, es m??s f??cil de escalar y a??adir nuevas funcionalidades sin afectar el c??digo existente.
Reutilizaci??n de c??digo: Al tener el c??digo organizado en capas, es m??s f??cil reutilizar c??digo en diferentes partes de la aplicaci??n.
Testeabilidad: Al tener el c??digo organizado en capas, es m??s f??cil escribir pruebas unitarias para cada capa.
En resumen el patr??n controller/service/repository es una buena pr??ctica de arquitectura para organizar el c??digo en aplicaciones de Node.js, ya que permite una mayor escalabilidad, reutilizaci??n de c??digo y facilidad de mantenimiento.

## ??Cu??l es la mejor forma de guardar un campo de tipo enum en la DB?:
La mejor forma de guardar un campo de tipo enum en una base de datos depender?? del motor de base de datos que est?? utilizando. Sin embargo, hay varias opciones comunes para almacenar un campo de tipo enum:
Usar un campo tipo varchar o char: Este es el m??todo m??s com??n ya que la mayor??a de los motores de base de datos soportan estos tipos de campos. El valor se guarda como una cadena de texto y puede ser indexado para mejorar el rendimiento de las consultas.
Usar un campo tipo int: Este m??todo consiste en asignar un n??mero a cada valor del enum, y guardar el n??mero en lugar de la cadena de texto. Esto puede mejorar el rendimiento ya que los n??meros son m??s f??ciles de indexar y comparar. Sin embargo, es importante tener cuidado al cambiar los valores del enum ya que esto puede afectar a los datos existentes.
Usar una tabla de referencia: Este m??todo consiste en crear una tabla separada para almacenar los valores del enum y guardar el ID de la tabla en lugar del valor del enum. Esto permite cambiar los valores del enum sin afectar a los datos existentes, pero puede aumentar el n??mero de consultas necesarias para obtener los datos.
Usar tipos de datos nativos de enum: Algunos motores de base de datos soportan tipos de datos nativos de enum, como MySQL, PostgreSQL y SQL Server. Este tipo de campos guarda los valores del enum en la tabla directamente. Es similar al uso de un campo tipo varchar o char, pero en este caso se puede definir una lista de valores permitidos para el campo, lo que evita errores de ingreso de valores no permitidos.
En resumen, la mejor forma de guardar un campo de tipo enum en una base de datos depender?? de sus necesidades y del motor de base de datos que est?? utilizando. Sin embargo, algunas de las opciones m??s comunes son usar un campo tipo varchar o char, usar un campo tipo int, usar una tabla de referencia y usar tipos de datos nativos de enum.

## Usando async/await: ??c??mo se puede aprovechar el paralelismo?:
El uso de async/await permite escribir c??digo as??ncrono de manera s??ncrona, lo que facilita la lectura y el mantenimiento del c??digo. Sin embargo, para aprovechar el paralelismo, es necesario utilizar otras t??cnicas adem??s de async/await. Algunas formas de aprovechar el paralelismo son:
Utilizar Promises.all(): Esta funci??n permite ejecutar varias promesas al mismo tiempo y devuelve una sola promesa con los resultados de todas las promesas. Esto permite que varias operaciones as??ncronas se ejecuten al mismo tiempo y se reduzca el tiempo de espera.
Utilizar m??dulos como "concurrently" o "npm-run-all": Estos m??dulos permiten ejecutar varios comandos de Node.js al mismo tiempo, lo que permite ejecutar varias tareas as??ncronas al mismo tiempo.
Utilizar la librer??a "worker_threads" de Node.js: Esta librer??a permite crear hilos de trabajo independientes en Node.js, lo que permite ejecutar varias tareas al mismo tiempo en diferentes hilos.
Utilizando "cluster" de Node.js : Es un m??dulo de Node.js que permite distribuir un proceso Node.js en varios procesadores o m??quinas.
En resumen, para aprovechar el paralelismo en c??digo as??ncrono utilizando async/await es necesario utilizar otras t??cnicas como Promises.all(), m??dulos como concurrently o npm-run-all, librer??as como worker_threads de Node.js y "cluster".
