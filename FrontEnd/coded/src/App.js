import React, { useCallback, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IndexPage from './IndexPage';
import Login from './pages/auth/Login/Login';
import SignUp from './pages/auth/SignUp/SignUp';
import Profile from './component/Profile/Profile';
import FeedList from './component/FeedList/FeedList';
import Ootd from './pages/ootd/Main/Main';
import FeedListByIdWithMain from './test/FeedListByIdWithMain';
import FeedListByHashsWithMain from './test/FeedListByHashsWithMain';
import FeedListByNickNameWithMain from './test/FeedListByNickNameWithMain';
import FileUploadTest from './test/FileUploadTest';
import KakaoCodeCallbackPage from './pages/auth/Login/OAuthKakaoCodeCallback';
import LastCallbackPage from './pages/auth/Login/OAuthLastCallback';
import NaverCodeCallbackPage from './pages/auth/Login/OAuthNaverCodeCallback';
import DMPage from './pages/DM/DMPage';
import HomePageTemplate from './pages/HomePageTemplate';
import IdSearch from './pages/auth/Login/IdSearch';
import PwSearch from './pages/auth/Login/PwSearch';
import GoogleCodeCallbackPage from './pages/auth/Login/OAuthGoogleCodeCallback';
import { useDispatch } from 'react-redux';
import { login, logout, setRefresh } from './modules/members';
import cookie from 'react-cookies';
import axios from 'axios';

function App(){

  const dispatch = useDispatch();
  const onLogin = useCallback(
    (accessToken, userId, userNo) => dispatch(login(accessToken, userId, userNo)),
    [dispatch],
  );
  const onLogout = useCallback(() => dispatch(logout(), [dispatch]));
  const onSetRefresh = useCallback(
    (refreshToken) => dispatch(setRefresh(refreshToken)),
    [dispatch],
  );

  useEffect(()=>{
    axios({
      method:'get',
      url:'/auth/refresh'
    }).then((response)=>{
      let refreshToken = cookie.load('CodedRefreshToken');
        refreshToken = refreshToken.substr(
          'Bearer '.length,
          refreshToken.length,
        );
      onLogin(response.data.accessToken, response.data.userId, response.data.userNo);
      onSetRefresh(refreshToken);
    }).catch((error)=>{
      onLogout();
      console.log(error);
    })
  },[]);

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/HomePageTemplate" element={<HomePageTemplate />} />
          <Route path="/feed" element={<FeedList />} />
          <Route path="/feed/id" element={<FeedListByIdWithMain />} />
          <Route path="/feed/nick" element={<FeedListByNickNameWithMain />} />
          <Route path="/feed/hashs" element={<FeedListByHashsWithMain />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/FileUploadTest" element={<FileUploadTest />} />
          <Route path="/DMPage" element={<DMPage />} />
          <Route path="/ootd" element={<Ootd />} />
          <Route path="/idSearch" element={<IdSearch />} />
          <Route path="/pwSearch" element={<PwSearch />} />

          <Route
            path="/login/oauth2/code/kakao"
            element={<KakaoCodeCallbackPage />}
          />
          <Route
            path="/login/oauth2/callback/kakao"
            element={<LastCallbackPage />}
          />
          <Route
            path="/login/oauth2/code/naver"
            element={<NaverCodeCallbackPage />}
          />
          <Route
            path="/login/oauth2/callback/naver"
            element={<LastCallbackPage />}
          />
          <Route
            path="/login/oauth2/code/google"
            element={<GoogleCodeCallbackPage/>}
          />
          <Route
            path="/login/oauth2/callback/google"
            element={<LastCallbackPage/>}
          />
        </Routes>
      </BrowserRouter>
    );
}
export default App;
