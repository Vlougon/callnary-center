export default function CheckboxInput({ inputID, inputText, inputValue, onChangeHandler }) {
    return (
        <div className="form-check col-12 col-md-3">
            <input className="form-check-input" type="checkbox" value={inputValue} id={inputID} onChange={onChangeHandler} />
            <label className="form-check-label" htmlFor={inputID}>
                {inputText}
            </label>
        </div>
    )
}