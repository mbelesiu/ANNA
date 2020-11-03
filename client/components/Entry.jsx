import React from 'react';

function Entry({ record, hideCurrentRecord}) {
  if (record === false) {
    return null;
  }
  return (
    <div>
      <h4>Entry{record.id}</h4>
      <p>{record.date}</p>
      <ul>{Object.keys(record.body).map((entry) => <li><p><b>{entry}</b></p><p>{record.body[entry]}</p></li>)}</ul>
      <button onClick={hideCurrentRecord}>close</button>
    </div>
  )
};

export default Entry;