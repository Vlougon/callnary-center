import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TableRows from '../../components/tablerows/TableRows';
import Spinner from '../../components/ui/Spinner';
import useAuthContext from '../../hooks/useAuthContext';
import '../../assets/pages/lists/ContactList.css';

export default function ContactList() {
    const [contacts, setContacts] = useState([]);
    const { getAllContacts, loading } = useAuthContext();
    const beneficiaryID = useParams();

    useEffect(() => {
        async function setGetResponse() {
            const getResponse = await getAllContacts();

            if (getResponse.data.status && getResponse.data.status === 'success') {
                setContacts(getResponse.data.data);
            }
        }
        setGetResponse();
    }, []);

    return (
        <div id="contactList" className="container-fluid">
            <div className='table-responsive'>
                <table id='contactTable' className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Nombre del Contacto</th>
                            <th>Beneficiarios Relacionados</th>
                            <th>Modificar Datos del Contacto</th>
                        </tr>
                    </thead>

                    <tbody>
                        <TableRows columns={4} list={'contact'} dataArray={contacts} arrayHandler={setContacts} />
                    </tbody>
                </table>
            </div>

            {loading &&
                <Spinner loading={loading} spinnerColor={'primary'} spinnerType={'spinner-border'}
                    spinnerStyle={{ width: '5rem', height: '5rem', }}
                />
            }
        </div>
    )
}