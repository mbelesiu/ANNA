import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import $ from "jquery";


function MyCaledar(){
  const [dateState, setDateState] = useState(new Date())

  const changeDate = (e) => {
    setDateState(e)
  }
  const tileContent = ({ date, view }) => $('.even').css("background-color", "blue");
  const tileClassName = ({ date, view }) => view === 'month' && date.getDay()%2 === 0 ? 'even' : null;

  useEffect(() => {
    $('.even').css("background-color", "blue");
    console.log('badgar');
  })

  return (
    <>
    <Calendar
    value={dateState}
    onChange={changeDate}
    // tileContent={tileContent}
    tileClassName={tileClassName}

    />
    <p>Current selected date is <b>{moment(dateState).format('MMMM Do YYYY')}</b></p>
    </>
  )
}


export default MyCaledar;