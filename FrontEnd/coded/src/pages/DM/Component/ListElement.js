import { useEffect, useState } from 'react';

import { styled } from 'styled-components';

const ListElement = (props) => {
  const room = props.room;
  const { setDMRoom } = props;

  const [roomCheck, setRoomCheck] = useState(room.chk>0);

  const handleDMRoom = () => {
    setDMRoom(room);
    setRoomCheck(false);
  };

  return (
    <RoomElement>
      <div className="RoomElement" onClick={handleDMRoom}>
        <div className="profilePic">
          {room.sysName != null ? (
            <img className="profileImg" src={`/images/${room.sysName}`}></img>
          ) : (
            <img className="profileImg" src={`/images/test.jpg`}></img>
          )}
        </div>
        <div className="profile">
          <div className="roomId">{room.userNo}</div>
          <div className="roomUserNickname">{room.userNickname}</div>
          <div className="roomUserId">{room.userId}</div>
        </div>
            {roomCheck  && 
        <div className='readCheck'>
          <svg fill="none" width="30" height="30" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M1.7964 2.0985C1.57549 1.93282 1.26208 1.97759 1.0964 2.1985C0.930714 2.41942 0.975485 2.73282 1.1964 2.8985L3.1984 4.40001C3.41932 4.5657 3.73272 4.52093 3.8984 4.30001C4.06409 4.0791 4.01932 3.7657 3.7984 3.60001L1.7964 2.0985ZM1 7.00003C0.723858 7.00003 0.5 7.22389 0.5 7.50003C0.5 7.77617 0.723858 8.00003 1 8.00003H2.5C2.77614 8.00003 3 7.77617 3 7.50003C3 7.22389 2.77614 7.00003 2.5 7.00003H1ZM9.99766 2C13.1466 2 15.7416 4.33488 15.9821 7.3554L15.9955 7.57762L16 7.80214L15.999 11.398L16.9244 13.6202C16.947 13.6743 16.9647 13.7302 16.9774 13.7871L16.9926 13.8733L17.0013 14.0046C17.0013 14.4526 16.7048 14.8387 16.2521 14.9677L16.1358 14.9945L16.0013 15.0046L12.4996 15.004L12.4946 15.1653C12.4095 16.469 11.3252 17.5 10 17.5C8.67453 17.5 7.58998 16.4685 7.50533 15.1644L7.49962 15.004L3.99891 15.0046C3.91096 15.0046 3.82358 14.993 3.73902 14.9702L3.61456 14.9277C3.20378 14.7567 2.96181 14.3392 3.01221 13.8757L3.0333 13.7483L3.07572 13.6202L3.99902 11.401L4.0001 7.79281L4.0044 7.56824C4.12702 4.45115 6.77104 2 9.99766 2ZM11.4996 15.004H8.49962L8.50697 15.1454C8.57552 15.8581 9.14275 16.425 9.85556 16.4931L10 16.5C10.7797 16.5 11.4205 15.9051 11.4931 15.1445L11.4996 15.004ZM9.99766 3C7.37511 3 5.22717 4.92372 5.01715 7.38498L5.00393 7.59723L5.00002 7.80214V11.5L4.96161 11.6922L3.9989 14.0046L15.9566 14.0066L16.0019 14.0045L15.0384 11.6922L15 11.5L15.0001 7.81241L14.996 7.60831C14.8909 5.0349 12.6947 3 9.99766 3ZM18.9036 2.1985C18.7379 1.97759 18.4245 1.93282 18.2036 2.0985L16.2016 3.60001C15.9807 3.7657 15.9359 4.0791 16.1016 4.30001C16.2673 4.52093 16.5807 4.5657 16.8016 4.40001L18.8036 2.8985C19.0245 2.73282 19.0693 2.41942 18.9036 2.1985ZM19.5 7.50003C19.5 7.22389 19.2761 7.00003 19 7.00003H17.5C17.2239 7.00003 17 7.22389 17 7.50003C17 7.77617 17.2239 8.00003 17.5 8.00003H19C19.2761 8.00003 19.5 7.77617 19.5 7.50003Z" fill="#212121"/></svg>
        </div>
            }
      </div>
    </RoomElement>
  );
};

const RoomElement = styled.div`
  .RoomElement {
    height: 55px;
    width: 100%;
    padding: 5px;
    display: flex;
    margin-bottom:10px;
  }
  .RoomElement:hover {
    cursor: pointer;
    background-color:rgb(240,240,240);
  }
  .profilePic {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .profileImg {
    width: 45px;
    height: 45px;
    border: 1px solid #d3d3d3;
    border-radius: 30px;
  }
  .profile {
    width: 70%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left : 10px;
  }
  .roomId {
    display: none;
    padding: 5px;
  }
  .roomUserNickname {
    width: 50%;
    height: 50%;
    font-size: 15px;
    font-weight: 600;
    display: flex;
    align-items: center;
    line-height:20px;
  }
  .roomUserId {
    width: 50%;
    height: 50%;
    font-size: 14px;
    display: flex;
    align-items: center;
    line-height:20px;
  }
  .readCheck{
    width:10%;
    height:100%;
    display:flex;
    align-items:center;
    justify-content:center;
  }

`;

export default ListElement;
