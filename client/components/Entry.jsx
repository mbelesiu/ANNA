import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import { Card, Col, Row, Icon, Button } from 'react-materialize';

function Entry({ record, hideCurrentRecord}) {
  if (record === false) {
    return null;
  }
  return (
<Row>
<Col
  m={20}
  s={12}
>
  <Card
    onClick={() => showRecord(record)}
    className="blue-grey darken-1"
    closeIcon={<Icon>close</Icon>}
    revealIcon={<Icon>more_vert</Icon>}
    textClassName="white-text"
    title={`Entry ${record.id}`}
  >
    {record.date}
    <ul>{Object.keys(record.body).map((entry) => <li><p><b>{entry}</b></p><p>{record.body[entry]}</p></li>)}</ul>
  </Card>
  <Button onClick={hideCurrentRecord} >close</Button>
</Col>
</Row>
  )
};

export default Entry;