import { Calendar as BigCalendar, dayjsLocalizer, type View } from 'react-big-calendar';
import dayjs from 'dayjs';
import { useState, useEffect } from "react";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import type { Training } from "../types"

const localizer = dayjsLocalizer(dayjs)

type CalendarEvent = {
    start: Date,
    end: Date,
    title: string,
}

export default function Calendar() {
    const [events, setEvents] = useState<CalendarEvent[]>([])
    const [currentView, setCurrentView] = useState<View>('week')
    const [currentDate, setCurrentDate] = useState(new Date())

    const getEvents = () => {
        fetch(import.meta.env.VITE_API_URL + "/gettrainings")
            .then(response => {
                if (!response.ok)
                    throw new Error("Error when fetching trainings")
                return response.json();
            })
            .then(data => {const formattedEvents: CalendarEvent[] = data.map((training: Training) => {
                    return {
                        start: dayjs(training.date).toDate(), 
                        end: dayjs(training.date).add(Number(training.duration), 'minute').toDate(),
                        title: `${training.activity} / ${training.customer?.firstname} ${training.customer?.lastname}`
                    };
                });
                const sortedEvents = formattedEvents.sort((a, b) => a.start.getTime() - b.start.getTime());
                setEvents(sortedEvents);
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        getEvents();
    }, []);

    return (
        <div style={{ height: '80vh', padding: '20px' }}>
            <BigCalendar
                events={events}
                localizer={localizer}
                startAccessor="start"
                endAccessor="end"
                views={['month', 'week', 'day', 'agenda']}
                view={currentView}
                date={currentDate}
                onView={(newView) => setCurrentView(newView)} 
                onNavigate={(newDate) => setCurrentDate(newDate)}
            />
        </div>
    )
}