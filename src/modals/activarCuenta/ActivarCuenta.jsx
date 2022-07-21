import { useEffect } from "react";
import { useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { getUser, updateUser } from "../../redux/actions/UserAction";

export default () => {
    const dispatch = useDispatch();
    let {visible, id} = useSelector(state => state.user);
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    useEffect(() => {
        setShow(!visible)
    }, [visible]);

    const handleHabilitarClick = () => {
        Swal.fire({
            icon: "question",
            title: "¿Estás seguro?",
            text: "Recuerda que si habilitas tu punto debe estar disponible para recibir paquetes.",
            confirmButtonText: "si, habilitar",
            showCancelButton: true,
            cancelButtonText: "Cancelar"
        }).then(res => {
            if(res.isConfirmed) {
                dispatch(updateUser({visible: true}));
                setShow(false);
                visible = false;
            }
        })
    }

    return (
        <>
            <Alert className={!visible ? "d-block m-3" : "d-none"} variant="danger">
                <h6 className="m-0">Punto deshabilitado, no recibirás envíos hasta habilitarlo nuevamente</h6>
            </Alert>
            <Modal
                show={show}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Cuenta inhabilitada</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Su cuenta es encuentra deshabilitada, para poder recibir paquetes presione "Habilitar"
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={handleHabilitarClick}>Habilitar</Button>
                </Modal.Footer>
            </Modal>  
        </>
    );
}