import React, { Component } from "react";
import TransitionGroup from "react-transition-group/TransitionGroup"; // 동적 리스트 요소가 있는 곳에 사용할 수 있다.
import CSSTransition from "react-transition-group/CSSTransition"; // TransitionGroup은 Transition || CSSTransition과 함께 사용해야한다.

import "./List.css";

class List extends Component {
  state = {
    items: [1, 2, 3],
  };

  addItemHandler = () => {
    this.setState((prevState) => {
      return {
        items: prevState.items.concat(prevState.items.length + 1),
      };
    });
  };

  removeItemHandler = (selIndex) => {
    this.setState((prevState) => {
      return {
        items: prevState.items.filter((item, index) => index !== selIndex),
      };
    });
  };

  render() {
    const listItems = this.state.items.map((item, index) => (
      // TransitionGroup이 자동으로 in 속성을 설정해주기 때문에 감싸지는 Transition || CSSTransition에는 in을 명시할 필요가 없다.
      <CSSTransition key={index} classNames="fade" timeout={300}>
        <li className="ListItem" onClick={() => this.removeItemHandler(index)}>
          {item}
        </li>
      </CSSTransition>
    ));

    return (
      <div>
        <button className="Button" onClick={this.addItemHandler}>
          Add Item
        </button>
        <p>Click Item to Remove.</p>
        <TransitionGroup component="ul" className="List">
          {listItems}
        </TransitionGroup>
      </div>
    );
  }
}

export default List;
