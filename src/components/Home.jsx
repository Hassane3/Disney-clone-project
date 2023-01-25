import React from 'react'
import styled from 'styled-components'
import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import db from '../firebase'
import { ref, onValue } from "firebase/database"
import { setMovies } from '../features/movie/movieSlice'
import { selectUserName } from '../features/user/userSlice'

import ImgSlider from "./ImgSlider"
import Viewers from "./Viewers"
import Recommends from './Recommends'
import NewDisney from "./NewDisney"
import Originals from './Originals'
import Trendings from './Trending'


const Home = () => {
    const dispatch = useDispatch();
    const userName = useSelector(selectUserName);

    let recommends = [];
    let newDisneys = [];
    let originals = [];
    let trendings = [];

    useEffect(() => {
        const query = ref(db, "movies");
        return onValue(query, (snapshot) => {
            // const data = snapshot.val();

            if (snapshot.exists()) {

                // Object.values(data).map((movie) => {
                // To have acces to the auto id, we must use forEach on snapshot: 
                snapshot.forEach((movie) => {
                    switch (movie.val().type) {
                        case "recommend":
                            recommends.push({ id: movie.key, ...movie.val() })
                            // recommends.push(movie.val())
                            break;
                        case "new":
                            console.log("FILM new ", movie.val().title)
                            newDisneys.push({ id: movie.key, ...movie.val() })
                            break;
                        case "original":
                            console.log("FILM original ", movie.val().title)
                            originals.push({ id: movie.key, ...movie.val() })
                            break;
                        case "trending":
                            console.log("FILM trrending ", movie.val().title)
                            trendings.push({ id: movie.key, ...movie.val() })
                            break;

                        default:
                            break;
                    }
                })
            }
            dispatch(setMovies({
                recommend: recommends,
                newDisney: newDisneys,
                original: originals,
                trending: trendings,
            }))
        })


    }, [userName])

    return (
        <Container>
            <ImgSlider />
            <Viewers />
            <Recommends />
            <NewDisney />
            <Originals />
            <Trendings />

        </Container>
    )
}

const Container = styled.main`
    position: relative;
    min-height: calc(100vh - 250px);
    overflow-x: hidden;
    display: block;
    top: 27px;
    padding: 0 calc(3.5vw + 5px);

    ::after{
        content:"";
        background: url("/images/home-background.png") center center / cover no-repeat fixed ;
        position: absolute;
        inset: 0px;
        opacity:1;
        z-index: -1;
    }
`

export default Home