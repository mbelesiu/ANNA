import React from 'react';
import styled, { keyframes } from 'styled-components';
import { fadeIn, fadeOut } from 'react-animations';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import { Card, Col, Row, Icon, Button } from 'react-materialize';

function Entry({ record, hideCurrentRecord }) {
  if (record === false) {
    return null;
  }
  return (
    <Wrapper>
      <Row>
        <Col
          m={20}
          s={12}
        >
          <Card
            actions={[
              <Button onClick={hideCurrentRecord} >close</Button>
            ]}
            onClick={() => showRecord(record)}
            className="blue-grey darken-1"
            closeIcon={<Icon>close</Icon>}
            revealIcon={<Icon>more_vert</Icon>}
            textClassName="white-text"
            title={<h3>{`Entry ${record.id}`}</h3>}
            options={{
              outDuration: 250
            }}
          >
            Date Recorded: {record.date}
            <ul>{Object.keys(record.body).map((entry) => <li><Text><p><b>{entry}</b></p><p>{record.body[entry]}</p></Text></li>)}</ul>
          </Card>
        </Col>
      </Row>
    </Wrapper>
  )
};

const fadingIn = keyframes`${fadeIn}`;
const fadingOut = keyframes`${fadeOut}`;

const Text = styled.div`
  font-size: 20px;
`;
const Wrapper = styled.div`
animation: 1s ${fadingIn};
`;


export default Entry;