import { Component } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./TodoApp.css";
import CounterComponent from "./CounterComponent";
import Calculator from "./calculator/Calculator";
import Pokedex from "./pokedex/Pokedex.jsx";

class TodoApp extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <HomeComponent></HomeComponent>
          <Routes>
            <Route path="/calc" element={<Calculator />}></Route>
            <Route path="/todo" element={<AComponent />}></Route>
            <Route path="/counter" element={<CounterComponent />}></Route>
            <Route path="/pokedex" element={<Pokedex />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

class HomeComponent extends Component {
  render() {
    return (
      <div className="navbar">
        <ul>
          <li>
            <Link className="navbar-item" to="/">
              home
            </Link>
          </li>
          <li>
            <Link className="navbar-item" to="/calc">
              calculator
            </Link>
          </li>
          <li>
            <Link className="navbar-item" to="/todo">
              todoapp
            </Link>
          </li>
          <li>
            <Link className="navbar-item" to="/counter">
              counter
            </Link>
          </li>
          <li>
            <Link className="navbar-item" to="/pokedex">
              pokedex
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

class AComponent extends Component {
  render() {
    return <div className="content">A</div>;
  }
}

export default TodoApp;
