export default function Spinner({ loading, spinnerColor, spinnerStyle }) {
    return loading && <span className={"spinner-border spinner-border-xl text-" + spinnerColor + " me-2"} style={spinnerStyle} role="status"></span>;
}
