import React from "react";
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

function HomePage() {
  const productList = [
    {
      name: "Nike Air Max 1 Anniversary",
      price: 4200000,
      images: [
        "https://khangdev1998.github.io/shoe/image/product1.png",
        "https://khangdev1998.github.io/shoe/image/product2.png",
      ],
      size: [
        {
          id: 1,
          num: 34,
          ratio: 1,
        },
        {
          id: 1,
          num: 35,
          ratio: 1.1,
        },
        {
          id: 1,
          num: 36,
          ratio: 1.3,
        },
        {
          id: 1,
          num: 37,
          ratio: 1.05,
        },
      ],
    },
    {
      name: 'Nike Air Max 1 Se "Just Do It"',
      price: 4900000,
      images: [
        "https://khangdev1998.github.io/shoe/image/product3.png",
        "https://khangdev1998.github.io/shoe/image/product4.png",
      ],
      size: [
        {
          id: 1,
          num: 40,
          ratio: 1.1,
        },
        {
          id: 1,
          num: 41,
          ratio: 1.2,
        },
        {
          id: 1,
          num: 42,
          ratio: 1.15,
        },
        {
          id: 1,
          num: 43,
          ratio: 1,
        },
      ],
    },
    {
      name: 'The 10: Nike Air Presto "Off White"',
      price: 8000000,
      images: [
        "https://khangdev1998.github.io/shoe/image/product5.png",
        "https://khangdev1998.github.io/shoe/image/product6.png",
      ],
      size: [
        {
          id: 1,
          num: 40,
          ratio: 1.1,
        },
        {
          id: 1,
          num: 41,
          ratio: 1.2,
        },
        {
          id: 1,
          num: 42,
          ratio: 1.15,
        },
        {
          id: 1,
          num: 43,
          ratio: 1,
        },
      ],
    },
    {
      name: "Nike Wmns Air Huarache City Move",
      price: 5200000,
      images: [
        "https://khangdev1998.github.io/shoe/image/product7.png",
        "https://khangdev1998.github.io/shoe/image/product8.png",
      ],
      size: [
        {
          id: 1,
          num: 40,
          ratio: 1.1,
        },
        {
          id: 1,
          num: 41,
          ratio: 1.2,
        },
        {
          id: 1,
          num: 42,
          ratio: 1.15,
        },
        {
          id: 1,
          num: 43,
          ratio: 1,
        },
      ],
    },
    {
      name: 'Nike Air Max 90 Essential "Grape"',
      price: 4800000,
      images: [
        "https://khangdev1998.github.io/shoe/image/product9.png",
        "https://khangdev1998.github.io/shoe/image/product10.png",
      ],
      size: [
        {
          id: 1,
          num: 40,
          ratio: 1.1,
        },
        {
          id: 1,
          num: 41,
          ratio: 1.2,
        },
        {
          id: 1,
          num: 42,
          ratio: 1.15,
        },
        {
          id: 1,
          num: 43,
          ratio: 1,
        },
      ],
    },
    {
      name: "Nike Air Max 97 Premium",
      price: 8400000,
      images: [
        "https://khangdev1998.github.io/shoe/image/product11.png",
        "https://khangdev1998.github.io/shoe/image/product12.png",
      ],
      size: [
        {
          id: 1,
          num: 40,
          ratio: 1.1,
        },
        {
          id: 1,
          num: 41,
          ratio: 1.2,
        },
        {
          id: 1,
          num: 42,
          ratio: 1.15,
        },
        {
          id: 1,
          num: 43,
          ratio: 1,
        },
      ],
    },
    {
      name: 'Adidas Nmd Xr1 W "Pearl Grey"',
      price: 5750000,
      images: [
        "https://khangdev1998.github.io/shoe/image/product13.png",
        "https://khangdev1998.github.io/shoe/image/product14.png",
      ],
      size: [
        {
          id: 1,
          num: 40,
          ratio: 1.1,
        },
        {
          id: 1,
          num: 41,
          ratio: 1.2,
        },
        {
          id: 1,
          num: 42,
          ratio: 1.15,
        },
        {
          id: 1,
          num: 43,
          ratio: 1,
        },
      ],
    },
    {
      name: 'Nike W\'s Air Huarache Run "Triple White"',
      price: 7950000,
      images: [
        "https://khangdev1998.github.io/shoe/image/product15.png",
        "https://khangdev1998.github.io/shoe/image/product16.png",
      ],
      size: [
        {
          id: 1,
          num: 40,
          ratio: 1.1,
        },
        {
          id: 1,
          num: 41,
          ratio: 1.2,
        },
        {
          id: 1,
          num: 42,
          ratio: 1.15,
        },
        {
          id: 1,
          num: 43,
          ratio: 1,
        },
      ],
    },
  ];

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
      <SectionHome title="Sản phẩm mới" text="xem thêm">
        <ProductNew productList={productList} />
      </SectionHome>
      {/* category */}
      <CategoryHome />
      {/* Giày nam */}
      <SectionHome title="Giày nam" text="xem thêm">
        <ProductSlider productList={productList} />
      </SectionHome>
      {/* Form đăng ký nhận thông báo */}
      <RegisterForm
        bg={register}
        title="Đăng ký"
        text=" Đăng ký nhận bản tin của Runner Inn để cập nhật những sản phẩm mới, nhận thông tin ưu đãi đặc biệt và thông tin giảm giá khác."
      />
      {/* Giày nữ */}
      <SectionHome title="Giày nữ" text="xem thêm">
        <ProductSlider productList={productList} />
      </SectionHome>
      {/* Giày trẻ em */}
      <SectionHome title="Giày trẻ em" text="xem thêm">
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
