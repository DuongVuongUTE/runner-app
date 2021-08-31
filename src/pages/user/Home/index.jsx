import React, { useEffect } from "react";
import * as Style from "./styles";

import register from "../../../assets/images/register.png";

import SectionHome from "./components/SectionHome";
import ProductNew from "./components/ProductNew";
import ProductSlider from "./components/ProductSlider";
import RegisterForm from "./components/RegisterForm";
import CategoryHome from "./components/Category";
import SliderHome from "./components/SliderHome";
import ArticlesHome from "./components/Articles";
import GalleryHome from "./components/Gallery";
import { useDispatch, useSelector } from "react-redux";
import { getProductListAction } from "../../../redux/actions";

function HomePage() {
  const { productList } = useSelector((state) => state.productReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductListAction());
  }, []);

  const articlesList = [
    {
      id: 1,
      title: "Adidas Falcon nổi bật mùa Hè với phối màu",
      desc: "Cuối tháng 5, adidas Falcon đã cho ra mắt nhiều phối màu đón chào mùa Hè khiến giới trẻ yêu thích không thôi. Tưởng chừng thương hiệu sẽ tiếp tục",
      thumb: "https://khangdev1998.github.io/shoe/image/articles1.jpg",
      createdAt: "Thứ 2 10,05,2021",
    },
    {
      id: 2,
      title: "Saucony hồi sinh mẫu giày chạy bộ cổ điển của mình – Aya Runner",
      desc: "Là một trong những đôi giày chạy bộ tốt nhất vào những năm 1994, 1995, Saucony Aya Runner vừa có màn trở lại vô cùng ấn tượng có vẻ như 2019",
      thumb: "https://khangdev1998.github.io/shoe/image/articles2.jpg",

      createdAt: "Thứ 3 10,06,2021",
    },
    {
      id: 3,
      title: "Những điều bạn chưa biết về giày Nike Air Max chính hãng",
      desc: "Thương hiệu giày Nike từ lâu đã nổi tiếng trên thị trường giày với những sản phẩm ấn tượng, ghi dấu ấn trong lòng giới trẻ. Điều khiến Nike làm nên tên tuổi như vậy một phần đến từ việc thương hiệu giày này cho ra đời nhiều dòng sản phẩm đa dạng để chiếm lĩnh thị trường. Trong các dòng sản phẩm đó, giày Nike Air Max luôn chiếm được cảm tình của giới yêu giày, cách mua giày Nike Air Max với dịch vụ mua hộ hàng Mỹ và ship hàng Mỹ giá rẻ.",
      thumb: "https://khangdev1998.github.io/shoe/image/articles3.jpg",
      createdAt: "Thứ 5 10,08,2021",
    },
    {
      id: 4,
      title: "Adidas Falcon nổi bật mùa Hè với phối màu",
      desc: "Cuối tháng 5, adidas Falcon đã cho ra mắt nhiều phối màu đón chào mùa Hè khiến giới trẻ yêu thích không thôi. Tưởng chừng thương hiệu sẽ tiếp tục",
      thumb: "https://khangdev1998.github.io/shoe/image/articles4.jpg",
      createdAt: "Thứ 2 10,05,2021",
    },
    {
      id: 5,
      title: "Adidas Falcon nổi bật mùa Hè với phối màu",
      desc: "Cuối tháng 5, adidas Falcon đã cho ra mắt nhiều phối màu đón chào mùa Hè khiến giới trẻ yêu thích không thôi. Tưởng chừng thương hiệu sẽ tiếp tục",
      thumb: "https://khangdev1998.github.io/shoe/image/articles5.jpg",
      createdAt: "Thứ 2 10,05,2021",
    },
    {
      id: 6,
      title: "Saucony hồi sinh mẫu giày chạy bộ cổ điển của mình – Aya Runner",
      desc: "Là một trong những đôi giày chạy bộ tốt nhất vào những năm 1994, 1995, Saucony Aya Runner vừa có màn trở lại vô cùng ấn tượng có vẻ như 2019",
      thumb: "https://khangdev1998.github.io/shoe/image/articles6.jpg",

      createdAt: "Thứ 3 10,06,2021",
    },
  ];
  return (
    <Style.Home>
      {/* Slider */}
      <SliderHome />
      {/* Giày mới */}
      <SectionHome title="Sản phẩm mới" text="xem thêm" params="/product">
        <ProductNew productList={productList} />
      </SectionHome>
      {/* category */}
      <CategoryHome />
      {/* Giày nam */}
      <SectionHome title="Giày nam" text="xem thêm" params="/men">
        <ProductSlider productList={productList} />
      </SectionHome>
      {/* Form đăng ký nhận thông báo */}
      <RegisterForm
        bg={register}
        title="Đăng ký"
        text=" Đăng ký nhận bản tin của Runner Inn để cập nhật những sản phẩm mới, nhận thông tin ưu đãi đặc biệt và thông tin giảm giá khác."
      />
      {/* Giày nữ */}
      <SectionHome title="Giày nữ" text="xem thêm" params="/woman">
        <ProductSlider productList={productList} />
      </SectionHome>
      {/* Giày trẻ em */}
      <SectionHome title="Giày trẻ em" text="xem thêm" params="/kids">
        <ProductSlider productList={productList} />
      </SectionHome>
      {/* Bài viết */}
      <SectionHome title="Bài viết mới nhất" text="">
        <ArticlesHome articlesList={articlesList} />
      </SectionHome>
      {/* list ảnh giới thiệu */}
      <SectionHome title="Khách hàng và Runner Inn" text="" noContainer={true}>
        <GalleryHome />
      </SectionHome>
    </Style.Home>
  );
}

export default HomePage;
