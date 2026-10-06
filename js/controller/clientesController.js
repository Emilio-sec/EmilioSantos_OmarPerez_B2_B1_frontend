import { obtenerClientes, agregarCliente, eliminarCliente, obtenerCliente, editarCliente } from "../services/clientesService";

const formulario = document.getElementById("formulario");
const idCliente = document.getElementById("idCliente")
const nombre = document.getElementById("txtNombreCliente");
const apellido = document.getElementById("txtApellidoCliente");
const telefono = document.getElementById("TelefonoCliente")
const email = document.getElementById("txtEmailCliente")
const direccion = document.getElementById("txtDireccion")
const btnGuardar = document.getElementById("btnGuardar")
const btnCancelar = document.getElementById("btnCancelar")
const tabla = document.getElementById("tablaClientes")

async function mostrarClientes() {
    try{
        const clientes = await obtenerClientes()
        tabla.innerHTML = "";
        clientes.forEach((cliente)=>{
            tabla.innerHTML+=`
            <tr>
                <td>${cliente.id}</td>
                <td>${cliente.nombre}</td>
                <td>${cliente.apellido}</td>
                <td>${cliente.telefono}</td>
                <td><a href="mailto:${cliente.email}>${cliente.email}</a></td>
                <td>${cliente.direccion}</td>
            </tr>
            <button class= "bootstrap" onclick="eliminarCliente(${cliente.id})">Eliminar</button>
            <button class= "bootstrap" onclick="getFormData(${cliente.id})">Eliminar</button>
            `
        }) 
    } catch (error){
        alert("No se pudo cagar:"+ error)
    }
}

document.addEventListener("DOMContentLoaded", async function(){
    await mostrarClientes()});

formulario.addEventListener("submit", async function(e){
    e.preventDefault();
    const id = idCliente.value.trim();
    const nombre = nombre.value.trim();
    const apellido = apellido.value.trim();
    const telefono = telefono.value.trim();
    const email = email.value.trim();
    const direccion = email.value.trim();

    if (nombre == "" || apellido == "" || telefono == "" || email == "" || direccion == ""){
        alert("Debe llenar todos los campos")
        return;
    }

    const Cliente = {
        nombre : nombre,
        apellido : apellido,
        telefono : telefono,
        email : email, 
        direccion : direccion
    }

    try {
        if(id != ""){
            await editarCliente(id, Cliente);
            alert ("actualizado")
        }
        else {
            await agregarCliente(Cliente);
            alert("creado")
        }
    } catch (error) {
        alert ("ocurrio un error: "+ error)
    }

    limpiarFormulario();
    await mostrarClientes
})

function limpiarFormulario(){
    formulario.reset();

    idCliente.value = "";
    btnGuardar.textContent = "Guardar";
    btnCancelar.classList.add("d-none");
}

btnCancelar.addEventListener("click", limpiarFormulario);

async function eliminarCliente(id) {
    const confirmar = confirm("Desea eliminar?");

    if(!confirmar){
        return;
    }
    try {
        await eliminarCliente(id);
        alert("Eliminado");
        limpiarFormulario();
        await mostrarClientes();
    } catch (error) {
        alert ("Ocurrio un error: "+ error)
    }
}

async function colocarDatosFormulario(id) {
    try {
        const datos = await obtenerCliente(id);
        idCliente.value = datos.id_cliente;
        nombre.value = datos.nombre;
        apellido.value = datos.apellido;
        telefono.value = datos.telefono;
        email.value = datos.email;
        btnGuardar.textContent = "Actualizar";
        btnCancelar.classList.remove("d-none")

    } catch (error){
        alert("Error:"+ error)
    }
}

window.borrar = eliminarCliente;
window.colocarDatosFormulario = colocarDatosFormulario;