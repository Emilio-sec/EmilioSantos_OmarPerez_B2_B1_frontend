const API_URL = "";

export async function obtenerEventos() {
    try{
        const respuesta = await fetch(API_URL);
        if(!respuesta.ok){
            throw new Error("Error al obtener el cliente");
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
            body: JSON.stringify(persona)
        });
        if(!respuesta.ok) {
            throw new Error("Error al crear el cliente")
        }
        const nuevoCliente = await respuesta.json;
        return nuevoCliente;
    } catch (error) {
        console.error("Error al crear el cliente"+ error)
        throw error; 
    }
}

export async function eliminarCliente(id) {
    try{
        const respuesta = await fetch (`${API_URL}/${id}`,{
            method: "DELETE"
        })
        if (!respuesta.ok){
            throw new Error("Error al eliminar el cliente")
        }
        return true;
    } catch (error){
        console.error("Error al eliminar"+ error)
        throw error;
    }
}

export async function obtenerCliente(id) {
    try{
        const respuesta = await fetch(`${API_URL}/${id}`)
        if(!respuesta.ok){
            throw new Error("Error al obtener al cliente")
        }
        const cliente = await  respuesta.json();
        return cliente;
    } catch (error){
        console.error("Error mal crgaar a la persona");
        throw error;
    }
}

export async function editarCliente(id, cliente) {
    try{
        const answer = await fetch(`${API_URL}/${id}`,{
            method : "PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(cliente)
        })
        if(!answer.ok) {
            throw new Error("Error al actualizar la persona")
        }
        const clienteActualizado = await answer.json();
        return clienteActualizado;
    } catch (error) {
        console.error(error);
    }
}