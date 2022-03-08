import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        textAlign: "center",
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    view: {
        // padding: 20,
        // height: 60,
        border: "1px solid gray",
        display: "flex",
        justifyContent: "space-between",
    },
    titulo: {
        fontSize: 28
    }
})

const Rotulo = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.view}>
                <Text style={styles.titulo}>
                    Texto Titular
                </Text>
                <Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, porro. Qui ratione ducimus eum eligendi explicabo soluta id aliquid iste.
                </Text>
            </View>
        </Page>
    </Document>
);

export default Rotulo;