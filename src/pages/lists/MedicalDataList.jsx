import { useEffect, useState } from 'react';
import TableRows from '../../components/tablerows/TableRows';
import Spinner from '../../components/ui/Spinner';
import useAuthContext from '../../hooks/useAuthContext';
import '../../assets/pages/lists/MedicalDataList.css';

export default function MedicalDataList() {
    const [medicalDatas, setMedicalDatas] = useState([]);
    const { getAllMedicalData, loading } = useAuthContext();

    useEffect(() => {
        async function setGetResponse() {
            const getResponse = await getAllMedicalData();

            if (getResponse.data.status && getResponse.data.status === 'success') {

                setMedicalDatas(getResponse.data.data);
            }
        }
        setGetResponse();
    }, []);

    return (
        <div id="medicalList" className="container-fluid">
            <div className='table-responsive'>
                <table id='medicalTable' className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Beneficiario Relacionado</th>
                            <th>Modificar Datos Médicos</th>
                        </tr>
                    </thead>

                    <tbody>
                        {!loading &&
                            <TableRows columns={2} list={'medical'} dataArray={medicalDatas} arrayHandler={setMedicalDatas} />
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