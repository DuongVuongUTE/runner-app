import { useState } from "react";
import { Route, Redirect } from "react-router-dom";

import { Layout, Menu } from "antd";

import HeaderAdmin from "../HeaderAdmin";
import Sidebar from "../Sidebar";
import BreadcrumbLayout from "../Breadcrumb";

import * as Style from "./styles";

function AdminLayout({ exact, path, component: Component, action }) {
  const { Content } = Layout;

  const [isShowSidebar, setIsShowSidebar] = useState(true);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (!userInfo) {
    return <Redirect to="/login" />;
  } else {
    if (userInfo.role === "user") {
      return <Redirect to="/" />;
    } else {
      return (
        <Route
          exact={exact}
          path={path}
          render={(routeProps) => {
            return (
              <>
                <HeaderAdmin />
                <Layout >
                  <Sidebar {...routeProps} isShowSidebar={isShowSidebar} />
                  <Style.SiteLayout >
                    <BreadcrumbLayout {...routeProps} />
                    <Style.CustomContent >
                      <div className="site-layout-background" style={{ padding: 24, minHeight: 360, height: '100%' }}>
                        <Component {...routeProps} action={action} />
                      </div>
                    </Style.CustomContent>
                  </Style.SiteLayout>
                </Layout>
              </>
            )
          }}
        />
      );
    }
  }
}

export default AdminLayout;
