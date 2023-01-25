import React, { useEffect } from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"

import { auth, provider } from '../firebase'
import { signInWithPopup, signOut } from 'firebase/auth';
import { selectUserName, selectUserEmail, selectUserPhoto, setUserLoginDetails, setSignOutState } from '../features/user/userSlice';

const Header = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const username = useSelector(selectUserName)
  const userPhoto = useSelector(selectUserPhoto)

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user)
        navigate("/home")
      }
    })
  }, [username])

  const handleAuth = () => {
    if (!username) {
      signInWithPopup(auth, provider)
        .then((result) => {
          setUser(result.user)
        })
        .catch((error) => alert(error.message))
    } else if (username) {
      signOut(auth)
        .then(() => {
          dispatch(setSignOutState());
          navigate("/");
        })
        .catch((error) => alert(error.message))
    }
  }

  const setUser = (user) => {
    dispatch(setUserLoginDetails({
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
    }
    ))
  }
  return (
    <Nav>

      <Logo>
        <img src="/images/logo.svg" alt="Disney+" />
      </Logo>

      {!username ?
        (<Login onClick={handleAuth}>Login</Login>)
        :
        (
          <>
            <NavMenu>

              <a href="/home">
                <img src="/images/home-icon.svg" alt="HOME" />
                <span>Home</span>
              </a>
              <a href="">
                <img src="/images/search-icon.svg" alt="SEARCH" />
                <span>Search</span>
              </a>
              <a href="">
                <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />
                <span>Watchlist</span>
              </a>
              <a href="">
                <img src="/images/original-icon.svg" alt="ORIGINALS" />
                <span>Originals</span>
              </a>
              <a href="">
                <img src="/images/movie-icon.svg" alt="MOVIES" />
                <span>Movies</span>
              </a>
              <a href="">
                <img src="/images/series-icon.svg" alt="SERIES" />
                <span>Series</span>
              </a>
            </NavMenu>
            <SignOut>
              <UserImg src={userPhoto} alt={username} />
              <DropDown>
                <span onClick={handleAuth}>Log out</span>
              </DropDown>

            </SignOut>
          </>
        )}

    </Nav>
  )
}

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;

  span{
      //To center pefectly cause text is uppercase :
    padding-top: 1px;
    }
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
    min-width: 70px;
  }
`;


const NavMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-flow: row nowrap;
  height: 100%;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;
  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    &:hover{
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  

    img{
      height: 20px;
      min-width: 20px;
      width: 24px;
      z-index: auto;
    }
    span{
      letter-spacing: 2px;
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;

      &:before{
        content:"";
        background-color: #fff;
        border-radius: 0px 0px 4px 4px;

        bottom: -6px;

        height: 2px;
        left:0px;
        right: 0px;
        position: absolute;

        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        opacity: 0;
        visibility: hidden;
        width: auto;
      }
    }
    /* @media (max-width: 768px) {
    display: none;
    } */
  }
`
const Login = styled.a`
    background-color: rgba(0,0,0,0);
    padding: 8px 16px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border: 1px solid #f9f9f9;
    border-radius: 4px;
    transition: all 0.3s ease 0s;

    &:hover{
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
        cursor: pointer;
    }
`;

const UserImg = styled.img`
  height: 100%;
`;

const DropDown = styled.div`
  top: 48px;
  width: 100px;
  position: absolute;
  right:0px;
  background-color: rgb(19, 19, 19);
  border:  1px solid rgba(151,151,151,0.34);
  box-shadow: rgb(0 0 0/50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  opacity: 0;
  text-align: center;
  
`
const SignOut = styled.div`
  position: relative;
  height: 48px;
  width:48px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  ${UserImg} {
    border-radius: 50%;
    width: auto;
    height: 100%;
  }
  &:hover{
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
    
  }
  
`;


export default Header