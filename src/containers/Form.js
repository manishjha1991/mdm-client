import React, { Component } from "react";
import { Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Select from "react-select";
import axios, { post } from "axios";
import LoaderButton from "../components/LoaderButton";
import customStyles from "../components/Select";
import "./Form.css";
let apiUrl = "http://localhost:443/api";
export default class Update extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: "",
      isLoading: null,
      isCircleSelected: false,
      isCenterSelected: false,
      isStoreSelected: false,
      centers: [],
      selectedCenter: "",
      apps: [],
      selectedApps: [],
      circles: [],
      selectedCircles: "",
      stores: [],
      selectedStores: "",
      groups: [],
      selectedGroups: "",
      browsers: [],
      selectedbrowsers: []
    };
  }

  async componentDidMount() {
    const getAllCenter = await fetch(`${apiUrl}/center`);
    const getAllCenterJson = await getAllCenter.json();
    const getAllApps = await fetch(`${apiUrl}/app`);
    let getAllAppsJson = await getAllApps.json();
    const getAllBrowser = await fetch(`${apiUrl}/browser`);
    let getAllBrowserJson = await getAllBrowser.json();
    const getAllGroups = await fetch(`${apiUrl}/group`);
    let getAllGroupsJson = await getAllGroups.json();
    this.setState({
      centers: await getAllCenterJson.result.map(center => {
        return { value: center.centerId, label: center.centerName };
      }),
      apps: await getAllAppsJson.result.map((app, index) => {
        return { value: index.toString(), label: app };
      }),
      groups: await getAllGroupsJson.result.map(group => {
        return { value: group.groupId, label: group.groupName };
      }),
      browsers: await getAllBrowserJson.result.map((browser, index) => {
        return { value: index.toString(), label: browser };
      })
    });
  }

  getCenter = async selectedCenter => {
    this.setState({ selectedCenter });

    const getAllCircleFromCenter = await fetch(
      `${apiUrl}/store/${selectedCenter.value}/center`
    );
    let getAllCircleJson = await getAllCircleFromCenter.json();

    this.setState({
      circles: await getAllCircleJson.result.map(circle => {
        return { value: circle.circleId, label: circle.circleId };
      })
    });
  };
  getStores = selectedStores => {
    this.setState({ selectedStores });
  };
  getApps = selectedApps => {
    this.setState({ selectedApps });
  };
  getBrowser = selectedbrowsers => {
    this.setState({ selectedbrowsers });
  };

  getGroups = async selectedGroups => {
    this.setState({ selectedGroups });

    const getAllAppsFromGroup = await fetch(
      `${apiUrl}/app/${selectedGroups.value}`
    );
    const getAllBrowserFromGroup = await fetch(
      `${apiUrl}/browser/${selectedGroups.value}`
    );
    let getAllBrowserJson = await getAllBrowserFromGroup.json();
    let getAllAppJson = await getAllAppsFromGroup.json();
    this.setState({
      selectedApps: await getAllAppJson.result.map(app => {
        return { value: app.appId, label: app.appName };
      }),
      selectedbrowsers: await getAllBrowserJson.result.map(browser => {
        return { value: browser._id, label: browser.browserName };
      })
    });
  };

  getCircles = async selectedCircles => {
    this.setState({ selectedCircles });
    const getAllStoreFromCircle = await fetch(
      `${apiUrl}/store/${selectedCircles.value}/circle`
    );
    let getAllStoreJson = await getAllStoreFromCircle.json();

    this.setState({
      stores: await getAllStoreJson.result.map(store => {
        return { value: store.storeId, label: store.storeId };
      })
    });
  };
  fileUpload(file) {
    const url = `${apiUrl}/store/upload`;
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    return post(url, formData, config);
  }
  handleWalpaper = event => {
    this.setState({ file: event.target.files[0] });
    this.fileUpload(event.target.files[0]);
  };

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });
  };
  validateForm() {
    console.log(this.state.selectedCenter.value);
    return (
      this.state.selectedCenter.value &&
      this.state.selectedApps.length > 0 &&
      this.state.selectedCircles.value &&
      this.state.selectedGroups.value > 0 &&
      this.state.selectedStores.value > 0
    );
  }
  render() {
    return (
      <div className="Home">
        <Form onSubmit={this.handleSubmit}>
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
            <Select
              styles={customStyles}
              value={this.state.selectedCircles}
              onChange={this.getCircles}
              options={this.state.circles}
            />
          </FormGroup>
          <FormGroup controlId="store" bsSize="large">
            <ControlLabel>Select Store</ControlLabel>
            <Select
              styles={customStyles}
              value={this.state.selectedStores}
              onChange={this.getStores}
              options={this.state.stores}
            />
          </FormGroup>
          <FormGroup controlId="group" bsSize="large">
            <ControlLabel>Select Group</ControlLabel>
            <Select
              styles={customStyles}
              value={this.state.selectedGroups}
              onChange={this.getGroups}
              options={this.state.groups}
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
            <ControlLabel>Add Browser</ControlLabel>
            <Select
              styles={customStyles}
              value={this.state.selectedbrowsers}
              onChange={this.getBrowser}
              options={this.state.browsers}
              isMulti
            />
          </FormGroup>
          <FormGroup>
            <input
              className="value"
              type="file"
              onChange={this.handleWalpaper}
            />
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
