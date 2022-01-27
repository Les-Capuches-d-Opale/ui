import { format, parseISO } from "date-fns";
import { useState } from "react";
import { useQuery } from "react-query";
import { Modal, WeeklyCalendar } from "react-rainbow-components";
import { CalendarEvent } from "react-rainbow-components/components/WeeklyCalendar";
import request from "../../axios";
import { Unavailabilities } from "../../sdk/adventurers";
export interface PropsAdventurerSchedule {
  adventurerId: string;
  isOpen: boolean;
  setOpen: (value: boolean) => void;
}

const COLORS = {
  DayOf: { backgroundColor: "rgba(145,220,193,1)", color: "rgba(0,171,142,1)" },
  Request: {
    backgroundColor: "rgba(253,230,230,1)",
    color: "rgba(254,72,73,1)",
  },
};

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
  console.log(adventurerId);
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date());

  const { data, error, isLoading } = useQuery<Unavailabilities[], Error>(
    "get unavailabilities",
    () =>
      request
        .get(`/adventurers/${adventurerId}/unavailability`)
        .then((res) => res.data)
  );

  const toto: any = data?.map((unavailability, i) => {
    console.log(
      "date",
      format(parseISO(unavailability.dateStart), "yyyy-MM-dd")
      // format(
      //   new Date("2022-23-01T00:00:00.000Z"),
      //   "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
      // )
      // parseISO("2022-23-01T00:00:00.000Z"),
      // format(new Date("2022-23-01T00:00:00.000Z"), "MM/dd/yyyy 'at' h:m a")
      // format(
      //   parse(unavailability.dateStart, "yyyy-MM-dd HH:mm:ss", new Date()),
      //   "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
      // )
    );
    return {
      id: `${i}`,
      title: "Tahimi",
      startDate: new Date(Date.parse(unavailability.dateStart)),

      endDate: new Date(daysOfWeek[3].setHours(7, 0, 0, 0)),
    };
  });

  console.log(toto);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setOpen(false)}
      style={{ width: "90%", height: "100%" }}
    >
      <h1 style={{ textAlign: "center" }}>Emploi du temps de l'aventurier</h1>
      <WeeklyCalendar
        events={toto}
        currentWeek={currentWeek}
        onWeekChange={({ week }) => setCurrentWeek(week)}
        onEventClick={(event) => alert(event.title)}
        locale="en"
      />
    </Modal>
  );
};

export default AdventurerSchedule;
