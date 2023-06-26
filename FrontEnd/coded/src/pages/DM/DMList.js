import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SockJsClient from 'react-stomp';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';







function DMList() {

    const DMListOuter = styled('div')`
    margin:auto;
    border: 1px solid black;
    width:1000px;=
    height:600px;
    

    >div{border: 1px solid black; box-sizing: border-box; 
        padding: 10px;}

    .chatBox{height:100%; width:60%; float:left;}

        .chat{height:80%; width:100%; background-color: lightgray;}

        .inputChat{height:8%; width:100%; background-color: lightgray;}

            .sendChat{
                width:90%; height:30px;
                margin-left:28px;
                font-size: 15px;
                color: #222222;
                border: none;
                background: white;
                border-radius:5px;
                padding:10px;
            }
            .sendChat:focus{outline:none;}

    .List{height: 100%; width:40%; float:left;}

        .chatNavBar{height:10%; width:100%; background-color: lightgray;
        margin-bottom:10px;}
   
        .searchBox{height:10%; width:100%; background-color: lightgray;
        margin-bottom:10px;}
            
            .search{margin-top:14px; width:90%; height:30px;
                margin-left:20px;
                font-size: 15px;
                color: #222222;
                border: none;
                border-bottom: solid #aaaaaa 2px;
                background: none;
                padding:10px;
            }
            .search:focus{outline:none;}
   
        .chatList{height:88%; width:100%; background-color: lightgray;}
            .RoomElement{height:80px; width:100%; border:1px solid black; display:flex;}
                .profilePic{width:30%; height:100%; border:1px solid black; }
                .profile{width:70%; height:100%; border:1px solid black; }
                    .roomNo{display:none;}
                    .roomUserId{width:50%; height:50%;}
                    .roomUserNickname{width:50%; height:50%;}

        

    `



    const accessToken = useSelector((state) => state.member.access);
    const loginUserNo = useSelector((state) => state.member.userNo);
    const [DMRoomList, setDMRoomList] = useState([]);
    const [DMList, setDMList] = useState([]);
    const [RoomId, setRoomId] = useState(0);

    useEffect(() => {
        if (loginUserNo > 0) {
            axios({
                method: 'get',
                url: '/DM/selectChatList',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    userNo: loginUserNo
                },
            })
                .then((resp) => {
                    console.log(resp)
                    setDMRoomList(resp.data);
                })
                .catch((error) => console.log(error));
        }
    }, [loginUserNo])


    // const handleClick = (RoomId) => {
    //     setRoomId(RoomId);
    //     console.log(RoomId)
    // }

    useEffect(() => {
        axios.request({
            url: '/DM/selectDMbyRoomid',
            method: 'get',
            params: {
                roomId: RoomId
            },
        })
            .then((resp) => {
                setDMList(resp.data)
            })
    }, [RoomId])


    return (
        <DMListOuter>
            <ChatBox DMList={DMList} loginUserNo={loginUserNo}></ChatBox>
            <div className='List'>
                <div className='searchBox'>
                    <input className='search' type='text'></input>
                </div>
                <div className='chatList'>
                    {DMRoomList.map(dto => <ListElement room={dto} setRoomId={setRoomId} />)}
                </div>
            </div>

        </DMListOuter>
    );
}

const ChatBox = (props) => {

    const DMList = props.DMList;
    const loginUserNo = props.loginUserNo;

    return (
        <div className='chatBox'>
            <div className='chatNavBar'></div>
            <div className='DMList'>
                {DMList.map(DMList=>{return(
                    
                    <div className={DMList.userNo==loginUserNo ? 'mySend' : 'other'}>
                        {DMList.userNo==loginUserNo && (<div className='mySendTime'>{DMList.formedWriteDate}</div>)}
                        {DMList.message}
                        {!(DMList.userNo==loginUserNo) && (<div className='otherTime'>{DMList.formedWriteDate}</div>)}
                    </div>

                );})}
            </div>
            <div className='inputChat'>
                <input className='sendChat' type='text'></input>
            </div>
        </div>
    );
}


const ListElement = (props) => {

    const room = props.room;

    return (
        <div className='RoomElement' onClick={() => { props.setRoomId(room.roomid);}}>
            <div className='profilePic'>
                {room.photoid}
                {room.oriName}
                {room.sysName}
            </div>
            <div className='profile'>
                <div className='roomNo'>
                    {room.userNo}
                </div>
                <div className='roomUserId'>
                    {room.userId}
                </div>
                <div className='roomUserNickname'>
                    {room.userNickname}
                </div>
            </div>
        </div>
    );
}







export default DMList;