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
    }
}