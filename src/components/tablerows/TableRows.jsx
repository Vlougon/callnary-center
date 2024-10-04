import { useParams, Link, useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../components/modals/ConfirmationModal';

export default function TableRows({ columns, list, dataArray, arrayHandler }) {
    const tableRows = [];
    const callKind = useParams().kind;
    const navigate = useNavigate();

    const callHandler = (element) => {
        element.preventDefault();
        let target = '';

        switch (element.target.tagName) {
            case 'path':
                target = element.target.parentElement.parentElement;
                break;
            case 'svg':
                target = element.target.parentElement;
                break;
            case 'A':
                target = element.target;
                break;
            default:
                console.error('Error al Obtener el Elemento');
                return
        }

        const beneficiaryID = parseInt(target.getAttribute('about'));
        const callType = target.getAttribute('title').includes('Anónima') ? 'Anonymous' : 'Simulated';

        const kindObject = { beneficiary_id: beneficiaryID, kind: callKind, type: callType }

        window.localStorage.setItem('kindObject', JSON.stringify(kindObject));

        navigate('/callform');
    };

    const TableCellRender = () => {

        if (!dataArray || dataArray.length === 0) {
            tableRows.push(
                <tr key={0}>
                    <td colSpan={columns}>¡Nada qué Mostrar!</td>
                </tr>
            );

            return (
                tableRows.concat()
            )
        }

        switch (list) {
            case 'user':
                for (const user of dataArray) {
                    tableRows.push(
                        <tr key={user.id}>
                            <td>{user.name.charAt(0).toUpperCase() + user.name.slice(1)}</td>
                            <td>{user.role === 'supervisor' ? 'Supervisor' : 'Asistente'}</td>
                            <td>
                                <Link className="btn btn-warning" to={'/assistantform/' + user.id} title={'Modificar los Datos de ' + user.name}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                    </svg>
                                </Link>
                            </td>
                            <td>
                                <button name={'Eliminar al Asistente ' + user.name} className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target={'#userModal' + user.id}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                    </svg>
                                </button>

                                <ConfirmationModal modalID={'userModal' + user.id} modalOn={'Asistente'} elementID={user.id} array={dataArray} handler={arrayHandler} />
                            </td>
                        </tr>
                    )
                }
                break;
            case 'beneficiary':
                for (const beneficiary of dataArray) {
                    tableRows.push(
                        <tr key={beneficiary.id}>
                            <td>{beneficiary.name.charAt(0).toUpperCase() + beneficiary.name.slice(1)}</td>
                            <td>{beneficiary.dni}</td>
                            <td>
                                <Link className="btn btn-info" to={'/contactlist/' + beneficiary.id} title={'Ver Contactos de ' + beneficiary.name}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                    </svg>
                                </Link>
                            </td>
                            <td>
                                <Link className="btn btn-success" to={'/medicaldataform/' + beneficiary.id + '/' + beneficiary.medicaldata_id} title={'Modificar los Datos Médicos de ' + beneficiary.name}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                    </svg>
                                </Link>
                            </td>
                            <td>
                                <Link className="btn btn-warning" to={'/beneficiaryform/' + beneficiary.id} title={'Editar Datos del Beneficiario  ' + beneficiary.name}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                    </svg>
                                </Link>
                            </td>
                            <td>
                                <button name={'Eliminar al Beneficiario ' + beneficiary.name} className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target={'#beneficiaryModal' + beneficiary.id}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                    </svg>
                                </button>

                                <ConfirmationModal modalID={'beneficiaryModal' + beneficiary.id} modalOn={'Beneficiario'} elementID={beneficiary.id} array={dataArray} handler={arrayHandler} />
                            </td>
                        </tr>
                    )
                }
                break;
            case 'medical':
                for (const medicalData of dataArray) {
                    if (medicalData.beneficiary_id && medicalData.beneficiary_id !== null) {
                        tableRows.push(
                            <tr key={medicalData.id}>
                                <td>{medicalData.beneficiary_id.name.charAt(0).toUpperCase() + medicalData.beneficiary_id.name.slice(1)}</td>
                                <td>
                                    <Link className="btn btn-success" to={'/medicaldataform/' + medicalData.beneficiary_id.id + '/' + medicalData.id} title={'Modificar Datos Médicos de ' + medicalData.beneficiary_id.name}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                        </svg>
                                    </Link>
                                </td>
                            </tr>
                        )
                    }
                }
                break;
            case 'contact':
                for (const contact of dataArray) {
                    if (contact.beneficiary_id && contact.beneficiary_id !== null) {
                        tableRows.push(
                            <tr key={contact.id}>
                                <td>{contact.name.charAt(0).toUpperCase() + contact.name.slice(1)}</td>
                                <td>{contact.beneficiary_name.charAt(0).toUpperCase() + contact.beneficiary_name.slice(1)}</td>
                                <td>
                                    <Link className="btn btn-warning" to={'/contactform/' + contact.beneficiary_id + '/' + contact.id} title={'Modificar Datos de ' + contact.name + ', contacto de ' + contact.beneficiary_name}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                        </svg>
                                    </Link>
                                </td>
                            </tr>
                        )
                    }
                }
                break;
            case 'incoming':
                for (const beneficiary of dataArray) {
                    tableRows.push(
                        <tr key={beneficiary.id}>
                            <td>{beneficiary.name.charAt(0).toUpperCase() + beneficiary.name.slice(1)}</td>
                            <td>
                                <Link className="btn btn-primary callButton" title={'Llamada Entrante para ' + beneficiary.name} about={beneficiary.id} to='/callform' onClick={callHandler}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-inbound-fill" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877zM15.854.146a.5.5 0 0 1 0 .708L11.707 5H14.5a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 1 0v2.793L15.146.146a.5.5 0 0 1 .708 0"></path>
                                    </svg>
                                </Link>
                            </td>
                            <td>
                                <Link className="btn btn-outline-dark" title={'Llamada Anónima para ' + beneficiary.name} about={beneficiary.id} to='/callform' onClick={callHandler}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-phone-vibrate-fill" viewBox="0 0 16 16">
                                        <path d="M4 4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm5 7a1 1 0 1 0-2 0 1 1 0 0 0 2 0M1.807 4.734a.5.5 0 1 0-.884-.468A8 8 0 0 0 0 8c0 1.347.334 2.618.923 3.734a.5.5 0 1 0 .884-.468A7 7 0 0 1 1 8c0-1.18.292-2.292.807-3.266m13.27-.468a.5.5 0 0 0-.884.468C14.708 5.708 15 6.819 15 8c0 1.18-.292 2.292-.807 3.266a.5.5 0 0 0 .884.468A8 8 0 0 0 16 8a8 8 0 0 0-.923-3.734M3.34 6.182a.5.5 0 1 0-.93-.364A6 6 0 0 0 2 8c0 .769.145 1.505.41 2.182a.5.5 0 1 0 .93-.364A5 5 0 0 1 3 8c0-.642.12-1.255.34-1.818m10.25-.364a.5.5 0 0 0-.93.364c.22.563.34 1.176.34 1.818s-.12 1.255-.34 1.818a.5.5 0 0 0 .93.364C13.856 9.505 14 8.769 14 8s-.145-1.505-.41-2.182"></path>
                                    </svg>
                                </Link>
                            </td>
                        </tr>
                    )
                }
                break;
            case 'outgoing':
                for (const beneficiary of dataArray) {
                    tableRows.push(
                        <tr key={beneficiary.id}>
                            <td>{beneficiary.name.charAt(0).toUpperCase() + beneficiary.name.slice(1)}</td>
                            <td>
                                <Link className="btn btn-primary callButton" title={'Llamada Saliente para ' + beneficiary.name} about={beneficiary.id} to='/callform' onClick={callHandler}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-outbound-fill" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877zM11 .5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V1.707l-4.146 4.147a.5.5 0 0 1-.708-.708L14.293 1H11.5a.5.5 0 0 1-.5-.5"></path>
                                    </svg>
                                </Link>
                            </td>
                        </tr>
                    )
                }
                break;
            default:
                tableRows.push(
                    <tr key={0}>
                        <td colSpan={columns}>¡Nada qué Mostrar!</td>
                    </tr>
                );
                break;
        }

        return (
            tableRows.concat()
        )
    };

    return (
        <>
            <TableCellRender />
        </>
    )
}