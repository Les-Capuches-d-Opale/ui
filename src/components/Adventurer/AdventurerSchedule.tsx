import { useState } from "react";
import { Modal, WeeklyCalendar } from "react-rainbow-components";
import { CalendarEvent } from "react-rainbow-components/components/WeeklyCalendar";

export interface PropsAdventurerSchedule {
  adventurerId: string;
  isOpen: boolean;
  setOpen: (value: boolean) => void;
}

const firstDay = new Date();
firstDay.setDate(firstDay.getDate() - firstDay.getDay());
const daysOfWeek = Array.from(Array(7), (_value, index) => {
  const day = new Date(firstDay);
  day.setDate(day.getDate() + index);
  return day;
});

const events: CalendarEvent[] = [
  {
    id: "1",
    title: "Reinier",
    startDate: new Date(daysOfWeek[0].setHours(6, 0, 0, 0)),
    endDate: new Date(daysOfWeek[0].setHours(6, 30, 0, 0)),
  },
  {
    id: "2",
    title: "JL Torres",
    startDate: new Date(daysOfWeek[0].setHours(7, 30, 0, 0)),
    endDate: new Date(daysOfWeek[0].setHours(8, 0, 0, 0)),
  },
  {
    id: "3",
    title: "Leandro Torres",
    startDate: new Date(daysOfWeek[0].setHours(11, 0, 0, 0)),
    endDate: new Date(daysOfWeek[0].setHours(12, 15, 0, 0)),
  },
  {
    id: "4",
    title: "Yuri V. Munayev",
    startDate: new Date(daysOfWeek[1].setHours(6, 30, 0, 0)),
    endDate: new Date(daysOfWeek[1].setHours(7, 30, 0, 0)),
  },
  {
    id: "5",
    title: "Tahimi",
    startDate: new Date(daysOfWeek[1].setHours(8, 0, 0, 0)),
    endDate: new Date(daysOfWeek[1].setHours(8, 15, 0, 0)),
  },
  {
    id: "6",
    title: "Tahimi L",
    startDate: new Date(daysOfWeek[2].setHours(8, 0, 0, 0)),
    endDate: new Date(daysOfWeek[2].setHours(9, 30, 0, 0)),
  },
  {
    id: "7",
    title: "Sara",
    startDate: new Date(daysOfWeek[3].setHours(6, 0, 0, 0)),
    endDate: new Date(daysOfWeek[3].setHours(6, 30, 0, 0)),
  },
  {
    id: "8",
    title: "Tahimi",
    startDate: new Date(daysOfWeek[3].setHours(6, 30, 0, 0)),
    endDate: new Date(daysOfWeek[3].setHours(7, 0, 0, 0)),
  },
  {
    id: "9",
    title: "Reinier",
    startDate: new Date(daysOfWeek[3].setHours(7, 30, 0, 0)),
    endDate: new Date(daysOfWeek[3].setHours(8, 15, 0, 0)),
  },
  {
    id: "10",
    title: "Sara P",
    startDate: new Date(daysOfWeek[4].setHours(6, 30, 0, 0)),
    endDate: new Date(daysOfWeek[4].setHours(8, 0, 0, 0)),
  },
  {
    id: "11",
    title: "Leo Torres",
    startDate: new Date(daysOfWeek[5].setHours(6, 0, 0, 0)),
    endDate: new Date(daysOfWeek[5].setHours(7, 0, 0, 0)),
  },
  {
    id: "12",
    title: "Tahimi",
    startDate: new Date(daysOfWeek[6].setHours(8, 0, 0, 0)),
    endDate: new Date(daysOfWeek[6].setHours(9, 30, 0, 0)),
  },
];

const AdventurerSchedule = ({
  adventurerId,
  isOpen = false,
  setOpen,
}: PropsAdventurerSchedule) => {
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date());
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setOpen(false)}
      style={{ width: "90%", height: "100%" }}
    >
      <h1 style={{ textAlign: "center" }}>Emploi du temps de l'aventurier</h1>
      <WeeklyCalendar
        events={events}
        currentWeek={currentWeek}
        onWeekChange={({ week }) => setCurrentWeek(week)}
        onEventClick={(event) => alert(event.title)}
        locale="en"
      />
    </Modal>
  );
};

export default AdventurerSchedule;
