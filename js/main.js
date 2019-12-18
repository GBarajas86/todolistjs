window.onload = todoList();

function todoList() {
   var tareas = document.querySelector('.tareas');
   var formulario = document.querySelector('.formulario');
   var introducir = document.querySelector('.formulario__introducir');

   formulario.addEventListener("submit",anadirTarea);

   function anadirTarea(evento){
       
       evento.preventDefault();

       var tarea = document.createElement("li");
       tarea.className = "tarea";
       tarea.append(crearNombreTarea());
       tarea.append(crearBotonEliminarTarea());
       tareas.prepend(tarea);
       tarea.addEventListener('click', gestionarTareas);
       guardarTareas();
       introducir.value = null;


   }

   function crearNombreTarea(){
    var nombreTarea = document.createElement("span");
    nombreTarea.className = "tarea__nombre";
    nombreTarea.textContent = introducir.value;
    return nombreTarea;
   }
   function crearBotonEliminarTarea(){
    var botonEliminar = document.createElement("span");
    botonEliminar.className = "tarea__eliminar";
    botonEliminar.textContent = "X";
    return botonEliminar;
   }

   function gestionarTareas(event){
       if (event.target.className == 'tarea__eliminar') {
           eliminarTarea(event.currentTarget);
       }else{
            actualizarEstadoTarea(event.currentTarget);
       }
   }

   function eliminarTarea(tarea){
    if(confirm("eliminar tarea: " + tarea.querySelector(".tarea__nombre").textContent + " ?")){
        tareas.removeChild(tarea);
    }

    guardarTareas();
   }

   function actualizarEstadoTarea(tarea){
        tarea.classList.add("tarea--completada");
        guardarTareas();
   }

   function guardarTareas(){
       var tareasGuardadas = [];
       var cantidadTareas = document.querySelectorAll(".tarea");
       cantidadTareas.forEach(function (tarea){
            tareasGuardadas.unshift({
                nombre: tarea.querySelector('.tarea__nombre').textContent,
                completado: tarea.classList.contains('tarea--completada')
            });   

       });

       localStorage.setItem('tareas', JSON.stringify(tareasGuardadas));
   }

   
}