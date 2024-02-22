export default class ScreeReader {
    static speaker(event) {
        if (event.key !== 'Tab') {
            return
        }
        window.speechSynthesis.cancel();

        const reader = new SpeechSynthesisUtterance();

        reader.lang = 'es-ES';

        switch (document.activeElement.tagName) {
            case 'A':
                reader.text = 'LINK';
                break;
            case 'INPUT':
                reader.text = 'INPUT';
                break;
            case 'BUTTON':
                reader.text = 'BOTÓN';
                break;
            default:
                console.log(document.activeElement.tagName);
                reader.text = 'Nuevo Elemento';
                break;
        }

        window.speechSynthesis.speak(reader);
    }
}