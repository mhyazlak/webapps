import axios from "axios";
import { Component } from "react";
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
      currentSelected: 1,
    };

    this.setFilter = this.setFilter.bind(this);
  }

  select(e) {
    this.setState(() => {
      return { currentSelected: e.target.id };
    });
  }

  setFilter(e) {
    let id = e.target.id;

    const newActiveFilters = this.state.activeFilters.typeFilters;
    if (!newActiveFilters.includes(id)) newActiveFilters.push(id);
    else newActiveFilters.splice(newActiveFilters.indexOf(id), 1);
    this.setState({
      filtered: false,
      activeFilters: {
        ...this.state.activeFilters,
        typeFilters: newActiveFilters,
      },
    });
  }

  componentDidUpdate(previousProps, previousState) {
    if (this.state.activeFilters !== previousState.activeFilters) {
      let filteredListOfPokemon = this.state.listOfPokemon;
      filteredListOfPokemon = filterList(
        filteredListOfPokemon,
        this.state.activeFilters
      );
      this.setState({
        filteredListOfPokemon: filteredListOfPokemon,
        filtered: true,
        currentSelected: filteredListOfPokemon[0].id - 1,
      });
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
          <div className="wrapper no-display">
            <ul id="list-of-pokemon">
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
            </ul>
          </div>

          {this.state.pokemonFetched && (
            <FilterComponent setFilter={this.setFilter}></FilterComponent>
          )}

          {this.state.pokemonFetched && (
            <PokemonCardComponent
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
