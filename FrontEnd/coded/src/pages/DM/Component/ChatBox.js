import { styled } from "styled-components";
import MenuButton from "./MenuButton";
import SendBtn from "./sendBtn";
import React, { useEffect, useRef } from 'react';


const ChatBox = (props) => {
    const stompClient = props.stompClient;
    const setDMList =props.setDMList;
    const DMList = props.DMList;
    const loginUserNo = props.loginUserNo;
    const dmListRef = useRef(null);
    const DMRoom = props.DMRoom;
    const Send = props.Send;
    const disconnect = props.disconnect;

    useEffect(() => {
        scrollToBottom();
    }, [DMList]);

    const scrollToBottom = () => {
        if (dmListRef.current) {
            dmListRef.current.scrollTop = dmListRef.current.scrollHeight;
        }
    };

  

    return (
        <ChatBoxContainer>
            <div className='chatNavBar'>
                <div className="otherPhoto">
                    {DMRoom.sysName != null ? (
                        <img
                            src={`/images/${DMRoom.sysName}`}
                        ></img>
                    ) : (
                        <img className="profileImg"
                            src={`/images/test.jpg`}
                        ></img>)}
                </div>
                <div className="otherInfo">
                    <div className="otherId">{DMRoom.userId}</div>
                    <div className="otherNickname">{DMRoom.userNickname}</div>
                </div>
                <MenuButton disconnect={disconnect}></MenuButton>
            </div>
            <div className='DMList' ref={dmListRef}>
                {DMList.length > 0 &&
                    DMList.map((DMList, index) => {
                        return (
                            <div key={index} className={DMList.userNo === loginUserNo ? 'mySend' : 'other'}>
                                <div className={DMList.userNo === loginUserNo ? 'myMsg' : 'otherMsg'}>
                                    {DMList.message}
                                </div>
                                {DMList.userNo === loginUserNo ? (
                                    <div className='mySendTime'>{DMList.formedWriteDate}</div>
                                ) : (
                                    <div className='otherTime'>{DMList.formedWriteDate}</div>
                                )}
                            </div>
                        );
                    })}
            </div>
            <div className='inputChat'>
                <SendBtn setDMList={setDMList} DMRoom={DMRoom} stompClient={stompClient} Send={Send}
                ></SendBtn>
            </div>
        </ChatBoxContainer>
    );
}

const ChatBoxContainer = styled.div`
width:100%; height:100%; 

.chatNavBar{height:10%; width:100%; background-color: lightgray;
    margin-bottom:10px; border-radius:5px; display:flex;}
    .otherPhoto{height:100%; width:15%; display:flex; justify-content:center;}
    .profileImg{height:100%;}
    .otherInfo{height:100%; width:70%;}
        .otherId{height:50%; width:100%; padding:5px;}
        .otherNickname{height:50%; width:100%; padding:5px;}
.DMList{height:80%; width:100%; background-color: lightgray; display: flex; border-radius:5px;
    flex-flow: wrap; overflow-wrap: break-word; overflow: overlay}   

    .mySend{width: 100%;
    padding: 5px;
    display: flex;
    margin-bottom: 10px;
    justify-content: center;
    flex-direction: column;
    align-items: end;}
    .other{width: 100%;
        padding: 5px;
        display: flex;
        margin-bottom: 10px;
        justify-content: center;
        flex-direction: column;
        align-items: start;}
    
    .myMsg{max-width:400px; text-align:right;}
    .otherMsg{max-width:400px; text-align:left;}
    .mySendTime{font-size:12px; text-align:right;}
    .otherTime{font-size:12px; text-align:left;}
`

export default ChatBox;