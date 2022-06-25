import axios from "axios";
import React, { Component } from "react";
import filterList from "./filter";
import "./Pokedex.css";
import PokemonCardComponent from "./PokemonCardComponent";
import FilterComponent from "./FilterComponent";

class Pokedex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listOfPokemon: [],
      filteredListOfPokemon: [],
      activeFilters: {
        typeFilters: [],
        nameFilter: "",
        indexFilter: 0,
      },
      pokemonFetched: false,
      filtered: false,
      currentSelected: 0,
      expand: false,
    };

    this.setFilter = this.setFilter.bind(this);
    this.expandCard = this.expandCard.bind(this);
  }

  expandCard() {
    this.setState({ expand: !this.state.expand });
  }

  select(e) {
    this.setState(() => {
      return { currentSelected: e.target.id };
    });
  }

  setFilter(types, number, name) {
    this.setState({
      filtered: false,
      activeFilters: {
        typeFilters: types,
        nameFilter: name,
        indexFilter: number,
      },
    });
  }

  componentDidUpdate(previousProps, previousState) {
    if (this.state.activeFilters !== previousState.activeFilters) {
      let filteredListOfPokemon = this.state.listOfPokemon;
      let newSelected = this.state.currentSelected;
      filteredListOfPokemon = filterList(
        filteredListOfPokemon,
        this.state.activeFilters
      );

      this.setState({
        filteredListOfPokemon: filteredListOfPokemon,
        filtered: true,
        currentSelected: newSelected,
      });
    }

    if (previousState.currentSelected === this.state.currentSelected) {
      if (
        -1 !==
        this.state.filteredListOfPokemon.findIndex((p) => {
          return p.id - 1 == this.state.currentSelected;
        })
      ) {
        document
          .getElementById(this.state.currentSelected)
          .classList.toggle("selected");

        //  document
        //    .getElementById(this.state.currentSelected)
        //    .scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
    if (previousState.currentSelected !== this.state.currentSelected) {
      if (
        -1 !==
        this.state.filteredListOfPokemon.findIndex((p) => {
          return p.id - 1 == previousState.currentSelected;
        })
      ) {
        document
          .getElementById(previousState.currentSelected)
          .classList.toggle("selected");
      }

      document
        .getElementById(this.state.currentSelected)
        .classList.toggle("selected");
    }
  }

  componentDidMount() {
    let listOfUrls = [];
    let listOfPokemon = [];

    for (let index = 1; index <= 493; index++) {
      let url = `https://pokeapi.co/api/v2/pokemon/${index}/`;
      listOfUrls.push(url);
    }
    const fetchPokemon = async () => {
      const res = await axios
        .all(listOfUrls.map((url) => axios.get(url)))
        .then((res) =>
          res.forEach((item) => {
            listOfPokemon.push(item.data);
          })
        );

      let filteredListOfPokemon = filterList(
        listOfPokemon,
        this.state.activeFilters
      );
      this.setState({
        listOfPokemon: listOfPokemon,
        filteredListOfPokemon: filteredListOfPokemon,
        pokemonFetched: true,
      });
    };

    fetchPokemon();
  }

  render() {
    document.title = "Pokedex";
    return (
      <div className="content ">
        <div id="pokedex">
          <div
            className={this.state.expand ? "no-display wrapper" : " wrapper"}
          >
            <ul id="list-of-pokemon">
              <div className="pokemon-name centered pokedex-entry dummy">
                dummy
              </div>
              <div className="pokemon-name centered pokedex-entry dummy">
                dummy
              </div>
              {this.state.pokemonFetched &&
                this.state.filteredListOfPokemon.map((p, id) => (
                  <div
                    onClick={(e) => this.select(e)}
                    key={p.id - 1}
                    id={p.id - 1}
                    className="pokemon-name centered pokedex-entry"
                  >
                    {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
                  </div>
                ))}
              <div className="pokemon-name centered pokedex-entry dummy">
                dummy
              </div>
              <div className="pokemon-name centered pokedex-entry dummy">
                dummy
              </div>
            </ul>
          </div>

          {this.state.pokemonFetched && (
            <FilterComponent
              expand={this.state.expand}
              setFilter={this.setFilter}
            ></FilterComponent>
          )}

          {this.state.pokemonFetched && (
            <PokemonCardComponent
              expand={this.state.expand}
              expandCard={this.expandCard}
              data={{
                info: this.state.listOfPokemon[this.state.currentSelected],
              }}
            ></PokemonCardComponent>
          )}
        </div>
      </div>
    );
  }
}

export default Pokedex;
