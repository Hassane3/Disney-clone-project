import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { ref, onValue } from "firebase/database"


import db from "../firebase"

const Detail = () => {
  const idObject = useParams()
  const [detailData, setDetailData] = useState({})

  useEffect(() => {
    const movieRef = ref(db, "movies");
    return onValue(movieRef, (snapshot) => {
      if (snapshot.hasChild(idObject.id)) {
        setDetailData(snapshot.child(idObject.id).val())
      } else {
        console.log("no such document in firebase")
      }
    })
  }, [idObject])

  return (
    <Container >
      <Background>
        <img src={detailData.backgroundImg} alt={detailData.title} />
      </Background>

      <ImageTitle>
        <img src={detailData.titleImg} alt={detailData.title} />
      </ImageTitle>

      <ContentMeta>
        <Controls>
          <Player>
            <img src="/images/play-icon-black.png" alt="player icon" />
            <span >Play</span>
          </Player>
          <Trailer>
            <img src="/images/play-icon-white.png" alt="trailer icon" />
            <span>Trailer</span>
          </Trailer>
          <AddList>
            <span />
            <span />
          </AddList>
          <GroupWatch>
            <div>
              <img src="/images/group-icon.png" alt="groupwatch icon" />
            </div>
          </GroupWatch>
        </Controls>
        <SubTitle>
          {detailData.subTitle}
        </SubTitle>
        <Description>
          {detailData.description}
        </Description>
      </ContentMeta>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  display: block;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
`

const Background = styled.div`
  opacity: 0.8;
  position: fixed;
  left: 0px;
  right: 0px;
  /* top: 0px; */
  bottom: 0px;
  z-index: -1;
  width:100vw;
  height: calc(100vh - 70px);
  
  img{
    height: 100%;
    width: 100%;
    object-fit: cover;

    /* @media screen and (max-width: 768px) {
      width: initial;
    } */
  }

`
const ImageTitle = styled.div`
  display:flex;
  align-items: flex-end;
  -webkit-box-pack: start;
  justify-content: flex-start;
  margin:0px auto;
  height: 30vw;
  min-height: 170px;
  width: 100%;
  padding-bottom: 24px;

  img {
    max-width: 600px;
    min-width: 200px;
    width: 35vw; 
  }
  `

const ContentMeta = styled.div`
    max-width: 874px;
  `
const Controls = styled.div`
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    margin: 24px 0px;
    min-height : 56px;
  `
const Player = styled.button`
  font-size: 15px;
  margin: 0px 22px 0px 0px;
  padding: 0px 24px;
  height: 56px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1.8px;
  text-align: center;
  text-transform: uppercase;
  background-color: rgb(249,249,249);
  border: none;
  color: rgb(0,0,0);

  img{
    width: 32px;
  }

  &:hover {
    background-color: rgb(198,198,198)
  }
  
  @media screen and (max-width: 768px){
    height: 45px;
    padding: 0px 12px;
    font-size: 12px;
    margin: 0px 10px 0px 0px;

    img {
      width: 25px;
    }
  }
`

const Trailer = styled(Player)`
  background: rgba(0,0,0,0.3);
  border: 1px solid rgb(249,249,249);
  color: rgb(249,2449,249);
`

const AddList = styled.div`
  margin-right: 16px;
  height: 44px;
  width: 44px;
  min-height: 44px;
  min-width: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.6);
  border: solid 2px #fff;
  border-radius: 50%;
  cursor: pointer;

  span {
    background-color: rgb(249,249,249);
    display: inline-block;
  

    &:first-child {
      height: 2px;
      transform: translate(1px, 0px) rotate(0deg);
      width: 16px;
    }

    &:nth-child(2) {
      height: 16px;
      width: 2px;
      transform: translateX(-8px) rotate(0deg);
    }
  }
`

const GroupWatch = styled.div`
  height: 44px;
  width: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 50%;
  cursor: pointer;

  div {
    height: 40px;
    width: 40px;
    background: rgb(0,0,0);
    border-radius: 50%;

    img {
      width: 100%;
    }
  }
  
`

const SubTitle = styled.div`
  color: rgb(249,249,249);
  font-size: 15px;
  min-height: 20px;  

  @media (max-width: 768px) {
    font-size: 12px;
  }
`
const Description = styled.div`
  line-height: 1.4;
  font-size: 20px;
  padding: 16px 0px;
  color: rgb(249,249,249);

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`


export default Detail;
