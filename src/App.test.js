// 파일명은 test하고자 하는 컴포넌트 파일명에 test를 붙여주면 된다. App.js => App.test.js
import { render, screen } from "@testing-library/react";
import App from "./App";

// 첫번째 인자는 테스트에 대한 설명을 적는다. 본인 마음
// 두번째 인자는 실제 테스트 코드를 담은 함수.
test("renders learn react link", () => {
  render(<App />); // 렌더링.가상 화면에 이들을 뿌린다. 시뮬레이팅 화면에.
  // const linkElement = screen.getByText(/learn react/i); // 텍스트를 통해 렌더링된 것을 식별한다. 여기서는 learn react. 실제로 App.js에 a 태그에 텍스트가 learn react임. 정규식 표현으로 i는 대소 구분을 하지 않는다.
  // expect(linkElement).toBeInTheDocument(); // 문서에 존재하는지 확인한다. 찾으면 성공, 못찾으면 실패.
});

// Test Suites와 Tests의 차이
// Test Suite는 Tests가 모여있는 단위이다.
// 즉, 대분류라고 생각하면 된다. Tests는 소분류이다.
