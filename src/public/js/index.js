const socket = io();

 // Recibir los productos desde el servidor
 socket.on('productos', (productos) => {
    const listaProductos = document.getElementById('productos-lista');
    
    productos.forEach(producto => {
        const item = document.createElement('li');
        item.textContent = `Title: ${producto.title} - Description: ${producto.description} - Price: $${producto.price} - Stock: ${producto.stock} `;

        // Crear el botón de eliminar
        const eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'Eliminar';
        eliminarBtn.addEventListener('click', () => {
            // Emitir el evento de eliminación al servidor con el id del producto
            socket.emit('eliminarProducto', producto.id);
        });
      // Añadir el botón al item del producto
      item.appendChild(eliminarBtn);
      listaProductos.appendChild(item);
    });
  });

// Escuchamos el evento submit que se envía desde el formulario  
const formulario = document.getElementById('formulario');

formulario.addEventListener('submit', () => {
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const code = document.getElementById('code');
    const price = document.getElementById('price');
    const stock = document.getElementById('stock');
    const category = document.getElementById('category');
    const status = document.getElementById('status');

    const nuevoProducto = {
        title: title.value,
        description: description.value,
        code: code.value,
        price: price.value,
        stock: stock.value,
        category: category.value,
        status: status.checked
    };

    socket.emit('agregarUnProducto', nuevoProducto); // Enviamos el producto al servidor para procesarlo
});

//Actualiza los productos de la vista en tiempo real
socket.on('actualizarProductos', (productos) => {
    const listaProductos = document.getElementById('productos-lista');
    
    listaProductos.innerHTML = ''

    productos.forEach(producto => {
      const item = document.createElement('li');
      item.textContent = `Title: ${producto.title} - Description: ${producto.description} - Price: $${producto.price} - Stock: ${producto.stock} `;
      
      // Crear el botón de eliminar
      const eliminarBtn = document.createElement('button');
      eliminarBtn.textContent = 'Eliminar';
      eliminarBtn.addEventListener('click', () => {
        socket.emit('eliminarProducto', producto.id); // Emitir el evento de eliminación al servidor
      });      
      
      item.appendChild(eliminarBtn);     
      listaProductos.appendChild(item);
    });
});