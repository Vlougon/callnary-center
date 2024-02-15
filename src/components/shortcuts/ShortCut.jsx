import { Link } from 'react-router-dom';

export default function ShortCut({ linkID, hrefLink, textLink, imageSource, deleteFunction }) {
    return (
        <li id={linkID} className="col-sm-6 col-md-12 d-flex justify-content-between columrow">
            <Link to={hrefLink}>
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