import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
        flexDirection: 'column',
        backgroundColor: '#2121eb',
        border: '3px solid #EB6300',
        borderRadius: 7,
        textAlign: 'start',
        boxShadow: '1px 3px 7px 3px rgba(0, 0, 0, .3)',
    },
    title: {
        fontWeight: 'bold',
        margin: 10,
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
    },
    dataRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        borderBottom: '1px solid #B0B0B0',
        paddingBottom: 5,
        marginBottom: 5,
    },
    dataPair: {
        flexBasis: '48%',
        marginBottom: 5,
    },
    dataLabel: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    dataValue: {
        color: '#FFFFFF',
    },
    pageNumber: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        fontSize: 10,
    },
});

const MyDocument = ({ data }) => (
    <Document>
        <Page size="A3">
            <View style={styles.section}>
                <Text style={styles.title}>Listado de Reminders</Text>
                {data.map((reminder, index) => (
                    <View key={reminder.id} style={styles.dataRow}>
                        <View style={styles.dataPair}>
                            <Text style={styles.dataLabel}>ID: {reminder.id}</Text>
                            <Text style={styles.dataLabel}>Título: {reminder.title}</Text>
                            <Text style={styles.dataLabel}>Fecha de Inicio: {reminder.start_date}</Text>
                            <Text style={styles.dataLabel}>Fecha de Fin: {reminder.end_date}</Text>
                            <Text style={styles.dataLabel}>Hora de Inicio: {reminder.start_time}</Text>
                            <Text style={styles.dataLabel}>Hora de Fin: {reminder.end_time}</Text>
                            <Text style={styles.dataLabel}>Repetir: {reminder.repeat}</Text>
                            <Text style={styles.dataLabel}>Color de Fondo: {reminder.background_color}</Text>
                            <Text style={styles.dataLabel}>Asisstent ID: {reminder.user_id.id}</Text>
                            <Text style={styles.dataLabel}>Nombre de Asisstent: {reminder.user_id.name}</Text>
                            <Text style={styles.dataLabel}>Correo Electrónico: {reminder.user_id.email}</Text>
                            <Text style={styles.dataLabel}>Rol: {reminder.user_id.role}</Text>
                        </View>
                        {index < data.length - 1 && <View style={{ borderBottom: '1px solid #B0B0B0', width: '100%' }} />}
                    </View>
                ))}
                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `${pageNumber} / ${totalPages}`
                )} />
            </View>
        </Page>
    </Document>
);

export default MyDocument;