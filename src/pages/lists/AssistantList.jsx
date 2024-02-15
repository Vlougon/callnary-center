import TableRows from '../../components/tablerows/TableRows';
import '../../styles/lists/AssistantList.css';

const users = [
    {
        id: 1,
        name: 'Judas Iscariote',
        role: 'Supervisor',
    },
    {
        id: 2,
        name: 'San Pedro',
        role: 'Asistente',
    },
]

export default function AssistantList() {
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
                        <TableRows columns={4} list={'user'} dataArray={users} />
                    </tbody>
                </table>
            </div>
        </div>
    )
}