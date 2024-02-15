import TableRows from '../../components/tablerows/TableRows';
import '../../styles/lists/MedicalDataList.css';

const medcials = [
    {
        id: 1,
        beneficiary_name: 'Judas Iscariote',
    },
    {
        id: 2,
        beneficiary_name: 'San Pedro',
    },
]

export default function MedicalDataList() {
    return (
        <div id="medicalList" className="container-fluid">
            <div className='table-responsive'>
                <table id='medicalTable' className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Beneficiario Relacionado</th>
                            <th>Modificar Datos Médicos</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>

                    <tbody>
                        <TableRows columns={3} list={'medical'} dataArray={medcials} />
                    </tbody>
                </table>
            </div>
        </div>
    )
}