import React from "react";
import MainNavigation from "../components/MainNavigation";

function ErrorPage() {
  return (
    <div>
      <MainNavigation />

      <main>
        <h1>An error occured!</h1>
        <p>Could not find this page!</p>
      </main>
    </div>
  );
}

export default ErrorPage;
