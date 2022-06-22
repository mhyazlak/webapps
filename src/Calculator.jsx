import { Component } from "react";
import "./Calculator.css";
import NumberButtonComponent from "./NumberButtonComponent";
import OperatorButtonComponent from "./OperatorButtonComponent";
import operate from "./operate";

class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSum: 0,
      nextSum: 0,
      displayedResult: 0,
      currentOperator: "=",
    };
    this.calculate = this.calculate.bind(this);
    this.operate = this.operate.bind(this);
  }
  componentDidUpdate() {
    console.log(this.state);
  }

  calculate(value) {
    this.setState((prevState) => {
      let display = prevState.currentSum + prevState.currentOperator;
      console.log(display);
      if (prevState.currentOperator === "=") {
        return {
          nextSum: prevState.nextSum * 10 + value,
          displayedResult: prevState.nextSum * 10 + value,
          currentSum: prevState.nextSum * 10 + value,
        };
      } else {
        return {
          nextSum: prevState.nextSum * 10 + value,
          displayedResult: display + (prevState.nextSum * 10 + value),
        };
      }
    });
  }

  operate(operator) {
    this.setState(() => {
      return operate(this.state, operator);
    });
  }

  render() {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const operators = {
      plus: "+",
      minus: "-",
      multi: "x",
      divide: "/",
      dot: ".",
      equal: "=",
      delete: "Del",
      clear: "C",
    };
    return (
      <div className="calculator">
        <div className="display">
          <div id="number">{this.state.displayedResult}</div>
        </div>
        <div id="numpad">
          {numbers.map((n) => (
            <NumberButtonComponent
              id={"a" + n}
              className="number centered"
              value={n}
              calculate={this.calculate}
            ></NumberButtonComponent>
          ))}
          {Object.entries(operators).map(([key, value]) => (
            <OperatorButtonComponent
              id={key}
              className="number centered"
              value={value}
              operate={this.operate}
            ></OperatorButtonComponent>
          ))}
        </div>
      </div>
    );
  }
}

export default Calculator;
