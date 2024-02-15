import AssistantPersonalDataFieldSet from '../../components/fieldsets/AssistntPersonalDataFieldSet';
import '../../styles/forms/AssistantForm.css';


export default function AssistantForm() {
    return (
        <div id='assistantForm' className="container-fluid">
            <form action="#" method="post">

                <AssistantPersonalDataFieldSet />

                <input type="submit" value="Dar de Alta al " />
            </form>
        </div>
    )
}