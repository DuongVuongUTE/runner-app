import { useSelector, useDispatch } from "react-redux";
import { Router, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import history from "./utils/history";

import DefaultLayout from "./layouts/DefaultLayout";
import AdminLayout from "./layouts/AdminLayout";
import FullLayout from "./layouts/FullLayout";

import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import NotFoundPage from "./pages/NotFound";

import HomePage from "./pages/user/Home";
import AboutPage from "./pages/user/About";
import ProductPage from "./pages/user/ProductList";
import ProductDetailPage from "./pages/user/ProductDetail";
import CartPage from "./pages/user/Cart";
import CheckoutPage from "./pages/user/Checkout";

import DashboardPage from "./pages/admin/Dashboard";
import ProductListPage from "./pages/admin/ProductList";
import CategoryListPage from "./pages/admin/CategoryList";
import CustomerListPage from "./pages/admin/CustomerList";
import AccountListPage from "./pages/admin/AccountList";
import ModifyProduct from "./pages/admin/ProductList/components/ModifyProduct";

import "antd/dist/antd.css";
import "swiper/swiper.min.css";
import "swiper/components/effect-fade/effect-fade.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";

import { lightTheme, darkTheme } from "./styles/themes";
import { BackTop } from "antd";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { getUserInfoAction } from "./redux/actions";

const THEME = {
  light: lightTheme,
  dark: darkTheme,
};

function App() {
  const { theme } = useSelector((state) => state.commonReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      const decodedUserInfo = jwtDecode(userInfo.accessToken);
      dispatch(getUserInfoAction({ id: decodedUserInfo.sub }));
    }
  }, []);

  return (
    <ThemeProvider theme={THEME[theme]}>
      <Router history={history}>
        <Switch>
          <DefaultLayout exact path="/" component={HomePage} />
          <DefaultLayout exact path="/product" component={ProductPage} />
          <DefaultLayout exact path="/about" component={AboutPage} />
          <DefaultLayout
            exact
            path="/product/:productID"
            component={ProductDetailPage}
          />
          <DefaultLayout exact path="/cart" component={CartPage} />
          <DefaultLayout exact path="/checkout" component={CheckoutPage} />

          <AdminLayout exact path="/admin" component={DashboardPage} />
          <AdminLayout
            exact
            path="/admin/products"
            component={ProductListPage}
          />
          <AdminLayout
            exact
            path="/admin/categories"
            component={CategoryListPage}
          />
          <AdminLayout
            exact
            path="/admin/customers"
            component={CustomerListPage}
          />
          <AdminLayout exact path="/admin/accounts" component={AccountListPage}/>
          <AdminLayout 
            exact 
            action="create" 
            path="/admin/products/create" 
            component={ModifyProduct}
          />
          <AdminLayout 
            exact 
            action="edit" 
            path="/admin/products/edit/:id" 
            component={ModifyProduct}
          />

          <FullLayout exact path="/login" component={LoginPage} />
          <FullLayout exact path="/register" component={RegisterPage} />
          <FullLayout component={NotFoundPage} />
        </Switch>
        <BackTop></BackTop>
      </Router>
    </ThemeProvider>
  );
}

export default App;
