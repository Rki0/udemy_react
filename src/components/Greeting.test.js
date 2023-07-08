import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Greeting from "./Greeting";

// test는 3개의 A를 거친다.
// Arrange(준비). 테스트하고자 하는 것을 준비한다. 렌더링한다. 데이터를 준비한다.
// Act(실행). 실제로 테스트하고자 하는 것을 실행한다. 클릭 등.
// Assert(단언). 브라우저에 나온 결과물을 보고, 우리의 예상과 비교하며 같은지 살핀다.

// describe를 통해 Test Suite를 생성한다.
describe("Greeting component", () => {
  test("renders Hello World as a text", () => {
    // Arrange
    render(<Greeting />);

    // Act
    // ...nothing

    // Assert
    // screen에는 get, find, query...로 시작하는 메서드들이 들어있는데
    // Promise를 반환하느냐 마냐의 차이를 가지고 있다.
    // exact는 테스트하는 것과 완전히 일치하는지를 따질 것이냐를 정한다.
    // "Hello World!"는 "Hello World"와 완전히 일치하지 않기 때문에 default값인 exact:true 상황에서는 테스트에 실패하게 된다.
    // false를 주면 좀 더 여유있게 테스트를 한다.
    const helloWorldElement = screen.getByText("Hello World", { exact: false });

    // tobein...을 통해 엘리먼트에 어떤 것이 들어있는지 확인할 수 있다.
    expect(helloWorldElement).toBeInTheDocument();
  });

  test("renders good to see you if the button was NOT clicked", () => {
    render(<Greeting />);

    const paragraphElement = screen.getByText("good to see you!", {
      exact: false,
    });

    expect(paragraphElement).toBeInTheDocument();
  });

  // state를 다루는 test는 @testing-library/user-event를 사용한다.
  test("renders 'Changed!' if the button was clicked", () => {
    // Arrange
    render(<Greeting />);

    // Act
    // useEvent는 말그대로 유저의 이벤트를 구현할 수 있게 도와준다. 클릭 등
    const buttonElement = screen.getByRole("button"); // button 태그를 가져옴.
    userEvent.click(buttonElement);

    // Assert
    const paragraphElement = screen.getByText("Changed!");
    expect(paragraphElement).toBeInTheDocument();
  });

  // 만약 Greeting에서 p 태그가 실수로 토글이 아니라 계속 렌더링으로 처리해 놨다고해도
  // 위 test들에서는 이를 처리할 수 없다. 의도대로 에러를 뱉는게 아니라 통과를 시켜버린다. 문제가 없기에.
  // 이를 위해 토글 상황을 테스트해야한다.
  test("does not render 'good to see you' if the button was clicked", () => {
    // Arrange
    render(<Greeting />);

    // Act
    // useEvent는 말그대로 유저의 이벤트를 구현할 수 있게 도와준다. 클릭 등
    const buttonElement = screen.getByRole("button"); // button 태그를 가져옴.
    userEvent.click(buttonElement);

    // Assert
    // getByText는 엘리먼트를 찾지 못하면 테스트가 실패한다.
    // 이런 경우 Promise를 반환하는 queryByText를 사용한다.
    const paragraphElement = screen.queryByText("good to see you!", {
      exact: false,
    });

    // 아무것도 찾아지지 않았는지 확인한다.
    expect(paragraphElement).toBeNull();
  });

  // 하위 컴포넌트가 렌더링이 되는지 확인하기
  // integration test라고 볼 수 있다.
  // 하위 컴포넌트가 복잡한 경우에는 test를 분리하는게 더 관리하기 좋을 수 있다. 지금은 간단하니까 괜찮!
});
