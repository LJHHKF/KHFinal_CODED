import React, { Component, useCallback, useEffect, useState } from 'react';
import './Navbar.scss';
import {
  BrowserRouter,
  Route,
  Router,
  Routes,
  useNavigate,
  withRouter,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import SearchBox from '../Search/SearchBox';
import {
  setMember,
  setNonMember,
  setWeekly,
} from '../../modules/Redux/navbarSetting';
import Login from '../../pages/auth/Login/Login';
import SignUp from '../../pages/auth/SignUp/SignUp';
import Logo from './navLogo.png';
import TodayWeather from '../TodayWeather/TodayWeather';
import { logout } from '../../modules/Redux/members';
import { motion } from 'framer-motion';
import ChatButton from '../../assets/ButtonAsset/ChatButton';

function Navbar() {
  const [isOotdBorder, setIsOotdBorder] = useState(true);
  const [isWeeklyBorder, setIsWeeklyBorder] = useState(false);
  // const [listOotdBorder, setListOotdBorder] = useState(1);
  const [isHomeBorder, setIsHomeBorder] = useState(true);
  const accessToken = useSelector((state) => state.member.access);
  const navbarType = useSelector((state) => state.navbarSetting.type);
  const navbarIndex = useSelector((state) => state.navbarSetting.navbarIndex);
  const navbarIndex2 = useSelector((state) => state.navbarSetting.navbarIndex2);
  const userId = useSelector((state) => state.member.userId);
  const dispatch = useDispatch();
  const onNavbarSetNonMem = useCallback(
    () => dispatch(setNonMember()),
    [dispatch],
  );
  const onNavbarSetMem = useCallback(() => dispatch(setMember()), [dispatch]);
  // const onNavbarSetWeekly = useCallback(
  //   () => dispatch(setWeekly()),
  //   [dispatch],
  // );
  const onLogout = useCallback(() => dispatch(logout()), [dispatch]);

  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      onNavbarSetMem();
    } else {
      onNavbarSetNonMem();
    }
  }, [accessToken]);

  function handleClickOotd(e) {
    e.preventDefault();
    setIsOotdBorder(true);
    setIsWeeklyBorder(false);

    if (accessToken) {
      onNavbarSetMem();
    } else {
      onNavbarSetNonMem();
    }
    navigate('/');
  }

  function handleClickWeekly(e) {
    e.preventDefault();
    setIsOotdBorder(false);
    setIsWeeklyBorder(true);

    // onNavbarSetWeekly();

    navigate('/weekly');
  }

  function loginPage() {
    navigate('/login');
  }

  function myPage() {
    navigate('/profile');
  }

  // 상단 네비의 카테고리 클릭 시 적용
  const handleClickCategory = (e) => {
    e.preventDefault();

    //setListOotdBorder(e.target.value);

    if (e.target.value === 1) {
      navigate('/feedPopularList');
    } else if (e.target.value === 2) {
      navigate('/feedList');
    } else if (e.target.value === 3) {
      navigate('/feedFollowingList');
    } else if (e.target.value === 4) {
      navigate('/myPickPage');
    } else if (e.target.value === 5) {
      navigate('/feedScrapList');
    }
  };

  return (
    <>
      <div className="navBarWrapper">
        {accessToken && <TodayWeather></TodayWeather>}

        <nav className="topNavBar">
          <div className="leftNavBar">
            <a className="navLogo" href="/">
              <img src={Logo} className="navLogo" />
              <div>CODED</div>
            </a>
            <div className="leftMenuWrapper">
              <ul className="leftMenuList">
                <li value="feed" className="leftMenu">
                  <span
                    className={
                      navbarIndex2 === 1 ? 'leftMenuOotdAct' : 'leftMenuOotd'
                    }
                    onClick={handleClickOotd}
                  >
                    #OOTD
                    <hr />
                  </span>
                </li>
                {accessToken && (
                  <li value="feed" className="leftMenu">
                    <span
                      className={
                        navbarIndex2 === 2
                          ? 'leftMenuWeeklyAct'
                          : 'leftMenuWeekly'
                      }
                      onClick={handleClickWeekly}
                    >
                      #WEEKLY
                      <hr />
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {navbarType !== 'Weekly' ? (
            // 검색 박스 관련 js와 css는 SearchBox.js로 옮겨 넣었습니다.
            <SearchBox />
          ) : (
            <div style={{ width: '35%' }} />
          )}

          <div className="rightNavBar">
            {accessToken && (
              <>
              <div className="myId" style={{fontSize:"14px",cursor:"pointer"}} 
                      onClick={()=>navigate('/myPickPage')}>{userId}님 <br/> 환영합니다.</div>
              <motion.div
                className="rightMenuWrapper"
                whileHover={{ scale: 1.1 }}
              >
                <ChatButton />
              </motion.div>
              </>
            )}
            <motion.div
              className="rightMenuWrapper"
              whileHover={{ scale: 1.1 }}
            >
              {accessToken ? (
                <>
                  <button onClick={()=>{
                    axios({
                      method:"get",
                      url:"/auth/logout",
                      headers:{
                          Authorization:`Bearer ${accessToken}`
                      }
                  })
                  .then((response)=>{
                      onLogout();
                      navigate("/");
                  })
                  .catch((error)=>{
                      console.log(error);
                  })
                  }}
                  className="loginBtn">
                    로그아웃
                  </button>
                </>
              ) : (
                <button onClick={loginPage} className="loginBtn">
                  로그인 / 회원가입
                </button>
              )}
            </motion.div>
          </div>
        </nav>
        {navbarType === 'Mem' && (
          <nav className="bottomNavBar">
            <ul className="categories">
              <li
                value="1"
                className={navbarIndex === 1 ? 'isListOotdBorder' : ''}
                onClick={handleClickCategory}
              >
                Hot
              </li>
              <li
                value="2"
                className={navbarIndex === 2 ? 'isListOotdBorder' : ''}
                onClick={handleClickCategory}
              >
                New
              </li>
              <li
                value="3"
                className={navbarIndex === 3 ? 'isListOotdBorder' : ''}
                onClick={handleClickCategory}
              >
                Following
              </li>
              <li
                value="4"
                className={navbarIndex === 4 ? 'isListOotdBorder' : ''}
                onClick={handleClickCategory}
              >
                MyPick
              </li>
              <li
                value="5"
                className={navbarIndex === 5 ? 'isListOotdBorder' : ''}
                onClick={handleClickCategory}
              >
                Scrap
              </li>
            </ul>
          </nav>
        )}
        {navbarType === 'NonMem' && (
          <nav className="bottomNavBar">
            <ul className="categories">
              <li
                value="1"
                className={navbarIndex === 1 ? 'isListOotdBorder' : ''}
                onClick={handleClickCategory}
              >
                Hot
              </li>
              <li
                value="2"
                className={navbarIndex === 2 ? 'isListOotdBorder' : ''}
                onClick={handleClickCategory}
              >
                New
              </li>
            </ul>
          </nav>
        )}
        {navbarType === 'Weekly' && (
          <nav className="bottomNavBar">
            <p className={isHomeBorder ? 'isHomeBorder' : ''}>CODI FOR YOU</p>
          </nav>
        )}
      </div>
    </>
  );
}

export default Navbar;
