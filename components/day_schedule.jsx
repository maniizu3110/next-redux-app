
import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { useEffect, useState } from "react";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";
import axios from "axios";


const currentDate = "2021-06-29"

const DaySchedule = () => {
  const [scheduleList, setScheduleList] = useState([]);
  useEffect(() => {
    let data = [];
    async function getData() {
      const schedules = await axios
        .get(`http://localhost:8080/api/v1/schedule/${3}`)
        .then((res) => {
          return res.data;
        });
      schedules.map((i) => {
        data.push({
          startDate: i.start.dateTime,
          endDate: i.end.dateTime,
          title: i.summary,
        });
      });
      // console.log(data)
      setScheduleList(data)
      // setScheduleList([
      //   {
      //     startDate: "2018-11-01T09:45",
      //     endDate: "2018-11-01T11:00",
      //     title: "Meeting",
      //   },
      //   // {
      //   //   startDate: "2018-11-01T12:00",
      //   //   endDate: "2018-11-01T13:30",
      //   //   title: "Go to a gym",
      //   // },
      // ]);
      console.log(data)
      console.log("スケジュールをセットしました")
    }
    getData()
  },[])
        return (
          <Paper>
            <Scheduler data={scheduleList}>
              <ViewState currentDate={currentDate} />
              <DayView startDayHour={2} endDayHour={23} />
              <Appointments />
            </Scheduler>
          </Paper>
        );
}

export default DaySchedule