import { Link, useNavigate } from 'react-router-dom';

export default function ShortCut({ linkID, hrefLink, textLink, imageSource, deleteFunction, benID, FM, setFM }) {
    const navigate = useNavigate();

    const callHandler = (element) => {
        element.preventDefault();

        if (benID === null || benID === undefined) {
            setFM({
                ...FM,
                render: true,
                message: '¡No Existen Beneficiarios a los Que Llamar!',
                type: 'warning',
            });

            return
        }

        const beneficiaryID = benID;
        const callKind = Math.floor(Math.random() * 2) > 0 ? 'incoming' : 'outgoing';

        const kindObject = { beneficiary_id: beneficiaryID, kind: callKind };

        window.localStorage.setItem('kindObject', JSON.stringify(kindObject));

        navigate('/callform');
    };

    return (
        <li id={linkID} className="col-sm-6 col-md-12 d-flex justify-content-between columrow">
            <Link to={hrefLink} onClick={hrefLink == '/callform' ? callHandler : null}>
                <img
                    src={imageSource}
                    alt={textLink}
                    className="img-fluid"
                />
                <p>
                    {textLink}
                </p>
            </Link>
            <button onClick={deleteFunction}>
                -
            </button>
        </li>
    )
}