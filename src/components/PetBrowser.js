import React from "react";

import Pet from "./Pet";

class PetBrowser extends React.Component {
  createPets = () => {
    return this.props.pets.map((pet) => {
      return <Pet pet={pet} onAdoptPet={this.props.onAdoptPet} />;
    });
  };

  render() {
    // console.log(this.props.pets);
    // console.log("petbrowserprops:", this.props);
    // return "test";

    return <div className="ui cards">{this.createPets()}</div>;
  }
}

export default PetBrowser;
