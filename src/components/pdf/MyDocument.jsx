import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Define styles for the document
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#F4F4F4',
        padding: 20,
        fontSize: 12,
    },

    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        color: '#333333',
    },

    section: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column', // Cambia la dirección del flujo a column
        margin: 10,
        padding: 10,
        backgroundColor: '#2121eb',
        border: '1px solid #CCCCCC',
        borderRadius: 8,
    },
    label: {
        fontWeight: 'bold',
        margin: 10,
        color: '#FFFFFF'
        
    },
    input: {
        margin: 10,
        border: '1px solid #B0B0B0',
        borderRadius: 4,
        width: '200px',
        textAlign: 'center',
        padding: '10px',
        color: '#FFFFFF'
    },

    buttonContainer: {
        color: '#2121eb',
        textAlign: 'center',
        marginTop: 20, // Ajusta el margen superior según tus necesidades
        width: '100px',

    },
    button: {
        backgroundColor: '#2121eb',
        color: '#FFFFFF',
        padding: '10px',
        margin: '5px',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
        width: '60px',
        textAlign:'justify'
    },
    pageNumber: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        fontSize: 10,
    },
});

// Create Document Component
const MyDocument = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.center}>
                <View style={styles.section}>
                    <Text style={styles.label}>Nombre Completo:</Text>
                    <Text style={styles.input}>John Doe</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.input}>john.doe@example.com</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Rol:</Text>
                    <Text style={styles.input}>Asistente</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Contraseña:</Text>
                    <Text style={styles.input}>********</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Confirmar Contraseña:</Text>
                    <Text style={styles.input}>********</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Número de Teléfono:</Text>
                    <Text style={styles.input}>123-456-7890</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Text style={styles.button}>Guardar</Text>
                </View>
                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `${pageNumber} / ${totalPages}`
                )} />
            </View>
        </Page>
    </Document>
);

export default MyDocument;
