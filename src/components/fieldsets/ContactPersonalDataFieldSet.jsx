import TextInput from "../inputs/TextInput";
import SelectInput from "../inputs/SelectInput";
import PhoneNumberInput from "../inputs/PhoneNumberInput";

export default function ContactPersonalDataFieldSet() {
    return (
        <fieldset>
            <legend>Datos Personales</legend>
            <div className="row g-3">

                <TextInput nameID={'name'} sublimText={'Nombre'} formUsed={'contact'} boxLength={'col-md-4'} needFeedback={true} />

                <TextInput nameID={'first_surname'} sublimText={'Primer Apellido'} formUsed={'contact'} boxLength={'col-md-4'} needFeedback={true} />

                <TextInput nameID={'second_surname'} sublimText={'Segundo Apellido'} formUsed={'contact'} boxLength={'col-md-4'} needFeedback={true} />

                <SelectInput
                    selectNameID={'contact_type'}
                    selectLabel={'Tipo de Contacto'}
                    selectValues={
                        [
                            { value: 'Familiar', text: 'Familiar', }, { value: 'Friend', text: 'Amigo/a', },
                            { value: 'Partner', text: 'Pareja', }, { value: 'Other', text: 'Otro', }
                        ]
                    }
                    formUsed={'contact'}
                    boxLength={'col-md-4'}
                    needFeedBack={true}
                />

                <PhoneNumberInput boxLength={'col-md-4'} />
            </div>
        </fieldset>
    )
}