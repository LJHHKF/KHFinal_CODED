import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

function GoogleCodeCallbackPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const code = searchParams.get('code');
    if (code != null || code != undefined || cpde != '') {
      setLoading(true);
      axios({
        method: 'get',
        url: '/login/oauth2/google',
        params: {
          code: code,
        },
      }).then((response) => {
        setLoading(false);
        let url = '/login/oauth2/callback?message=' + response.data;
        navigate(url);
      }).catch((error)=>{
        setLoading(false);
        setError(true);
        console.log(error);
      });
    }else{
      navigate("/login");
    }
  }, []);

  if (loading) {
    return <div>진행 중...</div>;
  }
  if (error) {
    return <div>에러 발생!</div>;
  }
  return <div></div>;
}

export default GoogleCodeCallbackPage;
