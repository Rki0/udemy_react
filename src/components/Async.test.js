import { render, screen } from "@testing-library/react";
import Async from "./Async";

describe("Async component", () => {
  test("renders posts if request succeeds", async () => {
    // 주의할 것!!!
    // 테스트로 인해서 HTTP 통신이 발생하고, DB에 변경을 일으켜서는 안될 것이다.
    // 비용이 발생하고, DB를 변경해버릴 수 있기 때문이다.
    // 1. 진짜 요청을 전송하지 않거나(지금 작성한 코드)
    // 2. 테스트 서버에 요청을 전송하거나
    // 두 가지의 방법이 있을 수 있다.
    // 테스트를 할 때는 내가 작성하지 않은 코드를 테스트해서는 안된다는 것을 기억하자.
    // 즉, fetch가 제대로 데이터를 보내는지 테스트하면 안된다는 것이다.
    // fetch 함수는 내가 작성한게 아니기 때문이다. 브라우저가 작성해놓은거지.
    // 따라서 fetch가 성공적으로 데이터를 보내는지 테스트하는게 아니라
    // 그 결과를 통해 컴포넌트가 올바르게 작동하는지를 테스트해야하는 것이다.
    // 그래서 mock을 사용해서 더미 함수를 만든다. fetch 같은 내장 함수를 테스트하기 위해!!
    // 테스트에서 mock 함수를 실행하는 것으로 우리의 의도를 실행할 수 있다.
    window.fetch = jest.fn(); // jest를 통해 window.fetch를 mock 함수로 만들었다.
    // 우리 코드에서는 fetch 다음에 response.json()을 실행하므로 response에 사용될 데이터를 설정해야할 것이다.
    // mockResolvedValueOnce()를 통해 window.fetch가 실행될 때 전달해야할 데이터 설정이 가능하다.
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: "p1", title: "First Post" }],
    });

    render(<Async />);

    // 여러 개의 요소를 봐야한다면 getByRole이 작동하지 않으므로 getAllByRole을 사용
    // 이 메서드들은 즉시 요소를 찾으려고한다. 하지만 HTTP 요청을 보내므로 비동기적이다.
    // 즉, 즉각 요소를 가져올 수 없고, 초기 상태로 빈 배열을 렌더링할 것이다.
    // 첫 렌더링 사이클이 지나고 두번째 렌더링 사이클에 li가 생기므로, 테스트는 실패한다.
    // 따라서, findAllByRole을 사용해서 프로미스를 반환하게 만든다.
    // 이 메서드는 프로미스가 성공할 때까지 기다린다. 그래서 HTTP 요청을 기다린다.
    // 3번째 인자로 timeout을 설정할 수 있는데 1초가 디폴트이고, 1초가 지나도 성공하지 못하면 실패이다.
    const listItemsElements = await screen.findAllByRole("listitem");
    expect(listItemsElements).not.toHaveLength(0);
  });
});
