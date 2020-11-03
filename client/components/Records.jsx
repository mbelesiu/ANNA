import React from 'react';
import EntryTitle from './EntryTitle.jsx'

function Records({ records, showRecord }) {
  return (
    <div>
      {records.map((record) => <EntryTitle key={record.id} record={record} showRecord={showRecord} />)}
    </div>
  )
};

export default Records;