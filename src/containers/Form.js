import React, { Component } from "react";
import { Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Select from "react-select";
import { uniqBy } from "lodash";
import LoaderButton from "../components/LoaderButton";
import customStyles from "../components/Select";
import "./Form.css";
let apiUrl = "http://localhost:443/api";
export default class Update extends Component {
  constructor(props) {
    super(props);

    this.state = {
      centers: [],
      selectedCenter: "",
      apps: [],
      selectedApps: []
    };
  }

  async componentDidMount() {
    const getAllCenter = await fetch(`${apiUrl}/center`);
    const getAllCenterJson = await getAllCenter.json();
    const getAllApps = await fetch(`${apiUrl}/app`);
    let getAllAppsJson = await getAllApps.json();
    this.setState({
      centers: await getAllCenterJson.result.map(center => {
        return { value: center.centerId, label: center.centerName };
      }),
      apps: await getAllAppsJson.result.map((app, index) => {
        return { value: index, label: app };
      })
    });
  }

  getCenter = selectedCenter => {
    this.setState({ selectedCenter });
    console.log(`Option selected:`, selectedCenter);
  };
  getApps = selectedApps => {
    this.setState({ selectedApps });
    console.log(`Option selected:`, selectedApps);
  };
  validateForm() {
    return (
      this.state.selectedCenter.length > 0 &&
      this.state.selectedCenter.length > 0
    );
  }
  render() {
    console.log(this.state);
    return (
      <div className="Home">
        <Form>
          <FormGroup controlId="cnter" bsSize="large">
            <ControlLabel>Select Center</ControlLabel>
            <Select
              styles={customStyles}
              value={this.state.selectedCenter}
              onChange={this.getCenter}
              options={this.state.centers}
            />
          </FormGroup>
          <FormGroup controlId="circle" bsSize="large">
            <ControlLabel>Select Circle</ControlLabel>
            <FormControl />
          </FormGroup>
          <FormGroup controlId="store" bsSize="large">
            <ControlLabel>Select Store</ControlLabel>
            <FormControl />
          </FormGroup>
          <FormGroup controlId="group" bsSize="large">
            <ControlLabel>Select Group</ControlLabel>
            <Select
              styles={customStyles}
              value={this.state.selectedCenter}
              onChange={this.handleChange}
              options={this.state.centers}
              isMulti
            />
          </FormGroup>
          <FormGroup controlId="apps" bsSize="large">
            <ControlLabel>Add Apps</ControlLabel>
            <Select
              styles={customStyles}
              value={this.state.selectedApps}
              onChange={this.getApps}
              options={this.state.apps}
              isMulti
            />
          </FormGroup>
          <FormGroup controlId="cnter" bsSize="large">
            <ControlLabel>Browser</ControlLabel>
            <FormControl />
          </FormGroup>
          <FormGroup controlId="cnter" bsSize="large">
            <ControlLabel>Add Browser</ControlLabel>
            <FormControl />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Submit"
            loadingText="Submitting…"
          />
        </Form>
      </div>
    );
  }
}
