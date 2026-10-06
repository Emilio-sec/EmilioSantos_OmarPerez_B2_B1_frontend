const API_URL = "localhost:8080/api/salones";

export async function obtenerSalones() {
    try{
        const respuesta = await fetch(API_URL);
        if(!respuesta.ok){
            throw new Error("Error al obtener los salones");
        }

        const salon = await respuesta.json();
        return salon;
    } catch(error){
        console.error("Error al cargar");
        throw error;
    }
}

export async function agregarSalon(salon) {
    try{
        const respuesta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(salon)
        });
        if(!respuesta.ok) {
            throw new Error("Error al crear el evento")
        }
        const nuevoSalon = await respuesta.json;
        return nuevoSalon;
    } catch (error) {
        console.error("Error al crear el evento"+ error)
        throw error; 
    }
}

export async function eliminarSalon(id) {
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

export async function obtenerSalon(id) {
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

