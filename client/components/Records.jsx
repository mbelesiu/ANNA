import React from 'react';
import EntryTitle from './EntryTitle.jsx'

function Records({ records, showRecord }) {
  if (records.length === 0) {
    return (
      <div>
        <h3>No records have been created at this time</h3>
      </div>)
  }
  return (
    <div>
      {records.map((record) => <EntryTitle key={record.id} record={record} showRecord={showRecord} />)}
    </div>
  )
};

export default Records;