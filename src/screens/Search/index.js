import React, { Component } from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Table } from "react-bootstrap";
import { getPlanets } from "./action";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";
import "./search.css";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      planetList: null,
      sortedList: [],
      modalShow: false,
      modalData: ""
    };
  }

  componentDidMount() {
    const auth = localStorage.getItem("auth");
    if (auth) {
      this.props.getPlanets();
    } else {
      this.props.history.push("/login");
    }
  }

  static getDerivedStateFromProps(nextProps, state) {
    var planets =
      nextProps &&
      nextProps.planets &&
      nextProps.planets.planetsReducer &&
      nextProps.planets.planetsReducer.planets;
    if (planets && planets.results && planets.results.length > 0) {
      const sortData = planets.results.sort(function(a, b) {
        if (a.population === "unknown") {
          a = {
            population: 0
          };
        }
        if (b.population === "unknown") {
          b = {
            population: 0
          };
        }

        return parseInt(a.population) - parseInt(b.population);
      });

      return {
        planetList: sortData
      };
    }
    return {
      planetList: state.planetList
    };
  }

  onChange = e => {
    this.setState({
      searchText: e.target.value
    });
  };

  filterData = () => {
    var text = this.state.searchText;
    const newData = this.state.planetList.filter(item => {
      const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    return newData;
  };

  showDetails = item => {
    this.setState({
      modalShow: true,
      modalData: item
    });
  };

  logout = () => {
    localStorage.removeItem("auth");
    this.props.history.push("/login");
  };

  render() {
    var item = this.state.modalData;
    var planetList = null;
    if (this.state.searchText !== "") {
      planetList = this.filterData();
    } else {
      planetList = this.state.planetList;
    }

    return (
      <div className="bg">
        <div className="container">
          <button
            className="btn btn-danger"
            style={{ position: "absolute", right: 15, top: 15 }}
            onClick={() => this.logout()}
          >
            Logout
          </button>
          {this.state.modalShow && (
            <Modal
              size="md"
              show={this.state.modalShow}
              onHide={() => this.setState({ modalShow: false })}
              aria-labelledby="example-modal-sizes-title-sm"
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                  Planet Detail
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Planet Name</th>
                      <th>Population</th>
                      <th>Rotation Period</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{item.name}</td>
                      <td>{item.population}</td>
                      <td>{item.rotation_period}</td>
                    </tr>
                  </tbody>
                </Table>
              </Modal.Body>
            </Modal>
          )}
          <div className="row ">
            <ToastsContainer
              store={ToastsStore}
              position={ToastsContainerPosition.TOP_CENTER}
              lightBackground
            />
            <div className="col-md-4  offset-md-4 col-9 justify-content-center">
              <input
                type="text"
                placeholder="Search with planet name"
                value={this.state.searchText}
                className="form-control mt-3 mb-5"
                onChange={e => this.onChange(e)}
              />
            </div>
          </div>
          <div className="row">
            {planetList &&
              planetList.map((item, key) => (
                <div className="col-md-3 text-center" key={key}>
                  <button
                    className="button"
                    onClick={() => this.showDetails(item)}
                  >
                    <img
                      src={require("../../assets/planet.png")}
                      style={{
                        height: "auto",
                        width: 90 + key * 4
                      }}
                      alt=""
                      className="image"
                    />
                    <p style={{ fontSize: 18 + key, fontWeight: "bold" }}>
                      {item.name}
                    </p>
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  planets: state
});

const mapDispatchToProps = dispatch => ({
  getPlanets: () => dispatch(getPlanets())
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
