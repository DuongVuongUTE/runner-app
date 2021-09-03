import { Route } from "react-router-dom";

import Header from "../Header";
import Footer from "../Footer";

import * as Style from "./styles";

function DefaultLayout(props) {
  const { exact, path, component: Component } = props;

  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        return (
          <div style={{ overflowX: "hidden" }}>
            <Header type="user" />
            <Style.MainContainer>
              <Component {...routeProps} />
            </Style.MainContainer>
            <Footer />
          </div>
        );
      }}
    />
  );
}

export default DefaultLayout;
