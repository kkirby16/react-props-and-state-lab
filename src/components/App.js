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
      ...this.state,
      filters: { ...this.state.filters, type: event.target.value },
    });
  };

  getPets = () => {
    if (this.state.filters.type === "all") {
      fetch(`/api/pets`)
        .then((response) => response.json())
        .then((pets) => {
          this.setState({
            ...this.state,
            pets: pets,
          });
          // console.log(petsArray);
          // this.state.pets.push(pet);
        });
    } else {
      fetch(`/api/pets?type=${this.state.filters.type}`)
        .then((response) => response.json())
        .then((pets) => {
          this.setState({
            ...this.state,
            pets: pets,
          });
        });
    }
  };

  adoptPet = (id) => {
    //console.log("adoptingPet", id);
    const matchingPet = this.state.pets.find((pet) => pet.id === id);
    // console.log("matchingPet:", matchingPet);
    matchingPet.isAdopted = true;
    console.log(matchingPet);
  };

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
