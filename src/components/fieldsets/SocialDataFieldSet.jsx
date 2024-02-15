import SelectInput from "../inputs/SelectInput";

export default function SocialDataFieldSet() {
    return (
        <fieldset>
            <legend>Datos Sociales</legend>
            <div className='row g-3'>

                <SelectInput
                    selectNameID={'gender'}
                    selectLabel={'Sexo'}
                    selectValues={
                        [
                            { value: 'Male', text: 'Hombre', }, { value: 'Female', text: 'Mujer', }, { value: 'Other', text: 'Otro', },
                        ]
                    }
                    formUsed={'beneficiary'}
                    boxLength={'col-md-4'}
                    needFeedBack={true}
                />

                <SelectInput
                    selectNameID={'marital_status'}
                    selectLabel={'Estado Civil'}
                    selectValues={
                        [
                            { value: 'Single', text: 'Soltero/a', }, { value: 'Engaged', text: 'Prometido/a', }, { value: 'Married', text: 'Casado/a', },
                            { value: 'Widower', text: 'Viudo/a', }, { value: 'Uncoupled', text: 'Desperejado/a', }, { value: 'Divorced', text: 'Divrociado/a', },
                        ]
                    }
                    formUsed={'beneficiary'}
                    boxLength={'col-md-4'}
                    needFeedBack={true}
                />

                <SelectInput
                    selectNameID={'beneficiary_type'}
                    selectLabel={'Tipo de Beneficiario'}
                    selectValues={
                        [
                            { value: 'Above65', text: 'Mayor de 65 años', }, { value: '65-45', text: 'Entre 65 y 45 años', }, { value: '44-30', text: 'Entre 44 y 30 años', },
                            { value: '29-19', text: 'Entre 29 y 19 años', }, { value: '18-12', text: 'Entre 18 y 12 años', }, { value: 'Below12', text: 'Menor de 12 años', },
                        ]
                    }
                    formUsed={'beneficiary'}
                    boxLength={'col-md-4'}
                    needFeedBack={true}
                />
            </div>
        </fieldset>
    )
}