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

const Calls = ({ data }) => (
    <Document>
        <Page size="A3">
            <View style={styles.section}>
                <Text style={styles.title}>Listado de Llamadas</Text>
                {data.map((call, index) => (
                    <View key={call.id} style={styles.dataRow}>
                        <View style={styles.dataPair}>
                            <Text style={styles.dataLabel}>Fecha y Hora de la Llamada: {call.date + ' a las ' + call.time}</Text>
                            <Text style={styles.dataLabel}>Duración de la Llamada: {Math.floor(call.duration / 3600) + 'h  ' + Math.floor(call.duration % 3600 / 60) + 'm ' + Math.floor(call.duration % 3600 % 60) + 's'}</Text>
                            <Text style={styles.dataLabel}>Tipo de Llamada: {call.call_type}</Text>
                            <Text style={styles.dataLabel}>Clase de Llamada: {call.call_kind}</Text>
                            <Text style={styles.dataLabel}>¿Fue Respondida la Llamada?: {call.answered_call === 1 ? 'Fue Respondida' : 'No fue Respondida'}</Text>
                            <Text style={styles.dataLabel}>Observaciones: {call.observations}</Text>
                            <Text style={styles.dataLabel}>Description al 112: {call.description}</Text>
                            <Text style={styles.dataLabel}>¿Fue Necesario Contactar con el 112?: {call.contacted_112 === 1 ? 'Se Contactó al 112' : 'No se Contactó al 112'}</Text>

                            <Text style={styles.dataLabel}>Asistente Implicado/a: {call.user_name}</Text>
                            <Text style={styles.dataLabel}>Correo Electrónico: {call.email}</Text>
                            <Text style={styles.dataLabel}>Rol: {call.role}</Text>

                            <Text style={styles.dataLabel}>Beneficiario Involucrado: {call.beneficiary_name + ' ' + call.first_surname + ' ' + call.second_surname}</Text>
                            <Text style={styles.dataLabel}>DNI: {call.dni}</Text>
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

export default Calls;