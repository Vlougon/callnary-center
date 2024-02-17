export default function Spinner({ loading, spinnerColor }) {
    return loading && <span className={"spinner-border spinner-border-xl text-" + spinnerColor + " me-2"} role="status"></span>;
}
