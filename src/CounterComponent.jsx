import { Component } from "react";

class CounterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };

    this.increment = this.increment.bind(this);
  }

  increment() {
    this.setState((prevState) => {
      return { counter: prevState.counter + 1 };
    });
  }

  render() {
    return (
      <div className="counter-content">
        <div>{this.state.counter}</div>
        <button onClick={this.increment}>count up</button>
      </div>
    );
  }
}

export default CounterComponent;
