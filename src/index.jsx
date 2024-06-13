

import "./styles/style.css";
import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import Loading from "./interface/Loading";


const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <Suspense fallback={<Loading />}>
  </Suspense>
);
