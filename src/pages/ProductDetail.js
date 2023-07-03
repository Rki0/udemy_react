import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function ProductDetailPage() {
  const params = useParams();

  return (
    <>
      <h1>Product Details!</h1>
      <p>{params.productId}</p>
      <p>
        {/* ".."는 파일 경로 찾을 때처럼, 이전 경로를 의미하는데 */}
        {/* 이렇게 작성하면 상대경로이기 때문에 "/products"에서 흘러들어왔지만, to로 이동되는 곳은 "/"가 된다. "/products"가 아니다.  */}
        {/* 라우트 설정상 "/products"는 형제 라우트이고, "/"가 루트 라우트이기 때문에 이런 일이 발생하는 것이다. */}
        {/* 즉, ".."로 이전 경로로 이동하기 때문에 형제가 아닌 부모 라우트 경로로 이동하게 된다. 이전 페이지가 아니라 이전 경로!!*/}
        {/* <Link to="..">Back</Link> */}
        {/* 이러한 문제점을 해결하기 위해 relative 속성을 사용할 수 있는데 */}
        {/* "route"가 디폴트 값이며, "path"로 설정할 경우 현재 활성 경로를 살펴보고 경로 상 하나의 세그먼트만 제거하게 된다. */}
        {/* 물론, 절대 경로를 쓰고 있다면 이런 문제점들은 전부 사라진다. 이 코드는 뒤로 가기 구현할 떄 써먹을 수 있을듯! */}
        <Link to=".." relative="path">
          Back
        </Link>
      </p>
    </>
  );
}

export default ProductDetailPage;
