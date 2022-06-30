import axios from "axios";
import React, { Component } from "react";
import filterList from "./filter";
import "./css/Pokedex.css";
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
        alphabeticalToggle: false,
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
    let element = e.target;
    if (e.target.nodeName !== "DIV") element = e.target.parentNode;

    this.setState(() => {
      return { currentSelected: element.id };
    });
  }

  setFilter(types, number, name, alphabetical) {
    this.setState({
      filtered: false,
      activeFilters: {
        typeFilters: types,
        nameFilter: name,
        indexFilter: number,
        alphabeticalToggle: alphabetical,
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
    if (this.state.pokemonFetched) {
      this.handleSelection(
        previousState.currentSelected,
        this.state.currentSelected
      );
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
          res.forEach((pokemon) => {
            listOfPokemon.push(pokemon.data);
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
      <div className="content bg-pokemon ">
        <div id="pokedex">
          <div
            className={this.state.expand ? "no-display wrapper" : " wrapper"}
          >
            <ul id="list-of-pokemon">
              {this.state.pokemonFetched &&
                this.state.filteredListOfPokemon.map((p, id) => (
                  <div
                    onClick={(e) => this.select(e)}
                    key={p.id - 1}
                    id={p.id - 1}
                    className="pokemon-name centered pokedex-entry start"
                  >
                    <span className="ml">
                      {" "}
                      {p.id.toString().padStart(3, "0")}
                    </span>

                    <span className="mr">
                      {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
                    </span>
                  </div>
                ))}
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

  handleSelection(prev, curr) {
    if (prev === curr) {
      if (
        -1 !==
        this.state.filteredListOfPokemon.findIndex((p) => {
          return p.id - 1 == this.state.currentSelected;
        })
      ) {
        document.getElementById(curr).classList.add("selected");
        this.sleep(15)
          .then((r) => {
            document
              .getElementById(this.state.currentSelected)
              .scrollIntoView({ behavior: "smooth", block: "center" });
          })
          .catch(() => {
            if (this.state.filteredListOfPokemon.length !== 0) {
              document
                .getElementById(this.state.filteredListOfPokemon[0].id - 1)
                .scrollIntoView({ behavior: "smooth", block: "center" });
            }
          });
      }
    } else {
      if (
        -1 !==
        this.state.filteredListOfPokemon.findIndex((p) => {
          return p.id - 1 == curr;
        })
      )
        document.getElementById(curr).classList.add("selected");
      this.sleep(15)
        .then((r) => {
          document
            .getElementById(this.state.currentSelected)
            .scrollIntoView({ behavior: "smooth", block: "center" });
        })
        .catch(() => {
          if (this.state.filteredListOfPokemon.length !== 0) {
            document
              .getElementById(this.state.filteredListOfPokemon[0].id - 1)
              .scrollIntoView({ behavior: "smooth", block: "center" });
          }
        });

      if (
        -1 !==
        this.state.filteredListOfPokemon.findIndex((p) => {
          return p.id - 1 == prev;
        })
      ) {
        document.getElementById(prev).classList.remove("selected");
      }
    }
  }
  sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };
}

export default Pokedex;
