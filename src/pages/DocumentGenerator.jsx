import { useEffect, useState } from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import Spinner from '../components/ui/Spinner';
import Assistans from '../components/pdf/Assistans';
import Beneficiaries from '../components/pdf/Beneficiaries';
import Contacts from '../components/pdf/Contact';
import Calls from '../components/pdf/Calls';
import IncomingCalls from '../components/pdf/IncomingCalls';
import OutgoingCalls from '../components/pdf/OutgoingCalls';
import Reminders from '../components/pdf/Reminders';
import useAuthContext from '../hooks/useAuthContext';
import '../assets/pages/DocumentGenerator.css';

export default function DocumentGenerator() {
    //Fetch para obtener datos segun el listado
    const [renderDPF, setRenderPDF] = useState(false);
    const [pdfFileName, setPDFFileName] = useState('generalPDF.pdf');
    const [elementToRender, setElementToRender] = useState(null);
    const [beneficiariesData, setBeneficiariesData] = useState([]);
    const [contactsData, setContactsData] = useState([]);
    const [callsData, setCallsData] = useState([]);
    const [incomingCallsData, setIncomingCallsData] = useState([]);
    const [outgoingCallsData, setOutgoingCallsData] = useState([]);
    const [remindersData, setRemidnersData] = useState([]);
    const [assistantsData, setassistantsData] = useState([]);
    const {
        getAllAssistantsWithDetails, getAllBeneficiariesWithDetails, getAllContactsWithDetails,
        getAllCallsWithDetails, getAllIncomingCallsWithDetails, getAllOutgoingCallsWithDetails,
        getAllRemindersWithDetails, loading
    } = useAuthContext();

    useEffect(() => {
        setElementToRender(<Assistans data={assistantsData} />);
    }, [assistantsData]);

    useEffect(() => {
        setElementToRender(<Beneficiaries data={beneficiariesData} />);
    }, [beneficiariesData]);

    useEffect(() => {
        setElementToRender(<Contacts data={contactsData} />);
    }, [contactsData]);

    useEffect(() => {
        setElementToRender(<Calls data={callsData} />);
    }, [callsData]);

    useEffect(() => {
        setElementToRender(<IncomingCalls data={incomingCallsData} />);
    }, [incomingCallsData]);

    useEffect(() => {
        setElementToRender(<OutgoingCalls data={outgoingCallsData} />);
    }, [outgoingCallsData]);

    useEffect(() => {
        setElementToRender(<Reminders data={remindersData} />);
    }, [remindersData]);

    const handleChange = (element) => {
        setPDFFileName(element.target.value + '.pdf');

        switch (element.target.value) {
            case 'assistantList':
                dataFetcher(getAllAssistantsWithDetails, assistantsData, setassistantsData);
                break;
            case 'beneficiaryList':
                dataFetcher(getAllBeneficiariesWithDetails, beneficiariesData, setBeneficiariesData);
                break;
            case 'conactList':
                dataFetcher(getAllContactsWithDetails, contactsData, setContactsData);
                break;
            case 'callsList':
                dataFetcher(getAllCallsWithDetails, callsData, setCallsData);
                break;
            case 'incomingCallsList':
                dataFetcher(getAllIncomingCallsWithDetails, incomingCallsData, setIncomingCallsData);
                break;
            case 'outgoingCallsList':
                dataFetcher(getAllOutgoingCallsWithDetails, outgoingCallsData, setOutgoingCallsData);
                break;
            case 'remidnersList':
                dataFetcher(getAllRemindersWithDetails, remindersData, setRemidnersData);
                break;
            default:
                setRenderPDF(false);
                break;
        }
    };

    const dataFetcher = async function (fetchMethod, arrayList, arraySetter) {
        if (arrayList && arrayList.length > 0) {
            arraySetter((previousArray) => [...previousArray]);

            await delayer(3000);

            setRenderPDF(true);
            return
        }

        const response = await fetchMethod();

        if (response && response.data.status === 'success') {
            arraySetter(
                response.data.data,
            );

            await delayer(3000);

            setRenderPDF(true);
        }
    };

    const delayer = (delay) => {
        return new Promise(res => setTimeout(res, delay));
    };

    return (
        <div id='documentGenerator' className='container-fluid'>
            <div className='input-group mb-3'>
                <span className="input-group-text" id="docselector">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-pdf-fill" viewBox="0 0 16 16">
                        <path d="M5.523 12.424q.21-.124.459-.238a8 8 0 0 1-.45.606c-.28.337-.498.516-.635.572l-.035.012a.3.3 0 0 1-.026-.044c-.056-.11-.054-.216.04-.36.106-.165.319-.354.647-.548m2.455-1.647q-.178.037-.356.078a21 21 0 0 0 .5-1.05 12 12 0 0 0 .51.858q-.326.048-.654.114m2.525.939a4 4 0 0 1-.435-.41q.344.007.612.054c.317.057.466.147.518.209a.1.1 0 0 1 .026.064.44.44 0 0 1-.06.2.3.3 0 0 1-.094.124.1.1 0 0 1-.069.015c-.09-.003-.258-.066-.498-.256M8.278 6.97c-.04.244-.108.524-.2.829a5 5 0 0 1-.089-.346c-.076-.353-.087-.63-.046-.822.038-.177.11-.248.196-.283a.5.5 0 0 1 .145-.04c.013.03.028.092.032.198q.008.183-.038.465z"></path>
                        <path fillRule="evenodd" d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m5.5 1.5v2a1 1 0 0 0 1 1h2zM4.165 13.668c.09.18.23.343.438.419.207.075.412.04.58-.03.318-.13.635-.436.926-.786.333-.401.683-.927 1.021-1.51a11.7 11.7 0 0 1 1.997-.406c.3.383.61.713.91.95.28.22.603.403.934.417a.86.86 0 0 0 .51-.138c.155-.101.27-.247.354-.416.09-.181.145-.37.138-.563a.84.84 0 0 0-.2-.518c-.226-.27-.596-.4-.96-.465a5.8 5.8 0 0 0-1.335-.05 11 11 0 0 1-.98-1.686c.25-.66.437-1.284.52-1.794.036-.218.055-.426.048-.614a1.24 1.24 0 0 0-.127-.538.7.7 0 0 0-.477-.365c-.202-.043-.41 0-.601.077-.377.15-.576.47-.651.823-.073.34-.04.736.046 1.136.088.406.238.848.43 1.295a20 20 0 0 1-1.062 2.227 7.7 7.7 0 0 0-1.482.645c-.37.22-.699.48-.897.787-.21.326-.275.714-.08 1.103"></path>
                    </svg>
                </span>
                <select className="form-select" name="selector" id="documentSelect" onChange={handleChange} disabled={loading}>
                    <option value="">Seleccione Listado</option>
                    <option value="assistantList">Listado de Asistentes</option>
                    <option value="beneficiaryList">Listado de Beneficiarios</option>
                    <option value="conactList">Listado de Contactos</option>
                    <option value="callsList">Listado de Llamadas</option>
                    <option value="incomingCallsList">Listado de Llamadas de Entrada</option>
                    <option value="outgoingCallsList">Listado de Llamadas de Salida</option>
                    <option value="remidnersList">Listado de Recordatorios</option>
                </select>

                {/* Mostrar el documento*/}
                {renderDPF &&
                    <>
                        <PDFViewer style={{ width: '100%', height: '90vh', border: '1px solid black', borderRadius: '10px', marginTop: '20px' }}>
                            {
                                elementToRender
                            }
                        </PDFViewer>

                        {/* Enlace para descargar el PDF */}
                        <div id='downloadButtonContainer' style={{ width: '100%', marginTop: '20px' }}>
                            <PDFDownloadLink document={elementToRender} fileName={pdfFileName}  >
                                <button type="submit" className='btn btn-primary' disabled={loading}>
                                    <Spinner loading={loading} spinnerColor={'light'} spinnerType={'spinner-border'}
                                        spinnerStyle={{ width: '1rem', height: '1rem', }}
                                    />
                                    <span>¡Descargar PDF!</span>
                                </button>
                            </PDFDownloadLink>
                        </div>
                    </>
                }
            </div>

            {loading && !renderDPF &&
                <Spinner loading={loading} spinnerColor={'dark'} spinnerType={'spinner-border'}
                    spinnerStyle={{ width: '6rem', height: '6rem', }}
                />
            }
        </div>
    )
}