import React, { useCallback, useEffect, useRef, useState } from 'react';
import './ReportModal.scss';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { styled } from 'styled-components';
import { setNonMember } from '../../../modules/Redux/navbarSetting';
import Modal from 'react-modal';

const ImageLayout = styled('div')`
  max-width: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ReportH3 = styled('h3')`
  width: 100%;
  font-size: 26px;
  margin-top: 40px;
  color: black;
  line-height: 18.2px;
  text-decoration: none solid rgb(114, 120, 127);
  text-align: center;
  vertical-align: middle;
  word-spacing: 0px;
`;

const Reportdiv = styled('div')`
  margin: 0.5rem;
  padding-bottom: 2px;
  color: #222;
  font-size: 18px;
  font-weight: bold;
  color: silver;
  text-align: center;
`;

const Reportdiv2 = styled('div')`
  text-align: center;
  margin-top: 20px;
  color: #ff0066;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 20px;
`;

const EtcArea = styled('textarea')`
  padding: 4px;
  resize: none;
`;

const Buttonok = styled('button')`
  text-align: center;
  font-size: 15px;
  border-radius: 20px;
  position: relative;
  width: 110px;
  height: 60px;
  background-color: black;
  border: none;
  color: white;
  cursor: pointer;
  font-weight: bold;
`;

const Buttonok2 = styled('button')`
  font-size: 13px;
  font-weight: bold;
  margin-left: 48px;
  position: relative;
  border-color: gray;
  border-radius: 13px;
  background-color: black;
  width: 62px;
  border: none;
  height: 28px;
  color: white;
  cursor: pointer;
`;

// 푸터 회원탈퇴 ,팔로우 좋아요,채팅 댓글,대댓글(일반 피드클릭이랑 서치 검색후 피드)
//=>로그인안했을경우에 로그인창 뜨게하기

function ReportModal({ feedPostId, onReportView }) {
  const [text, setText] = useState('');
  const [reportType, setReportType] = useState('a');

  const dispatch = useDispatch();
  const [userNo, setUserNo] = useState(0);
  const accessToken = useSelector((state) => state.member.access);
  const denyAccess = useCallback(() => dispatch(setNonMember()), [dispatch]);

  const handleReportNumber = (ev) => {
    setReportType(ev.target.value);
    if (String(ev.target.value) !== 'e') {
      setText('');
    }
  };

  const handleEtcContents = (ev) => {
    setText(ev.target.value);
  };

  useEffect(() => {
    if (accessToken) {
      // 1. 토큰 값으로 나의 고유 넘버를 반환
      axios({
        url: '/auth/userNo',
        method: 'get',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((resp) => {
          setUserNo(resp.data);
        })
        // 2. 고유 넘버로 유저 정보 반환
        .catch((error) => {
          console.log(error);
        });
    } else {
      denyAccess();
    }
  }, [accessToken]);

  const handlePopupok = () => {
    let str = '';
    switch (reportType) {
      case 'a':
        {
          str = '개인정보 침해 및 명예훼손';
        }
        break;

      case 'b':
        {
          str = '불법 광고';
        }
        break;

      case 'c':
        {
          str = '도배';
        }
        break;

      case 'd':
        {
          str = '저작권 침해';
        }
        break;

      case 'e':
        {
          str = '기타';
        }
        break;
    }
    if (!reportType === 'e') {
      body;
    }

    const form = new FormData();
    form.append('writerUserNo', userNo);
    form.append('targetFeedPostId', feedPostId);
    form.append('title', str);
    form.append('body', text);

    axios({
      url: '/feedReport/insertReport',
      method: 'post',
      data: form,
    })
      .then((resp) => {
        alert('신고가 접수 되었습니다.');
        onReportView();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="reportmodalwrapper">
      <div className="mainWrapper">
        <div className="modalWrapper">
          <div
            className="reportInnerWrapper"
            style={{ flexDirection: 'column' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="closeBtnLayout">
              <button className="closeBtn" onClick={onReportView}>
                x
              </button>
            </div>
            <ReportH3>REPORT</ReportH3>
            <Reportdiv>신고사유를 선택해주세요</Reportdiv>

            <div className="radioLayout">
              <div className="radios">
                <p>
                  <label>
                    <input
                      type="radio"
                      value="a"
                      name="test"
                      onChange={handleReportNumber}
                    />
                    개인정보 침해 및 명예훼손
                  </label>
                </p>
              </div>
              <div className="radios">
                <p>
                  <label>
                    <input
                      type="radio"
                      value="b"
                      name="test"
                      onChange={handleReportNumber}
                    />
                    불법 광고
                  </label>
                </p>
              </div>
              <div className="radios">
                <p>
                  <label>
                    <input
                      type="radio"
                      value="c"
                      name="test"
                      onChange={handleReportNumber}
                    />
                    도배
                  </label>
                </p>
              </div>
              <div className="radios">
                <p>
                  <label>
                    <input
                      type="radio"
                      value="d"
                      name="test"
                      onChange={handleReportNumber}
                    />
                    저작권 침해
                  </label>
                </p>
              </div>
              <div className="radios">
                <p>
                  <label>
                    <input
                      type="radio"
                      value="e"
                      name="test"
                      onChange={handleReportNumber}
                    />
                    기타 (직접입력)
                  </label>
                </p>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              {reportType === 'e' ? (
                <EtcArea
                  style={{
                    padding: '4px',
                    backgroundColor: 'white',
                    border: '1px solid #c9cdd2',
                    borderRadius: '10px',
                    padding: '10px',
                  }}
                  rows="7"
                  cols="50"
                  value={text}
                  onChange={handleEtcContents}
                />
              ) : (
                <EtcArea
                  readOnly
                  style={{
                    pointerEvents: 'none',
                    border: '1px solid #c9cdd2',
                    backgroundColor: '#f3f3f3',
                    borderRadius: '10px',
                    padding: '10px',
                  }}
                  rows="7"
                  cols="50"
                  value={text}
                />
              )}
            </div>
            <div className="bottomLayout">
              <Buttonok onClick={handlePopupok}>submit</Buttonok>

              <Reportdiv2>
                허위신고를 할 경우 활동에 제한을 받을 수 있습니다. <br />이 점
                유의해주시기 바랍니다.
              </Reportdiv2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ReportModal;
