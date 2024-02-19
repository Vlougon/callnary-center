export default function Spinner({ loading, spinnerColor, spinnerStyle, spinnerType }) {
    return loading && <span className={spinnerType + " text-" + spinnerColor + " me-2"} style={spinnerStyle} role="status"></span>;
}
