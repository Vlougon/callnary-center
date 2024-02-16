import { useState, useRef, createContext } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import ReminderModal from '../components/calendar/ReminderModal';
import '../assets/pages/Calendar.css';

export const MainCalendarContext = createContext();

export default function Calendar() {
    const [events, setEvents] = useState([]);
    const [title, setTitle] = useState('');
    const [selectedDates, setSelectedDates] = useState({
        firstDate: '0000-00-00',
        secondDate: '0000-00-00',
        firstTime: '00:00',
        secondTime: '00:00',
    });
    const modalRef = useRef(null);

    const handleSelectedDates = (info) => {
        let startDate = info.startStr.includes('T') ? info.startStr.slice(0, 10) : info.startStr;
        let endDate = info.endStr.includes('T') ? info.endStr.slice(0, 10) : info.endStr;
        let startTime = new Date(info.start).getHours().toString().padStart(2, '0') + ':' + new Date(info.start).getMinutes().toString().padStart(2, '0') + ':' + new Date(info.start).getSeconds().toString().padStart(2, '0');
        let endTime = new Date(info.end).getHours().toString().padStart(2, '0') + ':' + new Date(info.end).getMinutes().toString().padStart(2, '0') + ':' + new Date(info.end).getSeconds().toString().padStart(2, '0');

        setSelectedDates({ firstDate: startDate, secondDate: endDate, firstTime: startTime, secondTime: endTime });

        modalRef.current.className += ' d-block';
    };

    return (
        <div id='calendar'>
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
                    events, setEvents, title, setTitle, selectedDates, setSelectedDates, modalRef
                }}>
                <ReminderModal modalReference={modalRef} selecDates={selectedDates} datesHandler={setSelectedDates} />
            </MainCalendarContext.Provider>
        </div>
    )
}