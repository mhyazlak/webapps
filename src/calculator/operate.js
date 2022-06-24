function operate(state, op) {
  console.log(state);
  const initial = {
    currentSum: 0,
    nextSum: 0,
    displayedResult: 0,
    currentOperator: "=",
  };

  if (op === "Del") return initial;
  if (op === "C") {
    console.log("clear");
    return {
      nextSum: 0,
      displayedResult: 0,
    };
  }

  if (state.currentOperator === "=" && op !== "=") {
    return {
      // currentSum: state.nextSum,
      displayedResult: state.displayedResult + op,
      nextSum: 0,
      currentOperator: op,
    };
  } else if (state.currentOperator === "+") {
    {
      if (op === "=") {
        return {
          currentSum: state.currentSum + state.nextSum,
          displayedResult: state.currentSum + state.nextSum,
          nextSum: 0,
          currentOperator: op,
        };
      }

      return {
        currentSum: state.currentSum + state.nextSum,
        displayedResult: state.currentSum + state.nextSum + op,
        nextSum: 0,
        currentOperator: op,
      };
    }
  } else if (state.currentOperator === "-") {
    {
      if (op === "=") {
        return {
          currentSum: state.currentSum - state.nextSum,
          displayedResult: state.currentSum - state.nextSum,
          nextSum: 0,
          currentOperator: op,
        };
      }

      return {
        currentSum: state.currentSum - state.nextSum,
        displayedResult: state.currentSum - state.nextSum + op,
        nextSum: 0,
        currentOperator: op,
      };
    }
  } else if (state.currentOperator === "x") {
    {
      if (op === "=") {
        return {
          currentSum: state.currentSum * state.nextSum,
          displayedResult: state.currentSum * state.nextSum,
          nextSum: 0,
          currentOperator: op,
        };
      }

      return {
        currentSum: state.currentSum * state.nextSum,
        displayedResult: state.currentSum * state.nextSum + op,
        nextSum: 0,
        currentOperator: op,
      };
    }
  } else if (state.currentOperator === "/") {
    {
      if (op === "=") {
        return {
          currentSum: state.currentSum / state.nextSum,
          displayedResult: state.currentSum / state.nextSum,
          nextSum: 0,
          currentOperator: op,
        };
      }

      return {
        currentSum: state.currentSum / state.nextSum,
        displayedResult: state.currentSum / state.nextSum + op,
        nextSum: 0,
        currentOperator: op,
      };
    }
  }
}

export default operate;
