import React from "react";
import { Link } from "react-router-dom";

const PRODUCTS = [
  { id: "p1", title: "Product 1" },
  { id: "p2", title: "Product 2" },
  { id: "p3", title: "Product 3" },
];

function ProductsPage() {
  return (
    <>
      <h1>This is ProductsPage.</h1>
      <ul>
        {PRODUCTS.map((product) => (
          <li key={product.id}>
            {/* 만약 여기서 "/products"(절대 경로)가 아니라 "products"(상대 경로)로 시작하면 어떨까? */}
            {/* 예를들어 "/root"가 루트 경로인 경우 전자는 "/products/:id"로 이동하지만, 후자의 경우 "/root/products/:id"로 이동한다 */}
            {/* 절대경로는 현재 경로 뒤에 붙지않고 자기 자신의 경로를 그대로 유지하고, 상대경로는 현재 경로 뒤에 붙는다. */}
            {/* <Link to={`/products/${product.id}`}>{product.title}</Link> */}
            {/* 따라서, 아래 경로는 현재 url 뒤에 ":id"만 붙게된다. */}
            {/* 이 떄, relative 속성을 활용해서 상대경로로 할지, 절대 경로로 할지 지정해줄수도 있다. */}
            <Link to={product.id}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ProductsPage;
