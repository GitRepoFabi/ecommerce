function agregarAlCarrito(productId, carritoId) {
    
    console.log('Producto recibido:',productId);
    console.log('carritoId recibido:',carritoId);

    fetch(`/api/cartsbd/${carritoId}/products/${productId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}) 
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Producto agregado al carrito');
        } else {
            alert('Error al agregar al carrito');
        }
    })
    .catch(error => {
        console.log('Error:', error);
        alert('Hubo un problema con la solicitud');
    }); 
   
  }



