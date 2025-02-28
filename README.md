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

<h2> Entrega final – Comisión 72840 – Programación Backend I: Desarrollo Avanzado de Backend - Coderhouse </h2>

<h3>Consigna del entrega:</h3>

<p>
  Configurar nuestro proyecto para que trabaje con MongoDB como capa de persistencia de datos. Además, se deben incluir algunos endpoint nuevos a la API ya existente.
</p>

<h3> Aspectos a incluir </h3>

<h4> Objetivos generales: </h4>

<p>
Contaremos con MongoDB como sistema de persistencia principal y tendremos todos los endpoint definidos para poder trabajar con productos y carritos apuntando a dicha BD.
</p>

<h4> Objetivos específicos: </h4>

<p>
Profesionalizar las consultas de productos con filtros, paginación y ordenamiento. <br/>
Profesionalizar la gestión de carrito para implementar los últimos conceptos vistos en las clases.
</p>

<h3>Sección Productos:</h3>

<h3>Obtener todos los productos con filtros opcionales:</h3>
<p>URL: <a href="http://localhost:8080/api/productsdb/">http://localhost:8080/api/productsdb/:limit?/:page?/:filtro?/:orden?</a></p>
<p>El objetivo de la misma es mostrar todos los productos que están en la BD y si se le pasa los parámetros opcionales realizar diferentes filtros.
<br/><br/>

- limit: Permitirá devolver sólo el número de elementos solicitados al momento de la petición, en caso de no recibir limit, éste será de 10.
- page : Permitirá devolver la página que queremos buscar, en caso de no recibir page, ésta será de 1.
- filtro: El tipo de elemento que quiero buscar (es decir, qué filtro aplicar), en caso de no recibir query, realizar la búsqueda general.
	  Ej de filtro: title:Billetera
- Orden: Para realizar ordenamiento ascendente o descendente por precio, en caso de no recibir sort, se realiza el ordenamiento por ascendente
	 Opciones de orden: asc/desc

</p>

<h4> Ejecución sin filtro:</h4>

![image](https://github.com/user-attachments/assets/1a07f956-98ec-42f2-881c-60cf2b43326b)

<p>Como notamos, ordena los precios del menor al mayor</p>

<h4> Ejecución con filtro de límite:</h4>

![image](https://github.com/user-attachments/assets/01b4a31c-8097-4223-be89-bb52756f95f4)

<h4> Ejecución con filtro de página:</h4>

![image](https://github.com/user-attachments/assets/a7285e77-8748-495f-992d-a5907a701cba)

<p>En este caso trajo el elemento Televisión que está en la tercer página</p>

<h4> Ejecución con filtro de atributo:</h4>

![image](https://github.com/user-attachments/assets/c4ef8d6f-de19-4488-b5b3-2c69266bcdeb)

<p>En este caso trajo el elemento Billetera que fue el que se le pasó por parámetro como se puede apreciar</p>

<h4> Ejecución con filtro de ordenamiento:</h4>

![image](https://github.com/user-attachments/assets/fb3c8b36-0056-4d2f-8ffe-23637f126c33)

<p>Como se puede observar, se ordenan los elementos por precio descendiente (es decir, del precio más alto al más bajo). </p>

<p>Ejemplo que devuelve el objeto producto si hacemos la petición a <strong> http://localhost:8080/api/productsdb </strong>:
<br/><br/>
<strong>
{
  docs: [
    {
      _id: new ObjectId('67bb7a6200975dd4322485db'),
      title: 'Billetera',
      description: 'billetera',
      code: 5214,
      price: 1200,
      stock: 10,
      category: 'Billetera',
      status: true,
      thumbnails: [],
      __v: 0,
      id: '67bb7a6200975dd4322485db'
    },
    {
      _id: new ObjectId('67bb7a9afb0f8270c57240cd'),
      title: 'Mesa de luz',
      description: 'Mesa marrón',
      code: 5221,
      price: 1500,
      stock: 10,
      category: 'Muebles',
      status: true,
      thumbnails: [],
      __v: 0,
      id: '67bb7a9afb0f8270c57240cd'
    },
    {
      _id: new ObjectId('67bb7a65fb0f8270c57240c9'),
      title: 'Televisión',
      description: "Televisión 24'",
      code: 52114,
      price: 6000,
      stock: 10,
      category: 'TV',
      status: true,
      thumbnails: [],
      __v: 0,
      id: '67bb7a65fb0f8270c57240c9'
    },
    {
      _id: new ObjectId('67bb7adffb0f8270c57240d1'),
      title: 'Lavarropas',
      description: 'Lavarropas Panavox',
      code: 265487,
      price: 7500,
      stock: 10,
      category: 'Electrodomestico',
      status: true,
      thumbnails: [],
      __v: 0,
      id: '67bb7adffb0f8270c57240d1'
    },
    {
      _id: new ObjectId('67bb7ab4fb0f8270c57240cf'),
      title: 'Cama',
      description: 'Cama grande',
      code: 52124,
      price: 10000,
      stock: 10,
      category: 'Muebles',
      status: true,
      thumbnails: [],
      __v: 0,
      id: '67bb7ab4fb0f8270c57240cf'
    },
    {
      _id: new ObjectId('67bb7afdfb0f8270c57240d3'),
      title: 'Pileta',
      description: 'Pileta Baño',
      code: 487527,
      price: 12000,
      stock: 10,
      category: 'Baño',
      status: true,
      thumbnails: [],
      __v: 0,
      id: '67bb7afdfb0f8270c57240d3'
    },
    {
      _id: new ObjectId('67bb7a83fb0f8270c57240cb'),
      title: 'Ropero',
      description: 'Ropero Modular',
      code: 2315,
      price: 14000,
      stock: 10,
      category: 'Muebles',
      status: true,
      thumbnails: [],
      __v: 0,
      id: '67bb7a83fb0f8270c57240cb'
    },
    {
      _id: new ObjectId('67b46e8cb3dd9fb3c7b5fe30'),
      title: 'Sillón',
      description: 'Redondo 14',
      code: 8754477,
      price: 40000,
      stock: 100,
      category: 'Sillón',
      status: true,
      thumbnails: [],
      __v: 0,
      id: '67b46e8cb3dd9fb3c7b5fe30'
    },
    {
      _id: new ObjectId('67ba396822c6359d10d64877'),
      title: 'Celular',
      description: 'Iphone 14',
      code: 2548,
      price: 45000,
      stock: 10,
      category: 'Celular',
      status: true,
      thumbnails: [],
      __v: 0,
      id: '67ba396822c6359d10d64877'
    }
  ],
  totalDocs: 9,
  limit: 10,
  totalPages: 1,
  page: 1,
  pagingCounter: 1,
  hasPrevPage: false,
  hasNextPage: false,
  prevPage: null,
  nextPage: null,
  prevLink: '',
  nextLink: '',
  isValid: true
}

</strong>

<h3>Sección Carrito:</h3>

<h3>Borrar producto del carrito enviado:</h3>
<p>URL: <a href="http://localhost:8080/api/cartsbd/67bca014b079597023a904a1/products/67b46e8cb3dd9fb3c7b5fe30">http://localhost:8080/api/cartsbd/67bca014b079597023a904a1/products/67b46e8cb3dd9fb3c7b5fe30</a></p>
<p>El objetivo del mismo es eliminar el producto enviado en el carrito elegido. El endpoint recibe primero el ID del carrito y luego el producto a eliminar de dicho carrito.

En este ejemplo 67bca014b079597023a904a1 es el ID del carrito y el 67b46e8cb3dd9fb3c7b5fe30 es el ID del producto a eliminar del carrito

<h3> Ejecución:</h3>

Si consultamos antes el carrito veremos lo siguiente:

![image](https://github.com/user-attachments/assets/685b6f96-344a-4d7a-8a84-43506e8ee854)

Si ahora ejecutamos el endpoint de eliminación, la API nos responderá de la siguiente manera:

![image](https://github.com/user-attachments/assets/e7ab404b-cfe8-45cc-9289-672cd379d4cd)

Si consultamos nuevamente el carrito veremos que ya no existe más el producto:

![image](https://github.com/user-attachments/assets/474cbb68-ffe3-4e3b-bbd8-1680f9d354f4)

</p>

<h3>Actualización de carrito con un arreglo de productos enviados por parámetros:</h3>
<p>URL: <a href="http://localhost:8080/api/cartsbd/67bca014b079597023a904a1">http://localhost:8080/api/cartsbd/67bca014b079597023a904a1</a></p>
<p>El objetivo del mismo es actualizar los productos del carrito seleccionado. El endpoint recibe el ID del carrito que se quiere actualizar.
El formato del body que se tiene que pasar es el siguiente:

![image](https://github.com/user-attachments/assets/a658a1f3-23d7-487c-a4ed-fe3bc1efea21)

{
  "products": [
    { "idProducto": "67ba396822c6359d10d64877", "quantity": 1 }
  ]
}

El ID del producto lo podremos saber con la información que está más arriba o accediendo a la BD a la colección de products:

![image](https://github.com/user-attachments/assets/745588f4-5c4d-42ad-9e35-c2c8f9120bfe)

En este caso, agregaremos el producto "Celular" al carrito que venimos trabajando.

Para esto, ejecutamos el endpoint de la siguiente manera:

![image](https://github.com/user-attachments/assets/a658a1f3-23d7-487c-a4ed-fe3bc1efea21)

El mismo nos devuelve la siguiente salida:

![image](https://github.com/user-attachments/assets/8e4a61d0-97a1-4cac-b891-25d8ceb83e4e)

Si consultamos el carrito nuevamente veremos que se agregó correctamente el producto "Celular":

![image](https://github.com/user-attachments/assets/a1b96c32-9ea7-4b1b-a2da-bfc5934bd2cb)

</p>

<h3>Actualización de la cantidad de ejemplares del producto de un carrito:</h3>
<p>URL: <a href="http://localhost:8080/api/cartsbd/67bca014b079597023a904a1/products/67b46e8cb3dd9fb3c7b5fe30">http://localhost:8080/api/cartsbd/67bca014b079597023a904a1/products/67b46e8cb3dd9fb3c7b5fe30</a></p>
<p>El objetivo del mismo es actualizar la cantidad de ejemplares del producto enviado en el carrito seleccionado. El endpoint recibe el ID del carrito y producto en el que se le quiere actualizar la cantidad.

El formato del body que se tiene que pasar es el siguiente:

![image](https://github.com/user-attachments/assets/050602cf-7351-452a-94db-c64a508d3d06)

{
    "quantity":2
}

En este caso, actualizaremos la cantidad de ejemplares del producto "Celular" que anteriormente tenía 3 y ahora tendrá 2.

Para esto, ejecutamos el endpoint de la siguiente manera:

![image](https://github.com/user-attachments/assets/342f8ff3-32a4-4ebc-9d78-9d46d7916751)

El mismo nos devuelve la siguiente salida:

![image](https://github.com/user-attachments/assets/d06b9866-9f8e-4cd4-b7bb-9422a999a3eb)

Si consultamos el carrito nuevamente, veremos que se actualizó correctamente la cantidad de elementos del producto "Celular":

![image](https://github.com/user-attachments/assets/fa0acabe-744b-4b34-92fd-7400ac90a9e5)

</p>

<h3>Borrar todos los productos del carrito:</h3>
<p>URL: <a href="http://localhost:8080/api/cartsbd/67bca014b079597023a904a1">http://localhost:8080/api/cartsbd/67bca014b079597023a904a1</a></p>
<p>El objetivo del mismo es borrar todos los productos de un carrito. El endpoint recibe el ID del carrito al que se le quiere dejar vacìo.

Para esto, ejecutamos el endpoint de la siguiente manera:

![image](https://github.com/user-attachments/assets/8ed09459-c7e0-4cdc-9413-30bcb74d2523)

El mismo nos devuelve la siguiente salida:

![image](https://github.com/user-attachments/assets/3ac692da-41ba-4ab5-8d7f-caa306b7b4bc)

Si consultamos el carrito nuevamente, veremos que ahora el mismo quedó vacío sin productos:

![image](https://github.com/user-attachments/assets/ac5d9654-598b-41ad-987e-3e9a5075d1a1)

</p>

<h3>Vista de productos:</h3>
<p>URL: <a href="http://localhost:8080/api/productsdb">http://localhost:8080/api/productsdb</a></p>
<p> 

Se modificó la vista de productos para que traiga todos los productos ingresados desde la BD de MongoDB con su respectiva información.

![image](https://github.com/user-attachments/assets/0c8d0ea0-a927-4ca8-9ce4-117453a7e8fb)

Como se puede apreciar, por cada producto podemos añadir al carrito para poder comprar dicho elemento.

</p>
