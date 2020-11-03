import React from 'react';

function EntryTitle({ record, showRecord }) {
  return (
    <div>
      <h4 onClick={() => showRecord(record)}>Entry{record.id}</h4>
      <p>{record.date}</p>
    </div>
  )
};

export default EntryTitle;