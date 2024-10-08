import { useEffect, useState } from 'react';
import TableRows from '../../components/tablerows/TableRows';
import Spinner from '../../components/ui/Spinner';
import useAuthContext from '../../hooks/useAuthContext';
import '../../assets/pages/lists/MedicalDataList.css';

export default function MedicalDataList() {
    const [medicalDatas, setMedicalDatas] = useState([]);
    const [curretnMedicalDatas, setCurrentMedicalDatas] = useState([]);
    const { getUserBeneficiaryMedicalData, getAllMedicalDataByCenter, loading } = useAuthContext();
    const assistantObject = sessionStorage.getItem('assistant')
        ? JSON.parse(sessionStorage.getItem('assistant'))
        : { id: null, role: "assistant" };

    useEffect(() => {
        async function setGetResponse() {
            const getResponse = assistantObject.role === 'supervisor'
                ? await getAllMedicalDataByCenter(assistantObject.id)
                : await getUserBeneficiaryMedicalData(assistantObject.id);

            if (getResponse.data.status && getResponse.data.status === 'success') {

                setMedicalDatas(getResponse.data.data);
                setCurrentMedicalDatas(getResponse.data.data);
            }
        }
        setGetResponse();
    }, []);

    const handleChange = (element) => {
        const nameRegExp = new RegExp(element.target.value, 'ig');

        setCurrentMedicalDatas(medicalDatas.filter(medicalData => medicalData.beneficiary_id.name.match(nameRegExp)));
    };

    return (
        <div id="medicalList" className="container-fluid">

            <div id='searchBox' className="input-group mb-4">
                <span className="input-group-text" id="searchBoxLupe">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"></path>
                    </svg>
                </span>
                <input type="text" className="form-control" name='search' placeholder='Buscar Datos Médicos...' aria-describedby="searchBoxLupe" onChange={handleChange} disabled={loading} />
            </div>

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
                            <TableRows columns={2} list={'medical'} dataArray={curretnMedicalDatas} arrayHandler={setCurrentMedicalDatas} />
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