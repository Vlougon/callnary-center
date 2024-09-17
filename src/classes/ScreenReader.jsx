export default class ScreeReader {
    static speaker(event) {
        if (event.key === 'Tab') {
            window.speechSynthesis.cancel();

            const reader = new SpeechSynthesisUtterance();

            reader.lang = 'es-ES';

            switch (document.activeElement.tagName) {
                case 'A':
                    reader.text += document.activeElement.getAttribute('title');
                    break;
                case 'INPUT':
                    if (document.activeElement.type === 'date' || document.activeElement.type === 'time') {
                        reader.text += document.activeElement.parentElement.previousElementSibling.textContent;
                        break;
                    }

                    if (document.activeElement.type === 'radio') {
                        reader.text += document.activeElement.parentElement.parentElement.previousElementSibling.textContent;
                        break;
                    }

                    if (document.activeElement.type === 'checkbox') {
                        reader.text += document.activeElement.nextElementSibling.textContent;
                        break;
                    }

                    reader.text += document.activeElement.getAttribute('placeholder');
                    break;
                case 'BUTTON':
                    if (document.activeElement.querySelector('span')) {
                        reader.text += document.activeElement.querySelector('span').textContent;

                        break;
                    }

                    reader.text += document.activeElement.getAttribute('name');
                    break;
                case 'SELECT':
                    reader.text += document.activeElement.selectedOptions[0].textContent;
                    break;
                case 'TEXTAREA':
                    reader.text += document.activeElement.parentElement.previousElementSibling.textContent;
                    break;
                default:
                    reader.text = 'Nuevo Elemento';
                    break;
            }

            window.speechSynthesis.speak(reader);

        } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            window.speechSynthesis.cancel();

            const reader = new SpeechSynthesisUtterance();

            reader.lang = 'es-ES';

            switch (document.activeElement.tagName) {
                case 'SELECT':
                    reader.text += document.activeElement.selectedOptions[0].textContent;
                    break;
                case 'INPUT':
                    reader.text += document.activeElement.value;
                    break;
                default:
                    reader.text = 'Nuevo Elemento';
                    break;
            }

            window.speechSynthesis.speak(reader);
        }
    }
}