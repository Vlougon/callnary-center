import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import TableRows from '../../components/tablerows/TableRows';
import Spinner from '../../components/ui/Spinner';
import useAuthContext from '../../hooks/useAuthContext';
import '../../assets/pages/lists/ContactList.css';

export default function ContactList() {
    const [contacts, setContacts] = useState([]);
    const { getBeneficiaryContacts, getContactsBeneficiary, loading } = useAuthContext();
    const beneficiaryID = useParams();

    useEffect(() => {
        async function setGetResponse() {
            if (beneficiaryID.id) {
                const getResponse = await getContactsBeneficiary(beneficiaryID.id);

                if (getResponse.data.status && getResponse.data.status === 'success') {

                    const contactObject = [];

                    for (const contact of getResponse.data.data) {
                        contactObject.push({
                            contact_id: {
                                id: contact.id,
                                name: contact.name,
                            },
                            beneficiary_id: {
                                id: beneficiaryID.id,
                                name: getResponse.data.beneficiary,
                            }
                        });
                    }

                    setContacts(contactObject);
                }
                return
            }

            const getResponse = await getBeneficiaryContacts();

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
                        {!loading &&
                            <TableRows columns={3} list={'contact'} dataArray={contacts} arrayHandler={setContacts} />
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