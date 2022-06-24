import { Component } from "react";

class FilterComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: false,
    };
  }

  setFilter(e) {
    let element = document.getElementById(e.target.id);
    element.classList.toggle("selected-filter");
    this.props.setFilter(e);
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
      <div id="filter-section" className="no-display">
        {!this.state.display && (
          <div
            onClick={() => {
              this.setState({ display: true });
            }}
          >
            filter
          </div>
        )}

        {this.state.display && (
          <ul id="list-of-filters">
            <li
              onClick={() => {
                this.setState({ display: false });
              }}
            >
              close Filter
            </li>
            {ListOfFilter.map((f) => {
              return (
                <li key={f}>
                  <div className="type-filter-item ">
                    <div
                      id={f}
                      onClick={(e) => this.setFilter(e)}
                      className="type-filter-item-text"
                    >
                      {f}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}

export default FilterComponent;
