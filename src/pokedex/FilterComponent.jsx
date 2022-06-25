import { Component } from "react";
import "./filter.css";
class FilterComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: false,
      expand: false,

      numberFilter: 0,
      typeFilters: [],
      nameFilter: "",
    };
  }

  setFilter(types, number, name) {
    this.props.setFilter(types, number, name);
  }

  setTypeFilter(e) {
    let element = document.getElementById(e.target.id);
    if (
      this.state.typeFilters.length + 1 <= 2 ||
      element.classList.contains("selected-filter")
    ) {
      element.classList.toggle("selected-filter");
      let id = e.target.id;
      const newTypeFilters = this.state.typeFilters;
      if (!newTypeFilters.includes(id)) newTypeFilters.push(id);
      else newTypeFilters.splice(newTypeFilters.indexOf(id), 1);
      this.setState({
        typeFilters: newTypeFilters,
      });
    }
  }

  setNumberFilter(e) {
    let value = e.target.value;
    this.setState({
      numberFilter: value,
    });
  }

  setNameFilter(e) {
    let value = e.target.value;
    this.setState({
      nameFilter: value,
    });
  }

  componentDidUpdate(previousProps, previousState) {
    if (this.state !== previousState) {
      this.setFilter(
        this.state.typeFilters,
        this.state.numberFilter,
        this.state.nameFilter
      );
    }

    if (this.state.expand != this.props.expand)
      this.setState({
        expand: this.props.expand,
      });
  }

  render() {
    const ListOfFilter = [
      "bug",
      "dark",
      "dragon",
      "electric",
      "fairy",
      "fighting",
      "fire",
      "flying",
      "ghost",
      "grass",
      "ground",
      "ice",
      "normal",
      "poison",
      "psychic",
      "rock",
      "steel",
      "water",
    ];

    return (
      <div
        id="filter-section"
        className={this.state.expand ? "no-display" : null}
      >
        <h2>Filters</h2>
        <hr />
        <div id="pokename-seach" className="centered">
          <div>Search for Name</div>
          <input type="text" onChange={(e) => this.setNameFilter(e)} />
        </div>

        <hr />
        <div className="centered">
          <div>Search for Pokedexnumber</div>
          <input type="number" onChange={(e) => this.setNumberFilter(e)} />
        </div>

        <hr />
        <div className="centered ">
          <ul id="list-of-filters" className="">
            {ListOfFilter.map((f) => {
              return (
                <li key={f}>
                  <div className="type-filter-item ">
                    <img
                      id={f}
                      className="type-icon"
                      onClick={(e) => this.setTypeFilter(e)}
                      src={require(`./type-icons/${f}64.png`)}
                      alt=""
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default FilterComponent;
