import { Component } from "react";

class OperatorButtonComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        id={this.props.id}
        onClick={() => {
          this.props.operate(this.props.value);
        }}
        style={{
          gridArea: this.props.id,
        }}
        className={this.props.className}
      >
        {this.props.value}
      </div>
    );
  }
}

export default OperatorButtonComponent;
