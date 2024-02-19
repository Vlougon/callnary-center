import { useState, useRef, createContext, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import ReminderModal from '../components/calendar/ReminderModal';
import FlashMessage from '../components/flashmessages/FlashMessage';
import Spinner from '../components/ui/Spinner';
import useAuthContext from '../hooks/useAuthContext';
import '../assets/pages/Calendar.css';

export const MainCalendarContext = createContext();

export default function Calendar() {
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [events, setEvents] = useState([]);
    const [title, setTitle] = useState('');
    const [selectedDates, setSelectedDates] = useState({
        firstDate: '0000-00-00',
        secondDate: '0000-00-00',
        firstTime: '00:00',
        secondTime: '00:00',
    });
    const [showFM, setShowFM] = useState({
        render: false,
        message: '',
        type: '',
    });
    const { getAllReminders, getAllBeneficiaries, loading } = useAuthContext();
    const modalRef = useRef(null);

    useEffect(() => {
        async function getReminderResponse() {
            const remindersResposne = await getAllReminders();
            const reminderArray = [];

            for (const reminder of remindersResposne.data.data) {
                reminder.start_date = reminder.start_date.split('T')[0];
                reminder.end_date = reminder.end_date.split('T')[0];
                reminder.repeat = !reminder.repeat ? '' : reminder.repeat.split(',');

                reminderArray.push({
                    title: reminder.title,
                    start: reminder.start_date + 'T' + reminder.start_time + 'Z',
                    end: reminder.end_date + 'T' + reminder.end_time + 'Z',
                    backgroundColor: reminder.background_color,
                    daysOfWeek: reminder.repeat,
                });
            }

            setEvents(reminderArray);
        }
        getReminderResponse();

        async function getBeneficiaryResponse() {
            const beneficiaryResponse = await getAllBeneficiaries();

            if (beneficiaryResponse.data.status && beneficiaryResponse.data.status === 'success') {
                const beneficiaryObjectArray = beneficiaryResponse.data.data.map((beneficiary) => {
                    return { value: beneficiary.id, text: beneficiary.name }
                });

                setBeneficiaries(beneficiaryObjectArray);
            }
        }
        getBeneficiaryResponse();
    }, []);

    const handleSelectedDates = (info) => {
        let startDate = info.startStr.includes('T') ? info.startStr.slice(0, 10) : info.startStr;
        let endDate = info.endStr.includes('T') ? info.endStr.slice(0, 10) : info.endStr;
        let startTime = new Date(info.start).getHours().toString().padStart(2, '0') + ':' + new Date(info.start).getMinutes().toString().padStart(2, '0') + ':' + new Date(info.start).getSeconds().toString().padStart(2, '0');
        let endTime = new Date(info.end).getHours().toString().padStart(2, '0') + ':' + new Date(info.end).getMinutes().toString().padStart(2, '0') + ':' + new Date(info.end).getSeconds().toString().padStart(2, '0');

        setSelectedDates({ firstDate: startDate, secondDate: endDate, firstTime: startTime, secondTime: endTime });

        modalRef.current.className += ' d-block';
    };

    const hiddeAlert = () => {
        setShowFM({
            ...showFM,
            render: false,
            message: '',
            type: '',
        });
    };

    return (
        <div id='calendar'>
            {loading &&
                <div id='loadingScreen'>
                    <Spinner loading={loading} spinnerColor={'dark'} spinnerType={'spinner-grow'}
                        spinnerStyle={{ width: '7rem', height: '7rem', }}
                    />
                </div>
            }

            {showFM.render &&
                <FlashMessage flashMessgae={showFM.message} flashType={showFM.type} closeHandler={hiddeAlert} />
            }

            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactPlugin, listPlugin]}
                initialView="dayGridMonth"
                themeSystem="Darkly"
                locale={'es'}
                editable={true}
                selectable={true}
                slotMinTime='00:00:00'
                slotMaxTime='23:00:00'
                dayMaxEventRows={4}
                eventMaxStack={1}
                moreLinkClick='popover'
                events={events}
                select={handleSelectedDates}
                headerToolbar={
                    {
                        left: 'prev next today',
                        center: 'title',
                        right: 'dayGridMonth timeGridWeek timeGridDay listWeek'
                    }
                }
            />

            <MainCalendarContext.Provider
                value={{
                    events, setEvents, title, setTitle, selectedDates, setSelectedDates, modalRef, beneficiaries
                }}>
                <ReminderModal modalReference={modalRef} selecDates={selectedDates} datesHandler={setSelectedDates} />
            </MainCalendarContext.Provider>
        </div>
    )
}