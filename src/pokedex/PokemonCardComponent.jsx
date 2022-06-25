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
      expand: false,
    };
  }

  componentDidUpdate() {
    if (this.state.expand != this.props.expand)
      this.setState({
        expand: this.props.expand,
      });
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
    let pokemonMainType = this.state.data.info.types[0].type.name;
    let pokemonSecondyType = null;

    try {
      pokemonSecondyType = this.state.data.info.types[1].type.name;
    } catch (error) {}

    return (
      <div
        id="card-container"
        onClick={() => this.props.expandCard()}
        className={this.state.expand ? "extended" : null}
      >
        <div id="card" className={this.state.expand ? "extended" : null}>
          <img
            id="image-of-pokemon"
            src={this.props.data.info.sprites.other.home.front_default}
            alt="?"
          />

          <div
            id="description"
            className={this.state.expand ? "extended" : null}
          >
            <div>{name.charAt(0).toUpperCase() + name.slice(1)}</div>
          </div>
        </div>

        {
          <div
            id="information-container"
            className={this.state.expand ? "extended" : null}
          >
            <section></section>
          </div>
        }
      </div>
    );
  }
}

export default PokemonCardComponent;
