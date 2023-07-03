// Thunk의 기능을 한다. RTK에서는 그냥 함수의 return값에 dispatch를 받아서 사용하면 쉽게 비동기 처리를 구현할 수 있다.

import { uiActions } from "./uiSlice";
import { cartActions } from "./cartSlice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-d592e-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();

      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  // RTK를 통해 객체만 반환될 수 있는게 아니라 함수도 반환될 수 있다. 이를 활용해 비동기 처리가 가능하다. 원래는 동기적인 것만 가능하기 때문에 이렇게 해야한다.
  // dispatch로 이 함수를 실행하고, 이 함수 내부에서 또 dispatch를 하는 것으로 비동기 처리를 할 수 있다. return 함수의 인자로 dispatch를 받고 있다!
  // 물론, 컴포넌트에서 useEffect를 써서 비동기 처리와 dispatch를 같이 사용할 수 있지만, 컴포넌트를 더 깔끔하게 유지하기 위해서 이런 방법을 쓸 수도 있다.
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-http-d592e-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed!");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Send cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};
