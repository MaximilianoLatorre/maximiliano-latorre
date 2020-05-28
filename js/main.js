const grid = new Muuri('.grid', {
    layout: {
        rounding: false
    }
});

window.addEventListener('load', () => {
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('imagenes-cargadas');

    // Agregamos los listener de los enlaces para filtrar por categoria
    const enlaces = document.querySelectorAll('#categorias a'); /**guardo un array con los enlaces */
    enlaces.forEach((elemento) => {
        /**recorro el array y pongo a cada enlace a la escucha del evento 'click' */
        elemento.addEventListener('click', (evento) => {
            evento.preventDefault(); /**previene el comportamiento x defecto de los enlaces, evita q recargue la pagina */
            enlaces.forEach((enlace) => enlace.classList.remove('activo')); /**recorro los enlaces y remuevo la clase 'activo' a todos */
            evento.target.classList.add('activo'); /**le agrego la clase 'activo' al elemento clickeado */

            const categoria = evento.target.innerHTML.toLowerCase(); /**guardo elcontenido html del enlace clickeado */
            categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);
        });
    });


    //Agregamos el listener para la barra de busqueda
    document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {
        const busqueda = evento.target.value;
        grid.filter((item) => item.getElement().dataset.etiquetas.includes(busqueda));
    });

    //Agregamos listener para las imagenes
    const overlay = document.getElementById('overlay');
    document.querySelectorAll('.grid .item img').forEach((elemento) => {

        elemento.addEventListener('click', () => {
            const ruta = elemento.getAttribute('src');
            const src1 = elemento.parentNode.parentNode.dataset.src2;

            //const descripcion = elemento.parentNode.parentNode.dataset.descripcion;

            overlay.classList.add('activo');
            document.querySelector('#overlay #img1').src = ruta;
            document.querySelector('#overlay #img2').src = src1;
            //document.querySelector('#overlay .descripcion').innerHTML = descripcion;
        });
    });

    //Listener del boton cerrar
    document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
        overlay.classList.remove('activo');
    });

    //Listener cerrar overlay
    overlay.addEventListener('click', (evento) => {
        evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
    });
    
});