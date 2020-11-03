import React from 'react';

function Entry({ record }) {
  if (record === false) {
    return null;
  }
  return (
    <div>
      <h4>Entry{record.id}</h4>
      <p>{record.date}</p>
      <p>{record.body}</p>
    </div>
  )
};

export default Entry;