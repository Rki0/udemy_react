import React, { Component } from "react";

import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";

import Transition from "react-transition-group/Transition";

class App extends Component {
  state = {
    modalIsOpen: false,
    showBlock: false,
  };

  showModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    return (
      <div className="App">
        <h1>React Animations</h1>

        <button
          onClick={() => {
            this.setState((prevState) => ({ showBlock: !prevState.showBlock }));
          }}
        >
          Toggle
        </button>

        <br />

        <Transition
          in={this.state.showBlock}
          timeout={1000} // animation이 실행될 시간을 벌어주는 용도. 문제는 animation 시간과 맞지 않다면 의도하지 않았던 동작으로 이어질 수 있음.
          mountOnEnter // 시작할 때 DOM에 mount
          unmountOnExit // 끝날 때 DOM에서 dismount
          onEnter={() => console.log("onEnter")}
          onEntering={() => console.log("onEntering")}
          onEntered={() => console.log("onEntered")}
          onExit={() => console.log("onExit")}
          onExiting={() => console.log("onExiting")}
          onExited={() => console.log("onExited")}
        >
          {(state) => (
            <div
              style={{
                backgroundColor: "red",
                width: 100,
                height: 100,
                margin: "auto",
                transition: "opacity 1s ease-out",
                opacity: state === "exiting" ? 0 : 1,
              }}
            ></div>
          )}
        </Transition>

        <Modal closed={this.closeModal} show={this.state.modalIsOpen} />

        {this.state.modalIsOpen ? <Backdrop show={this.showModal} /> : null}

        <button className="Button" onClick={this.showModal}>
          Open Modal
        </button>

        <h3>Animating Lists</h3>

        <List />
      </div>
    );
  }
}

export default App;
