import TableRows from '../../components/tablerows/TableRows';
import '../../assets/pages/lists/ContactList.css';

const contact = [
    {
        id: 1,
        name: 'Jesus Cristo Redentor',
        beneficiary_name: 'Judas Iscariote',
    },
    {
        id: 2,
        name: 'Jesus Cristo Redentor',
        beneficiary_name: 'San Pedro',
    },
]

export default function ContactList() {
    return (
        <div id="contactList" className="container-fluid">
            <div className='table-responsive'>
                <table id='contactTable' className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Nombre del Contacto</th>
                            <th>Beneficiarios Relacionados</th>
                            <th>Modificar Datos del Contacto</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>

                    <tbody>
                        <TableRows columns={4} list={'contact'} dataArray={contact} />
                    </tbody>
                </table>
            </div>
        </div>
    )
}