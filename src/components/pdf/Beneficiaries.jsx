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

const Beneficiaries = ({ data }) => (
    <Document>
        <Page size="A3">
            <View style={styles.section}>
                <Text style={styles.title}>Listado de Beneficiarios</Text>
                {data.map((beneficiary, index) => (
                    <View key={beneficiary.id} style={styles.dataRow}>
                        <View key={beneficiary.id} style={styles.dataRow}>
                            <View style={styles.dataPair}>
                                <Text style={styles.dataLabel}>Nombre: {beneficiary.beneficiary_name.charAt(0).toUpperCase() + beneficiary.beneficiary_name.slice(1)}</Text>
                                <Text style={styles.dataLabel}>Primer Apellido: {beneficiary.beneficiary_fs.charAt(0).toUpperCase() + beneficiary.beneficiary_fs.slice(1)}</Text>
                                <Text style={styles.dataLabel}>Segundo Apellido: {beneficiary.beneficiary_ss && beneficiary.beneficiary_ss !== null ? beneficiary.beneficiary_ss.charAt(0).toUpperCase() + beneficiary.beneficiary_ss.slice(1) : 'No Especificado'}</Text>
                                <Text style={styles.dataLabel}>Fecha de Nacimiento: {beneficiary.birth_date}</Text>
                                <Text style={styles.dataLabel}>DNI: {beneficiary.dni}</Text>
                                <Text style={styles.dataLabel}>Número de Seguridad Social: {beneficiary.social_security_number}</Text>
                                <Text style={styles.dataLabel}>Rutina: {beneficiary.rutine && beneficiary.rutine !== null ? beneficiary.rutine : 'No Especificads'}</Text>
                                <Text style={styles.dataLabel}>Género: {beneficiary.gender}</Text>
                                <Text style={styles.dataLabel}>Estado Civil: {beneficiary.marital_status}</Text>
                                <Text style={styles.dataLabel}>Tipo de Beneficiario: {beneficiary.beneficiary_type}</Text>
                                <Text style={styles.dataLabel}>Número de Teléfono: {beneficiary.phone_number}</Text>

                                <Text style={styles.dataLabel}>Alergias: {beneficiary.allergies}</Text>
                                <Text style={styles.dataLabel}>Enfermedades: {beneficiary.illnesses}</Text>
                                <Text style={styles.dataLabel}>Medicación por la Mañana: {beneficiary.morning_medication}</Text>
                                <Text style={styles.dataLabel}>Medicación por la Tarde: {beneficiary.afternoon_medication}</Text>
                                <Text style={styles.dataLabel}>Medicación por la Noche: {beneficiary.night_medication}</Text>
                                <Text style={styles.dataLabel}>Hora de Llamadas Preferente por la Mañana: {beneficiary.preferent_morning_calls_hour}</Text>
                                <Text style={styles.dataLabel}>Hora de Llamadas Preferente por la Tarde: {beneficiary.preferent_afternoon_calls_hour}</Text>
                                <Text style={styles.dataLabel}>Hora de Llamadas Preferente por la Noche: {beneficiary.preferent_night_calls_hour}</Text>
                                <Text style={styles.dataLabel}>¿Hay Emergencias Cerca?: {beneficiary.emergency_room_on_town}</Text>
                                <Text style={styles.dataLabel}>¿Hay Bomberos Cerca?: {beneficiary.firehouse_on_town}</Text>
                                <Text style={styles.dataLabel}>¿Hay una Estación de Policía Cerca?: {beneficiary.police_station_on_town}</Text>
                                <Text style={styles.dataLabel}>¿Hay Ambulatorio Cerca?: {beneficiary.outpatient_clinic_on_town}</Text>
                                <Text style={styles.dataLabel}>¿Hay Ambulancias?: {beneficiary.ambulance_on_town}</Text>

                                <Text style={styles.dataLabel}>Provincia: {beneficiary.province}</Text>
                                <Text style={styles.dataLabel}>Localidad: {beneficiary.locality}</Text>
                                <Text style={styles.dataLabel}>Código Postal: {beneficiary.postal_code}</Text>
                                <Text style={styles.dataLabel}>Calle: {beneficiary.street}</Text>
                                <Text style={styles.dataLabel}>Número: {beneficiary.number}</Text>
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

export default Beneficiaries;