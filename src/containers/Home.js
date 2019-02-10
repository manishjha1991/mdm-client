import React, { Component } from "react";
import {
  Card,
  CardImg,
  Button,
  ListGroup,
  ListGroupItem,
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
  walpaper =
    "https://s3-ap-southeast-1.amazonaws.com/bsy/iportal/images/airtel-logo-white-text-horizontal.jpg";
  render() {
    return this.state.device.map((note, i) => (
      <div className="Home">
        <Col sm="4">
          <Card style={{ width: "25rem" }}>
            <CardImg
              style={{ width: "100%" }}
              variant="top"
              src={this.walpaper}
            />
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                <b>Circle ID:</b>
                {note.circleId}
              </ListGroupItem>
              <ListGroupItem>
                <b>Store ID:</b>:{note.storeId}
              </ListGroupItem>
              <ListGroupItem>
                <b>Device ID:</b>
                {note.deviceId}
              </ListGroupItem>
              <ListGroupItem>
                <b>Group Name:</b>
                {note.groupName}
              </ListGroupItem>
              <ListGroupItem>
                <b>Apps</b>
                <ListGroupItem>
                  {note.selectedApps.map(app => {
                    return <Button bsStyle="success">{app.appName}</Button>;
                  })}
                </ListGroupItem>
              </ListGroupItem>
              <ListGroupItem>{}</ListGroupItem>
              <ListGroupItem>
                <b>Browser</b>
              </ListGroupItem>
              <ListGroupItem>
                {note.selectedBrowser.map(browser => {
                  return (
                    <Button bsStyle="success">{browser.browserName}</Button>
                  );
                })}
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
        {/* </div> */}
      </div>
    ));
  }
}
