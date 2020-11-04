import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import { Card, Col, Row, Icon } from 'react-materialize';

function EntryTitle({ record, showRecord }) {
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

        </Card>
      </Col>
    </Row>
  )
};

export default EntryTitle;