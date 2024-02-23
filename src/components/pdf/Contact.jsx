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

const MyDocument = ({ data }) => (
    <Document>
        <Page size="A3">
            <View style={styles.section}>
                <Text style={styles.title}>Listado de Beneficiarios</Text>
                {data.map((beneficiary, index) => (
                    <View key={index} style={styles.dataRow}>
                        <View style={styles.dataRow}>
                            <View style={styles.dataPair}>
                                <Text style={styles.dataLabel}>Nombre de Contacto: {beneficiary.NameContact}</Text>
                                <Text style={styles.dataLabel}>Tipo de Contacto: {beneficiary.TypeContact}</Text>
                                <Text style={styles.dataLabel}>Nombre del Beneficiario: {beneficiary.NameBeneficiary}</Text>
                                <Text style={styles.dataLabel}>DNI del Beneficiario: {beneficiary.DNIBeneficiary}</Text>
                                <Text style={styles.dataLabel}>Teléfono del Beneficiario: {beneficiary.PhoneBeneficiary}</Text>
                            </View>
                            <View style={styles.dataPair}>
                                <Text style={styles.dataLabel}>Localidad: {beneficiary.Locality}</Text>
                                <Text style={styles.dataLabel}>Provincia: {beneficiary.Province}</Text>
                                <Text style={styles.dataLabel}>Calle: {beneficiary.Street}</Text>
                            </View>
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