import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <div className="footerContainer">
          <div className="top">
            <div className="topLeft">
              <p>고객센터 안내</p>
              <p>1544-7848</p>
              <span>평일</span>
              <span>&nbsp;10:00 ~ 19:00 (점심시간 12:00 ~ 14:00)</span>
            </div>
            <div className="topCenter">
              <div className="title">
                <p>회사 소개 및 약관 내용</p>
              </div>
              <div className="descList">
                <Link>
                  <p>회사 소개</p>
                </Link>
                <Link>
                  <p>이용 약관</p>
                </Link>
                <Link>
                  <p>개인정보 취급방침</p>
                </Link>
              </div>
            </div>
            <div className="topRight">
              <p>Follow us</p>
              <div className="iconContainer">
                <span>
                  <img
                    src="images/icon/cartFacebookIcon.png"
                    alt="페이스북 아이콘"
                  />
                </span>
                <span>
                  <img
                    src="images/icon/cartInstagramIcon.png"
                    alt="인스타그램 아이콘"
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="middle">
            <p>
              상호명: 주식회사 CODED | 사업자 등록번호: 110-14-01234 |
              사업자등록정보 확인
            </p>
            <p>
              통신판매업신고: 제 2020-서울강남-7777호 | 주소: 서울특별시 강남구
              테헤란로 427 위워크타워 10층 | 대표자: 조성태 | 개인정보책임자:
              홍길동
            </p>
          </div>
          <div className="bottom">
            <img src="images/icon/escroIcon.png" alt="에스크로 아이콘" />
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;