import { useParams } from 'react-router-dom';
import TableRows from '../../components/tablerows/TableRows';
import '../../styles/lists/BeneficiaryList.css';

const beneficiaries = [
    {
        id: 1,
        name: 'Judas Iscariote',
        dni: '78443838S',
        medicaldata_id: 1,
    },
    {
        id: 2,
        name: 'Maria Magdalena',
        dni: '78285648L',
        medicaldata_id: 2,
    },
];

export default function BeneficiaryList() {
    const params = useParams();
    const tableCols = Object.keys(params).length === 0 ? 6 : params.kind === 'incoming' ? 3 : 2;
    const listType = Object.keys(params).length === 0 ? 'beneficiary' : params.kind === 'incoming' ? 'incoming' : 'outgoing';

    const TableHeadRender = () => {
        if (Object.keys(params).length === 0) {
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
            <div className='table-responsive'>
                <table id='beneficiaryTable' className="table table-striped table-hover">
                    <thead>
                        <TableHeadRender />
                    </thead>

                    <tbody>
                        <TableRows columns={tableCols} list={listType} dataArray={beneficiaries} />
                    </tbody>
                </table>
            </div>
        </div>
    )
}