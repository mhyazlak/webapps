import { Component } from "react";
import axios from "axios";
import "./pokecard.css";

class PokemonCardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      info: null,
      fetched: null,
      expanded: true,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.data !== prevState.data) {
      return { data: nextProps.data };
    }
    return null;
  }

  render() {
    let entryNumber = this.state.data.info.id;
    let name = this.state.data.info.name;

    return (
      <div
        id="card-container"
        className={this.state.expanded ? "expanded" : null}
      >
        <div
          id="card"
          className={this.state.expanded ? "expanded centered" : "centered"}
        >
          <img
            src={this.props.data.info.sprites.other.home.front_default}
            alt="?"
          />
          <div
            id="description"
            className={this.state.expanded ? "expanded" : null}
          >
            <div>{entryNumber}</div>
            <div>{name.charAt(0).toUpperCase() + name.slice(1)}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default PokemonCardComponent;
