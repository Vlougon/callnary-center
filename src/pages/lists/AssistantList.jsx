import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import TableRows from '../../components/tablerows/TableRows';
import SearchBox from '../../components/inputs/SearchBox';
import Spinner from '../../components/ui/Spinner';
import useAuthContext from '../../hooks/useAuthContext';
import '../../assets/pages/lists/AssistantList.css';

export default function AssistantList() {
    if (JSON.parse(sessionStorage.getItem('assistant')).role !== 'supervisor') {
        return <Navigate to='/' />
    }

    const [users, setUsers] = useState([]);
    const [currentUsers, setCurrentUsers] = useState([]);
    const { getUsersByCenter, loading } = useAuthContext();

    useEffect(() => {
        async function setGetResponse() {
            const getResponse = await getUsersByCenter(JSON.parse(sessionStorage.getItem('assistant')).id);

            if (getResponse.data.status && getResponse.data.status === 'success') {
                setUsers(getResponse.data.data);
                setCurrentUsers(getResponse.data.data);
            }
        }
        setGetResponse();
    }, []);

    return (
        <div id='assistantList' className='container-fluid'>

            <SearchBox view={'Asistente'} rootArray={users} setVolatileArray={setCurrentUsers} />

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
                            <TableRows columns={4} list={'user'} dataArray={currentUsers} arrayHandler={setCurrentUsers} />
                        }
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