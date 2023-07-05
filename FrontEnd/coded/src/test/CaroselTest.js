import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { styled } from 'styled-components';
import axios from 'axios';
import './CaroselTest.scss';

const CaroselTest = () => {
  //   const settings = {
  //     dots: true, // 개수 표시 점
  //     infinite: true, // 무한 캐러셀
  //     speed: 500, // 다음 컨텐츠 까지의 속도
  //     slidesToShow: 3, // 화면에 보이는 컨텐츠 수
  //     slidesToScroll: 1, // 스크롤 시 넘어가는 컨텐츠 수
  //     centerMode: true, // 현재 컨텐츠 가운데 정렬
  //     centerPadding: '10px', // 중앙 컨텐츠 padding 값
  //     autoplay: true, // 자동 캐러셀
  //     autoplaySpeed: 2000, // 자동 캐러셀 속도
  //     draggable: false, // 드래그
  //     fade: false, // 사라졌다 나타나는 효과
  //     arrows: true, // 좌,우 버튼
  //     vertical: false, // 세로 캐러셀
  //     initialSlide: 1, // 첫 컨텐츠 번호
  //     pauseOnFocus: true, // focus시 정지
  //     pauseOnHover: true, // hover시 정지
  //     responsive: [
  //       // 반응형 옵션
  //       {
  //         breakpoint: 480, // (숫자)px 이하일 경우
  //         settings: {
  //           slidesToShow: 1,
  //           arrows: true,
  //         },
  //       },
  //     ],
  //   };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
    centerPadding: '0px',
  };

  const ImageLayout = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const LayoutDiv = styled('div')`
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    axios
      .request({
        method: 'get',
        url: '/photo/testedBySelectPhoto',
      })
      .then((resp) => {
        setImageList(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <LayoutDiv>
      <Slider className="custom-slider" {...settings}>
        {imageList.map((image) => {
          return (
            <ImageLayout>
              <img
                style={{ width: '100%', objectFit: 'contain' }}
                src={`/images/${image.sysName}`}
              ></img>
            </ImageLayout>
          );
        })}
      </Slider>
    </LayoutDiv>
  );
};

export default CaroselTest;
