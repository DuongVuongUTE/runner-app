import styled from "styled-components";

export const SliderProduct = styled.div`
  padding-top: 20px;
  .swiper-button-prev {
    top: 150px !important;
    left: 0 !important;
  }
  .swiper-button-next {
    top: 150px !important;
    right: 0 !important;
  }

  .mySwiper {
    padding: 15px 20px;
    margin: -15px -20px;

    &:hover {
      padding-bottom: 300px;
      margin-bottom: -300px;
    }
  }
  @media screen and (max-width: 768px) {
    .swiper-button-prev,
    .swiper-button-next {
      display: none !important;
    }
  }
`;
