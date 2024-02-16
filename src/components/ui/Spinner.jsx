export default function Spinner({ loading }) {
    return loading && <span className="spinner-border spinner-border-sm text-light me-2" role="status"></span>;
}
