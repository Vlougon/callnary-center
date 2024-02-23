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
        flexBasis: '100%',
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

const Contacts = ({ data }) => (
    <Document>
        <Page size="A3">
            <View style={styles.section}>
                <Text style={styles.title}>Listado de Contactos</Text>
                {data.map((contact, index) => (
                    <View key={contact.id} style={styles.dataRow}>
                        <View style={styles.dataRow}>
                            <View style={styles.dataPair}>
                                <Text style={styles.dataLabel}>Nombre del Contacto: {contact.contact_name.charAt(0).toUpperCase() + contact.contact_name.slice(1)}</Text>
                                <Text style={styles.dataLabel}>Primer Apellido del Contacto: {contact.contact_fs.charAt(0).toUpperCase() + contact.contact_fs.slice(1)}</Text>
                                <Text style={styles.dataLabel}>Segundo Apellido del Contacto: {contact.contact_ss && contact.contact_ss !== null ? contact.contact_ss.charAt(0).toUpperCase() + contact.contact_ss.slice(1) : 'No Especificado'}</Text>
                                <Text style={styles.dataLabel}>Tipo de Contacto: {contact.contact_type}</Text>
                                <Text style={styles.dataLabel}>Teléfono del Contacto: {contact.phone_number}</Text>

                                <Text style={styles.dataLabel}>Provincia: {contact.province}</Text>
                                <Text style={styles.dataLabel}>Localidad: {contact.locality}</Text>
                                <Text style={styles.dataLabel}>Código Postal: {contact.postal_code}</Text>
                                <Text style={styles.dataLabel}>Calle: {contact.street}</Text>
                                <Text style={styles.dataLabel}>Número: {contact.number}</Text>

                                <Text style={styles.dataLabel}>Beneficiario Relacionado: {contact.beneficiary_name + ' ' + contact.beneficiary_fs + ' ' + contact.beneficiary_ss}</Text>
                                <Text style={styles.dataLabel}>DNI del Beneficiario: {contact.dni}</Text>
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

export default Contacts;