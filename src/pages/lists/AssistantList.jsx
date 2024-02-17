import { useEffect, useState } from 'react';
import TableRows from '../../components/tablerows/TableRows';
import useAuthContext from '../../hooks/useAuthContext';
import Spinner from '../../components/ui/Spinner';
import '../../assets/pages/lists/AssistantList.css';

export default function AssistantList() {
    const [users, setUsers] = useState([]);
    const { getAllUsers, loading } = useAuthContext();

    useEffect(() => {
        async function setGetResponse() {
            const getResponse = await getAllUsers();

            if (getResponse.data.status && getResponse.data.status === 'success') {
                setUsers(getResponse.data.data);
            }
        }
        setGetResponse();
    }, []);

    return (
        <div id='assistantList' className='container-fluid'>
            <div className='table-responsive'>
                <table id='assistantTable' className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Nombre del Asistente</th>
                            <th>Rol</th>
                            <th>Editar Datos</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>

                    <tbody>
                        {!loading &&
                            <TableRows columns={4} list={'user'} dataArray={users} arrayHandler={setUsers} />
                        }
                    </tbody>
                </table>
            </div>

            {loading &&
                <Spinner loading={loading} spinnerColor={'primary'}
                    spinnerStyle={{ width: '5rem', height: '5rem', }}
                />
            }
        </div>
    )
}