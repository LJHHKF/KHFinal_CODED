import React, { useState, useRef, useEffect } from 'react';
import { styled } from 'styled-components';
import styles from './SearchBox.module.scss';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Hashtag } from '../../assets/ModalAsset/IconAsset';

// UserList Li
const UserList = ({
  userNo,
  userId,
  userNickName,
  sysName,
  setIsAutoCompleteOpen,
  toSearch,
}) => {
  const searchByUser = (event) => {
    event.preventDefault();
    setIsAutoCompleteOpen(false);

    // 추후 수정
    location.href = `/myPickPage?userNo=${userNo}`;
  };

  return (
    <li className={styles.userList} onClick={searchByUser}>
      <div className={styles.userLeftSide}>
        {sysName !== null ? (
          <img src={`/images/${sysName}`}></img>
        ) : (
          <img className={styles.thumbNail} src={`/images/test.jpg`}></img>
        )}
      </div>
      <div className={styles.userMiddleSide1}>{userNickName}</div>
      <div className={styles.userMiddleSide2}>{userId}</div>
      {/* <div className={styles.userRightSide}>
          <img src="assets/imgs/north_west.svg" alt="arrowIcon" />
        </div> */}
    </li>
  );
};

// HashTagList Li
const HashTagList = ({ hashTag, setIsAutoCompleteOpen, toSearch }) => {
  const searchByHashtag = (event) => {
    event.preventDefault();
    setIsAutoCompleteOpen(false);

    // 추후 수정
    location.href = `/feedList/search?keyword=${hashTag}`;
  };

  return (
    <li className={styles.hashTagList} onClick={searchByHashtag}>
      <div className={styles.userLeftSide}>
        {/* 해시태그 아이콘 등록해주세요 */}
        <Hashtag cl />
      </div>
      <div className={styles.userMiddleSide}>{hashTag}</div>
      {/* <div className={styles.userRightSide}>
          <img src="assets/imgs/north_west.svg" alt="arrowIcon" />
        </div> */}
    </li>
  );
};

const SearchBox = () => {
  const [searchData, setSearchData] = useState([]);
  const [isAutoCompleteOpen, setIsAutoCompleteOpen] = useState(false);
  const [completedData, setCompletedData] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const autoSearchRef = useRef();
  const toSearch = useNavigate();

  // 검색 자동완성 출력 개수
  const [searchCount, setSearchCount] = useState(5);

  // 검색 전 자동완성 시 보여줄 해시태그 데이터를 가져옴
  useEffect(() => {
    axios
      .request({
        url: '/auth/selectUserListWithProfile',
        method: 'GET',
      })
      .then((resp) => {
        setSearchData(() => {
          return resp.data;
        });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .request({
        url: '/PostHashs/selectAllPostTagNames',
        method: 'GET',
      })
      .then((resp) => {
        setSearchData((prev) => {
          return [...prev, ...resp.data];
        });
      })
      .catch((error) => console.log(error));
  }, []);

  // 검색 자동완성 바깥 범위 (body) 클릭 시 자동완성 폼 사라짐`
  useEffect(() => {
    const handleCheck = (e) => {
      if (autoSearchRef.current && !autoSearchRef.current.contains(e.target)) {
        setIsAutoCompleteOpen(false);
      }
    };
    document.body.addEventListener('click', handleCheck);

    return () => {
      document.body.removeEventListener('click', handleCheck);
    };
  }, []);

  // 검색 입력 시
  const searchboxInput = (e) => {
    setIsAutoCompleteOpen(true);

    let input = e.target.value;

    const temp = [];
    searchData.forEach((item, index) => {
      if (temp.length == searchCount) {
        return;
      }
      if (item.userId !== undefined) {
        if (
          item.userId.indexOf(input) !== -1 ||
          item.userNickName.indexOf(input) !== -1
        ) {
          temp.push(item);
        }
      }
    });

    searchData.forEach((item, index) => {
      if (temp.length == searchCount) {
        return;
      }
      if (item.tagId !== undefined) {
        if (item.hashTag.indexOf(input) !== -1) {
          temp.push(item);
        }
      }
    });

    setSearchInput(input);
    setCompletedData(temp);
    // const debounce = setTimeout(() => {
    //   if (completedData) change();
    // }, 200);
    // return () => {
    //   clearTimeout(debounce);
    // };
    console.log(searchInput);
  };

  // 엔터 누를 시 입력된 검색어로 submit
  const searchHashList = (event) => {
    event.preventDefault();
    setIsAutoCompleteOpen(false);
    toSearch(`/feedList/search?keyword=${searchInput}`);
  };

  return (
    <form className={styles.searchBar} onSubmit={searchHashList}>
      <input
        id="search-keyword"
        type="search"
        value={searchInput}
        placeholder="유저와 스타일을 검색해보세요"
        autoComplete="off"
        onChange={searchboxInput}
      />
      {isAutoCompleteOpen && (
        <div className={styles.autoSearchContainer} ref={autoSearchRef}>
          <div className={styles.autoSearchWrap}>
            {completedData.map((i) => {
              return i.userId !== undefined ? (
                <UserList
                  userNo={i.userNo}
                  userId={i.userId}
                  userNickName={i.userNickName}
                  sysName={i.sysName}
                  setIsAutoCompleteOpen={setIsAutoCompleteOpen}
                  toSearch={toSearch}
                />
              ) : (
                <HashTagList
                  hashTag={i.hashTag}
                  setIsAutoCompleteOpen={setIsAutoCompleteOpen}
                  toSearch={toSearch}
                />
              );
            })}
          </div>
        </div>
      )}
    </form>
  );
};

export default SearchBox;
