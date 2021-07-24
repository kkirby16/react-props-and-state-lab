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
      fetch(`/api/pets`)
        .then((response) => response.json()
        .then((pets) => {
          const petsArray = []
          pets.forEach((pet) => {
            petsArray.push(pet)
            this.setState({
              pets: {...petsArray}
            })
            // this.state.pets.push(pet);
          });
        });
    } else {
      fetch(`/api/pets?type=${this.state.filters.type}`)
        .then((response) => response.json()
        .then((pets) => {
          const petsArray = []
          pets.forEach((pet) => {
            petsArray.push(pet)
            this.setState({
              pets: {...petsArray}
            })
            
          });
        });
   
      }
    }
    



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
              <PetBrowser onAdoptPet={this.adoptPet} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
