import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import _ from 'underscore';
import $ from "jquery";


function MyCaledar({ records, showRecord }) {
  const [dateState, setDateState] = useState(new Date())
  const [dateHasRecord, setDateHasRecord] = useState([])
  const [changeCalendarView, setChangeCalendarView] = useState(true);

  const changeDate = (e) => {
    setDateState(e)
  }

  const tileClassName = ({ date, view }) => view === 'month' && date.getDay() % 2 === 0 ? 'even' : null;

  const hasRecord = ({ date, view }) => {
    // console.log('badgar')
    //  console.log(dateHasRecord.indexOf(moment(date).format('ddd MMM D YYYY')))
    //  console.log(dateHasRecord)
    if (view === 'month' && dateHasRecord.indexOf(moment(date).format('ddd MMM DD YYYY')) !== -1) {
      return 'hasRecord';
    }
  }

  const showPastRecord = (value, event) => {
    let dateToCheck = moment(value).format('ddd MMM DD YYYY');


    for (let i = 0; i < records.length; i++) {
      if (records[i].date === dateToCheck) {
        console.log(`here ${dateToCheck}`)
        showRecord(records[i]);
        break;
      }
    }

    console.log('Clicked day: ', dateToCheck);
  }

  useEffect(() => {
    if (_.size(records) !== 0) {
      setDateHasRecord(records.map((record) => record.date))
    }
  }, [records])

  useEffect(() => {
    $('.hasRecord').css("background-color", "blue");

  })


  return (
    <>
      <Calendar
        value={dateState}
        onChange={setDateState}
        tileClassName={hasRecord}
        onClickDay={showPastRecord}
        onActiveStartDateChange={()=>setChangeCalendarView(!changeCalendarView)}
      />
      <p>Current selected date is <b>{moment(dateState).format('ddd MMM DD YYYY')}</b></p>
    </>
  )
}


export default MyCaledar;