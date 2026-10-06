const API_URL = "localhost:8080/api/eventos";

export async function obtenerEventos() {
    try{
        const respuesta = await fetch(API_URL);
        if(!respuesta.ok){
            throw new Error("Error al obtener el Evento");
        }

        const evento = await respuesta.json();
        return evento;
    } catch(error){
        console.error("Error al cargar");
        throw error;
    }
}

export async function agregarEvento(evento) {
    try{
        const respuesta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(evento)
        });
        if(!respuesta.ok) {
            throw new Error("Error al crear los eventos")
        }
        const nuevoEvento = await respuesta.json;
        return nuevoEvento;
    } catch (error) {
        console.error("Error al crear el evento"+ error)
        throw error; 
    }
}

export async function eliminarEvento(id) {
    try{
        const respuesta = await fetch (`${API_URL}/${id}`,{
            method: "DELETE"
        })
        if (!respuesta.ok){
            throw new Error("Error al eliminar el evento")
        }
        return true;
    } catch (error){
        console.error("Error al eliminar"+ error)
        throw error;
    }
}

export async function obtenerEvento(id) {
    try{
        const respuesta = await fetch(`${API_URL}/${id}`)
        if(!respuesta.ok){
            throw new Error("Error al obtener al evento")
        }
        const Evento = await  respuesta.json();
        return Evento;
    } catch (error){
        console.error("Error al cargar el evento");
        throw error;
    }
}

export async function editarEvento(id, Evento) {
    try{
        const answer = await fetch(`${API_URL}/${id}`,{
            method : "PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(Evento)
        })
        if(!answer.ok) {
            throw new Error("Error al actualizar el evento")
        }
        const eventoActualizado = await answer.json();
        return eventoActualizado;
    } catch (error) {
        console.error(error);
    }
}

export async function obtenerEstado() {
    const respuesta = await fetch(API_URL);
    if (!respuesta.ok){
        throw new Error("Error al obtener los estados")
        return respuesta.json();
    }
} 

export async function obtenerCliente() {
    const respuesta = await fetch (API_URL);
    if (!respuesta.ok){
        throw new Error("Error al obtener los clientes")
        return respuesta.json();
    }
}

export async function obtenerSalones() {
    const respuesta = await fetch (API_URL);
    if (!respuesta.ok){
        throw new Error("Error al obtener los clientes")
        return respuesta.json();
    }
}

