import React from 'react';

function EntryTitle({ record, showRecord }) {
  return (
    <div>
      <h6 onClick={() => showRecord(record)}>Entry{record.id}</h6>
      <p>{record.date}</p>
    </div>
  )
};

export default EntryTitle;