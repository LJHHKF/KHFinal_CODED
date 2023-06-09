import React, { Component, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Footer.scss';
import Modal from 'react-modal';
import { motion, useScroll } from 'framer-motion';
import Tos from './Component/Tos/TermsOfUse';
import ConfirmDialog from '../Common/ConfirmDialog';

const Footer = () => {
  const [modal, setModal] = useState(false);
  const accessToken = useSelector((state) => state.member.access);
  const [loginConfirm, setLoginConfirm] = useState(false);

  const navigate = useNavigate();
  //모달 창 닫기
  const closeModal = () => {
    if (modal) {
      setModal(false);
    }
  };

  function toDeleteAccount() {
    if (accessToken) {
      navigate('/deleteAccount');
    } else {
      setLoginConfirm(true);
    }
  }

  function Modal() {
    const modalBodyRef = useRef(null);
    const { scrollYProgress } = useScroll({
      container: modalBodyRef,
    });
    return (
      <>
        <div className="modal" onClick={closeModal}>
          <motion.div
            className="progress-bar"
            style={{ scaleX: scrollYProgress }}
          />
          <div className="modalBody" ref={modalBodyRef}>
            <div className="tosContent">
              <Tos></Tos>
            </div>
          </div>
        </div>
      </>
    );
  }
  // const openModal = () => {
  //   if (!modal) {
  //     setModal(true);
  //   }
  // };

  return (
    <div className="Footer">
      <div className="footerContainer">
        <div className="left">
          <div className="title">
            <p>members.</p>
          </div>
          <div className="descList">
            <div style={{ cursor: 'pointer' }} onClick={toDeleteAccount}>
              Delete Account
            </div>
          </div>
        </div>
        <div className="middle">
          <div className="title">
            <p>us.</p>
          </div>
          <div
            className="descList"
            onClick={() => {
              setModal(true);
            }}
          >
            Terms of Use
          </div>
          <div
            className="descList"
            onClick={() => {
              setModal(true);
            }}
          >
            Privacy Policy
          </div>
        </div>

        <div className="right">
          <div className="title">
            <p>contact.</p>
          </div>
          <div className="descList">
            <div className="contactWrapper">
              <p>coded@official.com</p>
            </div>
          </div>
        </div>
        {loginConfirm && <ConfirmDialog setAlertCheck={setLoginConfirm} />}
        {modal && <Modal />}
      </div>
    </div>
  );
};

export default Footer;
