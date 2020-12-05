import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import EntryTitle from './EntryTitle.jsx'
import _ from 'underscore';

function Records({ records, showRecord }) {
  if (_.size(records) === 0) {
    return (
      <div>
        <h3>No records have been created at this time</h3>
      </div>)
  }
   console.log('records');
  return (
    <div>
      {records.map((record) => <EntryTitle key={record.id} record={record} showRecord={showRecord} />)}
    </div>
  )
};

export default Records;