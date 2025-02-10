<h1>
  Primera pre-entrega – Comisión 72840 – Programación Backend I: Desarrollo Avanzado de Backend - Coderhouse
</h1>

<h3>Consigna del proyecto:</h3>

<p>
  Se desarrollará un servidor que contenga los endpoint y servicios necesarios para gestionar los productos y carritos de compras de un e-commerce.
  Desarrollar el servidor basado en Node.JS y express, que escuche en el puerto 8080 y disponga de dos grupos de rutas: /products y /carts. 
 
  Dichos endpoints estarán implementados con el router de express.

  La persistencia de la información se implementará utilizando el file system, donde los archivos “productos.json”  y “carrito.json”, respaldan la información.
</p>

<h3>Sección Productos:</h3>

<h3>Obtener todos los productos:</h3>
<p>URL Endpoint: <a href="http://localhost:8080/api/products">http://localhost:8080/api/products</a></p>
<p>El objetivo del mismo es listar todos los productos que se vayan agregando al archivo</p>
<h3>Ejecución:</h3>
<img src="https://github.com/user-attachments/assets/bf37e7b3-637f-48de-9995-24b9b1ad9313" />
<p>Los productos que se muestran aquí son los que se persisten en el archivo "products.json":</p>

![image](https://github.com/user-attachments/assets/bf2486f4-a638-4581-a671-e302a5d76395)


<h3>Obtener un producto:</h3>
<p>URL Endpoint: <a href="http://localhost:8080/api/products/1">http://localhost:8080/api/products/1</a></p>
<p>El objetivo del mismo es listar el producto que se le pase por parámetro, en este ejemplo en la URL donde dice 1 debería ir el Id del producto que se quiera consultar.</p>
<h3>Ejecución:</h3>
<img src="https://github.com/user-attachments/assets/f2ea44d4-1da8-45d0-b8db-d2012f1be348" />

<h3>Crear un producto:</h3>
<p>URL Endpoint: <a href="http://localhost:8080/api/products">http://localhost:8080/api/products</a></p>
<p>El objetivo del mismo es crear un nuevo producto, para crear el mismo se deberá pasar los siguientes parámetros:
<ul>
    <li>titulo</li>
    <li>descripción</li>
    <li>codigo</li>
    <li>precio</li>
    <li>stock</li>
    <li>categoria</li>
  </ul>
</p>
<h3>Ejecución:</h3>
<img src="https://github.com/user-attachments/assets/24a41fc1-4498-47a6-a93d-aed909d4e976" />

<h3>Editar un producto:</h3>
<p>URL Endpoint: <a href="http://localhost:8080/api/products/2">http://localhost:8080/api/products/2</a></p>

<p>El objetivo del mismo es editar el producto que se le pase por parámetro, en este ejemplo en la URL donde dice 2 debería ir el Id del producto que se quiera editar.</p>
<p>Para editar el mismo se deberán pasar los siguientes parámetros:</p>
<ul>
    <li>Titulo</li>
    <li>Descripción</li>
    <li>Codigo</li>
    <li>Precio</li>
    <li>Stock</li>
    <li>Categoria</li>
  </ul>
</p>
<h3>Ejecución:</h3>

![image](https://github.com/user-attachments/assets/b095bf6c-eb28-4ba5-b39d-e3dc97eec915)
<p> En este caso se edita el título del producto. </p>

<h3>Eliminar un producto:</h3>
<p>URL Endpoint: <a href="http://localhost:8080/api/products/2">http://localhost:8080/api/products/2</a></p>
<p>El objetivo del mismo es eliminar el producto que se le pase por parámetro, en este ejemplo en la URL donde dice 2 debería ir el Id del producto que se quiera eliminar.</p>
<h3>Ejecución:</h3>

![image](https://github.com/user-attachments/assets/5f126be2-4048-4c76-af82-3793d70f5640)

<p> En este caso se elimina el producto 2 que era <strong>celular</strong>. </p>

<h3>Sección Carrito:</h3>

<h3>Crear un carrito:</h3>
<p>URL Endpoint: <a href="http://localhost:8080/api/carts">http://localhost:8080/api/carts</a></p>
<p>El objetivo del mismo es crear un nuevo carrito. Cuando se crea automáticamente, se crea con un Id autogenerado y con un array de productos vacíos.
<h3>Ejecución:</h3>

![image](https://github.com/user-attachments/assets/2650aed7-7480-4ad8-b881-32148d6cfc68)

<h3>Obtener los productos de un carrito:</h3>
<p>URL Endpoint: <a href="http://localhost:8080/api/carts/1">http://localhost:8080/api/carts/1</a></p>
<p>El objetivo del mismo es consultar los productos que contiene el carrito que se pasó por parámetro. En este caso se quiere consultar los productos del carrito 1.
<h3>Ejecución:</h3>
  
![image](https://github.com/user-attachments/assets/743c5834-d21f-4995-a8c5-25e35ac06798)

<h3>Agregar un producto al carrito deseado:</h3>
<p>URL Endpoint: <a href="http://localhost:8080/api/carts/1/products/1">http://localhost:8080/api/carts/1/products/1</a></p>
<p>El objetivo del mismo es agregar un producto al carrito deseado.
  El primer parámetro que se le pasa es el id del carrito creado y el segundo parámetro el producto que se quiera agregar al mismo.
<h3>Ejecución:</h3>
  
![image](https://github.com/user-attachments/assets/d1032b92-9339-47cc-82cd-0c1f21080426)

<h2> Segunda pre-entrega – Comisión 72840 – Programación Backend I: Desarrollo Avanzado de Backend - Coderhouse </h2>

<h3>Consigna del entrega:</h3>

<p>
  Configurar nuestro proyecto para que trabaje con Handlebars y websocket.
</p>

<h3> Aspectos a incluir </h3>
<p>
Configurar el servidor para integrar el motor de plantillas Handlebars e instalar un servidor de socket.io al mismo.

Crear una vista “home.handlebars” la cual contenga una lista de todos los productos agregados hasta el momento

Además, crear una vista “realTimeProducts.handlebars”, la cual vivirá en el endpoint “/realtimeproducts” en nuestro views router, ésta contendrá la misma lista de productos, sin embargo, ésta trabajará con websockets.

Al trabajar con websockets, cada vez que creemos un producto nuevo, o bien cada vez que eliminemos un producto, se debe actualizar automáticamente en dicha vista la lista.

Además, debíamos realizar las correcciones indicadas por el docente referido a la primer pre-entrega. </p>

<h3>Página Productos con Handlebars:</h3>
<p>URL: <a href="http://localhost:8080/">http://localhost:8080</a></p>
<p>El objetivo de la misma es mostrar todos los productos que están en el archivo 'productos.json'</p>

![image](https://github.com/user-attachments/assets/20fc1bf2-68da-4230-8b00-38ef32f78b41)

<p>Como se ve en la imágen esto es lo que despiega, si vamos al archivo 'productos.json' veremos lo siguiente: </p>

![image](https://github.com/user-attachments/assets/e49820b7-221c-4b9d-911f-d09b11aac13f)

<h3>Página Productos con Websocket:</h3>
<p>URL: <a href="http://localhost:8080/realtimeproducts">http://localhost:8080/realtimeproducts</a></p>
<p>El objetivo de la misma es mostrar todos los productos que están en el archivo 'productos.json pero esta vez utilizando la tecnología Websocket.

  También dicha información la extrae del archivo 'productos.json'.

  Adicional a esto, la página posee un formulario donde si se quiere se puede crear un nuevo producto.
</p>

![image](https://github.com/user-attachments/assets/ae39c59f-d4c2-4870-b1ab-ac13c174639a)

<p>Como se ve en la imágen esto es lo que despiega, si vamos al archivo 'productos.json' veremos lo siguiente: </p>

![image](https://github.com/user-attachments/assets/e49820b7-221c-4b9d-911f-d09b11aac13f)

Si agregamos un nuevo producto lo veremos reflejado inmediatamente en nuestra pantalla:

ANTES:

![image](https://github.com/user-attachments/assets/462774a2-9f52-4846-b03b-1e21d364c71c)

DESPUES:
![image](https://github.com/user-attachments/assets/8ff0c5ab-fd8f-4889-9b06-c642abc48ab6)

También podemos corroborar que en el archivo 'Productos.json' se agregó correctamente dicho registro:

![image](https://github.com/user-attachments/assets/36e5b5ac-44cb-43c5-9b83-5b9ea7430b66)

Si se quiere eliminar el producto recién creado por ej clickeamos sobre el botón "Eliminar" y procederá con su eliminación:

![image](https://github.com/user-attachments/assets/2b6dc0d3-b216-419a-8fae-b247c3f97f96)

Archivo 'Productos.json':

![image](https://github.com/user-attachments/assets/eb0a8936-17bb-4480-8e6e-436f66040a2f)



