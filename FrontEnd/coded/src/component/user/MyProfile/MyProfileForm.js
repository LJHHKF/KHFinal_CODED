import React from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';



const MyProfileFormBlock = styled.table`
    width: 50%;
    height: 400px;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.1);
`;


const MyProfileForm = ({ history }) => {
    return(
        <MyProfileFormBlock>
            <div className="container">
		    <div className="imageBox">
			    <div className="proImage">
					<img src={image}></img>
			    </div>
                <div className="btns">
				    <button className="profileImageChangebtn">변경하기</button>
                </div>
	        </div>

			<div className="infoBox">
				<div className="infocontents">
					<ul>
                        <li>nick     : </li>
                        <li>id       : </li>
                        <li>pw       : </li>
                        <li>bio      : </li>
                        <li>hashtag  : </li>
                        <li>location : </li>
                    </ul>
				</div>
				<div className="btns">
                    <button className="PwChangeBtn">비밀번호 수정</button>
                    <button className="EditBtn">수정하기</button>
                    <button className="EditCancelBtn">수정취소</button>
                    <button className="EditComBtn">수정완료</button>
                    <button className="MemberOutBtn">회원탈퇴</button>
                </div>
			</div>
	    </div>
        </MyProfileFormBlock>
    );
};

export default withRouter(MyProfileForm);