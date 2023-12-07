export default {
    recibir: {
        recibidoEnPunto: true,
        estado: "En oficina",
    },
    entregar: {
        entregadaDestinatario: true,
        estado: "Entregada destinatario"
    },
    pagar: {
        pagada: true
    },
    usuario: {
        recibir: {
            estado: "Recibido oficina",
            estadoFlexii: "Recibido oficina",
            seguimiento_finalizado: true
        },
        entregar: {
            estado: "Entregada destinatario",
            estadoFlexii: "Entregada destinatario",
            seguimiento_finalizado: true
        }
    },
    seguimientoUsuario: {
        datoEjemplo: {
            novedad: "Está presente cuando existe una novedad, si no hay simplemente se genera un string vacío",
            fechaMov: "La fecha en la que se efectuó dicho movimiento",
            observacion: "Algún detalle sobre el mmovimiento",
            descripcionMov: "Una descripción que otorga la transportadora al actualizar un estado",
            ubicacion: "El lugar en que se dió a cabo del movimiento (normalmente lo usa servientrega)",
            tipoMotivo: "el tipo de motivo por el cual se determina la novedad (usado por servientrega)"
        },
        recibir: {
            novedad: "",
            fechaMov: null, // Debería actualizarse luego
            observacion: "Notificación de recepción en la oficina",
            descripcionMov: "Recibido oficina",
            ubicacion: null,
            tipoMotivo: null
        },
        entregar: {
            novedad: "",
            fechaMov: null,
            observacion: "Notificación de entrega a destinatario",
            descripcionMov: "Entregada destinatario",
            ubicacion: null,
            tipoMotivo: null
        }
    }
}