import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all",
      },
    };
  }

  changeType = (event) => {
    this.setState({
      filters: { ...this.state.filters, type: event.target.value },
    });
  };

  getPets = () => {
    if (this.state.filters.type === "all") {
      fetch(`http://localhost:3001/api/pets`)
        .then((response) => response.json())
        .then((pets) => {
          pets.data.forEach((pet) => {
            this.state.pets.push(pet);
          });
        });
    } else {
      fetch(`http://localhost:3001/api/pets?type=${this.state.filters.type}`)
        .then((response) => response.json())
        .then((pets) => {
          pets.data.forEach((pet) => {
            this.state.pets.push(pet);
          });
        });
    }
  };

  adoptPet = () => {};

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.changeType}
                onFindPetsClick={this.getPets}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.adoptPet} pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
