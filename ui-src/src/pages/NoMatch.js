import * as React from 'react';
import { Row, Col, CardPanel, Navbar, NavItem, Input, Modal, Button } from 'react-materialize';

const NoMatch = () =>
  <div className="container-fluid">
    <Row>
      <Col s={12}>
        <CardPanel className="jumbotron">
          <h1>404 App Not Found</h1>
          <h1>
            <span role="img" aria-label="Face With Rolling Eyes Emoji">
              🙄
            </span>
          </h1>
        </CardPanel>
      </Col>
    </Row>
  </div>;

export default NoMatch;
