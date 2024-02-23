import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#F4F4F4',
        padding: 20,
        fontSize: 12,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
        flexDirection: 'column',
        backgroundColor: '#F1E2E2',
        border: '3px solid #EB6300',
        borderRadius: 7,
        textAlign: 'start',
        boxShadow: '1px 3px 7px 3px rgba(0, 0, 0, .3)',
    },
    label: {
        fontWeight: 'bold',
        margin: 10,
        color: '#000000',
    },
    dataRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        borderBottom: '1px solid #EB6300',
        paddingBottom: 10,
        marginBottom: 10,
    },
    dataPair: {
        flexBasis: '48%',
        marginBottom: 5,
    },
    dataLabel: {
        color: '#000000',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    pageNumber: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        fontSize: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        margin: 10,
        textAlign: 'center',
        color: '#000000',
    },
});

const CallRecordPDF = ({ data }) => (
    <Document>
        <Page size="A3">
            <View style={styles.section}>
                <Text style={styles.title}>Registro de Llamada</Text>
                {data.map((record, index) => (
                    <View key={index} style={styles.dataRow}>
                        <View style={styles.dataPair}>
                            <Text style={styles.dataLabel}>Fecha: {new Date(record.date).toLocaleDateString()}</Text>
                            <Text style={styles.dataLabel}>Hora: {record.time}</Text>
                            <Text style={styles.dataLabel}>Duración: {Math.floor(record.duration / 60)} minutos</Text>
                            <Text style={styles.dataLabel}>Tipo de Llamada: {record.call_type}</Text>
                            <Text style={styles.dataLabel}>Tipo: {record.call_kind}</Text>
                            <Text style={styles.dataLabel}>Turno: {record.turn}</Text>
                            <Text style={styles.dataLabel}>Llamada Contestada: {record.answered_call ? 'Sí' : 'No'}</Text>
                        </View>
                        <View style={styles.dataPair}>
                            <Text style={styles.dataLabel}>Observaciones: {record.observations}</Text>
                            <Text style={styles.dataLabel}>Descripción: {record.description}</Text>
                            <Text style={styles.dataLabel}>Contactado al 112: {record.contacted_112 ? 'Sí' : 'No'}</Text>
                            <Text style={styles.dataLabel}>Usuario: {record.user_id.name}</Text>
                        </View>
                        <View style={styles.dataPair}>
                            <Text style={styles.dataLabel}>Datos del Beneficiario:</Text>
                            <Text style={styles.dataLabel}>Nombre: {record.beneficiary_id.name}</Text>
                            <Text style={styles.dataLabel}>Primer Apellido: {record.beneficiary_id.first_surname}</Text>
                            <Text style={styles.dataLabel}>Segundo Apellido: {record.beneficiary_id.second_surname}</Text>
                            <Text style={styles.dataLabel}>Fecha de Nacimiento: {new Date(record.beneficiary_id.birth_date).toLocaleDateString()}</Text>
                            <Text style={styles.dataLabel}>DNI: {record.beneficiary_id.dni}</Text>
                            <Text style={styles.dataLabel}>Número de Seguridad Social: {record.beneficiary_id.social_security_number}</Text>
                            <Text style={styles.dataLabel}>Rutina: {record.beneficiary_id.rutine}</Text>
                            <Text style={styles.dataLabel}>Género: {record.beneficiary_id.gender}</Text>
                            <Text style={styles.dataLabel}>Estado Civil: {record.beneficiary_id.marital_status}</Text>
                            <Text style={styles.dataLabel}>Tipo de Beneficiario: {record.beneficiary_id.beneficiary_type}</Text>
                        </View>
                    </View>
                ))}
                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `${pageNumber} / ${totalPages}`
                )} />
            </View>
        </Page>
    </Document>
);

export default CallRecordPDF;


