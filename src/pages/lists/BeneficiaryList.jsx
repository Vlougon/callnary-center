import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TableRows from '../../components/tablerows/TableRows';
import SearchBox from '../../components/inputs/SearchBox';
import Spinner from '../../components/ui/Spinner';
import useAuthContext from '../../hooks/useAuthContext';
import '../../assets/pages/lists/BeneficiaryList.css';

export default function BeneficiaryList() {
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [currentBeneficiaries, setCurrentBeneficiaries] = useState([]);
    const { getUserBeneficiaries, loading } = useAuthContext();
    const params = useParams();
    const tableCols = Object.keys(params) && Object.keys(params).length === 0 ? 6 : params.kind === 'incoming' ? 3 : 2;
    const listType = Object.keys(params) && Object.keys(params).length === 0 ? 'beneficiary' : params.kind === 'incoming' ? 'incoming' : 'outgoing';

    useEffect(() => {
        async function setGetResponse() {
            const getResponse = await getUserBeneficiaries(JSON.parse(sessionStorage.getItem('assistant')).id);

            if (getResponse.data.status && getResponse.data.status === 'success') {
                setBeneficiaries(getResponse.data.data);
                setCurrentBeneficiaries(getResponse.data.data);
            }
        }
        setGetResponse();
    }, []);

    const TableHeadRender = () => {
        if (Object.keys(params) && Object.keys(params).length === 0) {
            return (
                <tr>
                    <th>Nombre del Beneficiario</th>
                    <th>DNI</th>
                    <th>Ver Contactos</th>
                    <th>Editar Datos Médicos</th>
                    <th>Editar Datos</th>
                    <th>Eliminar</th>
                </tr>
            )
        }

        if (params.kind === 'incoming') {
            return (
                <tr>
                    <th>Nombre del Beneficiario</th>
                    <th>Realizar Llamada</th>
                    <th>Aleatorio</th>
                </tr>
            )
        }

        return (
            <tr>
                <th>Nombre del Beneficiario</th>
                <th>Realizar Llamada</th>
            </tr>
        )
    };

    return (
        <div id='beneficiaryList' className="container-fluid">

            <SearchBox view={'Beneficiario'} rootArray={beneficiaries} setVolatileArray={setCurrentBeneficiaries} />

            <div className='table-responsive'>
                <table id='beneficiaryTable' className="table table-striped table-hover">
                    <thead>
                        <TableHeadRender />
                    </thead>

                    <tbody>
                        {!loading &&
                            <TableRows columns={tableCols} list={listType} dataArray={currentBeneficiaries} arrayHandler={setCurrentBeneficiaries} />
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