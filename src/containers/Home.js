import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
  CardText,
  CardLink,
  Col
} from "reactstrap";
import "./Home.css";
let apiUrl = "http://localhost:443/api";
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      device: []
    };
  }

  async componentDidMount() {
    const getAllStore = await fetch(`${apiUrl}/store`);
    const getAllStoreJson = await getAllStore.json();
    this.setState({
      device: getAllStoreJson.result
    });
  }
  render() {
    return this.state.device.map((note, i) => (
      <div className="Home">
        <Col sm="4">
          <Card style={{ width: "18rem" }}>
            <CardImg variant="top" src="holder.js/100px180?text=Image cap" />
            <CardBody>
              <CardTitle>{note.circleId}</CardTitle>
              <CardTitle>{note.deviceId}</CardTitle>
              <CardText>{note.groupName}</CardText>
            </CardBody>
            <ListGroup className="list-group-flush">
              <ListGroupItem>{}</ListGroupItem>
              <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
              <ListGroupItem>Vestibulum at eros</ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
        {/* </div> */}
      </div>
    ));
  }
}
