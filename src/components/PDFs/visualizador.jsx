
import { PDFViewer } from "@react-pdf/renderer";
import { Nav } from "react-bootstrap";
import Rotulo from "./rotulos";
import { useState } from "react";

const VisualizadorPdf = () => {
    const [visor, setVisor] = useState("");

    return (
        <div>
            <Nav variant="pills"
                className="flex-nowrap overflow-auto" defaultActiveKey=""
            >
                <Nav.Item>
                <Nav.Link eventKey="" className="text-mutted" onClick={() => setVisor("")}>Ejemplo rotulo</Nav.Link>
                </Nav.Item>
            </Nav>

            <div style={{
                width: "100%",
                height: "100vh"
            }}>
                {
                    visor === "" &&
                    <PDFViewer width="100%" height="90%">
                        <Rotulo />
                    </PDFViewer>
                }
            </div>


        </div>
    )
}

export default VisualizadorPdf