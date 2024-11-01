import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import TableRows from '../../components/tablerows/TableRows';
import Spinner from '../../components/ui/Spinner';
import useAuthContext from '../../hooks/useAuthContext';
import '../../assets/pages/lists/ContactList.css';

export default function ContactList() {
    const [contacts, setContacts] = useState([]);
    const [curretnContacts, setCurrentContacts] = useState([]);
    const { getUserBeneficiaryContacts, getContactsBeneficiary, getAllContactsByCenter, loading } = useAuthContext();
    const beneficiaryID = useParams();
    const assistantObject = sessionStorage.getItem('assistant')
        ? JSON.parse(sessionStorage.getItem('assistant'))
        : { id: null, role: "assistant" };

    useEffect(() => {
        async function setGetResponse() {
            if (beneficiaryID.id) {
                const getResponse = await getContactsBeneficiary(beneficiaryID.id);

                if (getResponse.data.status && getResponse.data.status === 'success') {

                    setContacts(getResponse.data.data);
                    setCurrentContacts(getResponse.data.data);
                }
                return
            }

            const getResponse = assistantObject.role === 'supervisor'
                ? await getAllContactsByCenter(assistantObject.id)
                : await getUserBeneficiaryContacts(assistantObject.id);

            if (getResponse.data.status && getResponse.data.status === 'success') {
                setContacts(getResponse.data.data);
                setCurrentContacts(getResponse.data.data);
            }
        }
        setGetResponse();
    }, []);

    const handleChange = (element) => {
        const nameRegExp = new RegExp(element.target.value, 'ig');

        if (beneficiaryID.id) {
            setCurrentContacts(contacts.filter(contact => contact.contact_id.name.match(nameRegExp)));

            return
        }

        setCurrentContacts(contacts.filter(contact => contact.beneficiary_id.name.match(nameRegExp)));
    };

    return (
        <div id="contactList" className="container-fluid">

            <div id='searchBox' className="input-group mb-4">
                <span className="input-group-text" id="searchBoxLupe">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"></path>
                    </svg>
                </span>
                <input type="text" className="form-control" name='search' placeholder={'Buscar Contactos' + (beneficiaryID.id ? '' : ' por Beneficiario') + '...'} aria-describedby="searchBoxLupe" onChange={handleChange} disabled={loading} />
            </div>

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
                        {!loading &&
                            <TableRows columns={3} list={'contact'} dataArray={curretnContacts} arrayHandler={setCurrentContacts} />
                        }
                    </tbody>
                </table>
            </div>

            {!loading && beneficiaryID.id &&
                <div>
                    <Link type="button" className='btn btn-primary' to={'/contactform/' + beneficiaryID.id}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
                        </svg>
                        <span>Añadir Contacto</span>
                    </Link>
                </div>
            }

            {loading &&
                <Spinner loading={loading} spinnerColor={'primary'} spinnerType={'spinner-border'}
                    spinnerStyle={{ width: '5rem', height: '5rem', }}
                />
            }
        </div>
    )
}