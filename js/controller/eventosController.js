import { obtenerEventos, agregarEvento, eliminarEvento, editarEvento, obtenerEvento, obtenerCliente, obtenerEstado, obtenerSalones } from "/services/eventosService";

const formulario = document.getElementById("formulario");
const idEvento = document.getElementById("idEvento")
const nombre_evento = document.getElementById("txtNombreEvento");
const fecha_evento = document.getElementById("Fecha");
const cantidad_personas = document.getElementById("CantidadPersonas")
const cantidad_horas = document.getElementById("CantidadHoras")
const estado = document.getElementById("txtEstado")
const total_pago = document.getElementById("TotalPago")
const cliente = document.getElementById("txtCliente")
const salones = document.getElementById("txtSalones")
const btnCancelar = document.getElementById("btnCancelar")
const tabla = document.getElementById("tablaEventos")

async function mostrarEventos() {
    try{
        const eventos = await obtenerEventos()
        tabla.innerHTML = "";
        eventos.forEach((evento)=>{
            tabla.innerHTML+=`
            <tr>
                <td>${evento.id}</td>
                <td>${evento.nombre}</td>
                <td>${evento.apellido}</td>
                <td>${evento.telefono}</td>
                <td><a href="mailto:${evento.email}>${evento.email}</a></td>
                <td>${evento.direccion}</td>
            </tr>
            <button class= "bootstrap" onclick="eliminarEvento(${evento.id})">Eliminar</button>
            <button class= "bootstrap" onclick="getFormData(${evento.id})">Actualizar</button>
            `
        }) 
    } catch (error){
        alert("No se pudo cargar:"+ error)
    }
}

document.addEventListener("DOMContentLoaded", async function(){
    await mostrarEventos()});

formulario.addEventListener("submit", async function(e){
    e.preventDefault();
    const id = idEvento.value.trim();
    const nombre_evento = nombre_evento.value.trim();
    const fecha_evento = fecha_evento.value.trim();
    const cantidad_personas = cantidad_personas.value.trim();
    const cantidad_horas = cantidad_horas.value.trim();
    const estado = estado.value.trim();
    const total_pago = total_pago.value.trim();
    const cliente = cliente.value.trim();
    const salones = salones.value.trim();

    if (nombre_evento == "" || fecha_evento == "" || cantidad_horas == "" || cantidad_personas == "" || estado == "" || total_pago == "" || cliente == "" || salones == ""){
        alert("Debe llenar todos los campos")
        return;
    }

    const Evento = {
        nombre_evento : nombre_evento,
        fecha_evento : fecha_evento,
        cantidad_personas : cantidad_personas,
        cantidad_horas : cantidad_horas, 
        estado : estado,
        total_pago : total_pago,
        cliente : cliente,
        salones : salones
    }

    try {
        if(id != ""){
            await editarEvento(id, Evento);
            alert ("actualizado")
        }
        else {
            await agregarEvento(Evento);
            alert("creado")
        }
    } catch (error) {
        alert ("ocurrio un error: "+ error)
    }

    limpiarFormulario();
    await mostrarEventos
})

function limpiarFormulario(){
    formulario.reset();

    idEvento.value = "";
    btnGuardar.textContent = "Guardar";
    btnCancelar.classList.add("d-none");
}

btnCancelar.addEventListener("click", limpiarFormulario);

async function eliminarevento(id) {
    const confirmar = confirm("Desea eliminar?");

    if(!confirmar){
        return;
    }
    try {
        await eliminarEvento(id);
        alert("Eliminado");
        limpiarFormulario();
        await mostrarEventos();
    } catch (error) {
        alert ("Ocurrio un error: "+ error)
    }
}

async function colocarDatosFormulario(id) {
    try {
        const datos = await obtenerCliente(id);
        idEvento.value = datos.id_evento;
        nombre_evento.value = datos.nombre_evento;
        fecha_evento.value = datos.fecha_evento;
        cantidad_personas.value = datos.cantidad_personas;
        cantidad_horas.value = datos.cantidad_horas;
        estado.value = datos.estado;
        total_pago.value = datos.total_pago;
        cliente.value = datos.cliente;
        salones.value = datos.salones;
        btnGuardar.textContent = "Actualizar";
        btnCancelar.classList.remove("d-none")

    } catch (error){
        alert("Error:"+ error)
    }
}

async function cargarEstados() {
    try {
        const estados = await obtenerEstado();
        select.innerHTML = `<option value =""> seleccione un estado </option>`

        estados.forEach(e=>{
            const option = document.createElement("option");
            option.value = e.id;
            option.textContent = e.nombre;
            select.appendChild(option);
        })
    } catch (error) {
        console.error(error);
    }
}

async function cargarClientes() {
    try {
        const clientes = await obtenerCliente();
        select.innerHTML = `<option value =""> seleccione un cliente </option>`

        estados.forEach(c=>{
            const option = document.createElement("option");
            option.value = c.id;
            option.textContent = c.nombre;
            select.appendChild(option);
        })
    } catch (error) {
        console.error(error);
    }
}

async function cargarSalones() {
    try {
        const salones = await obtenerSalones();
        select.innerHTML = `<option value =""> seleccione un salon </option>`

        estados.forEach(s=>{
            const option = document.createElement("option");
            option.value = s.id;
            option.textContent = s.nombre;
            select.appendChild(option);
        })
    } catch (error) {
        console.error(error);
    }
}



window.borrar = eliminarevento;
window.colocarDatosFormulario = colocarDatosFormulario;