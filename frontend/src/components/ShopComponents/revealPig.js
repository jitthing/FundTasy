import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

export default function RevealPig({ pig, setShowPigReveal }) {
    const [isRevealingBackground, setRevealingBackground] = useState(true);
    const [showBlankPig, setShowBlankPig] = useState(true);
    const [isFlash, setFlash] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setRevealingBackground(false);
            setShowBlankPig(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFlash(true);
            const timer2 = setTimeout(() => {
                setFlash(false);
            }, 4000);
            return () => clearTimeout(timer2); 
        }, 2300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Container>
            {isRevealingBackground && (<SpeedLines srcSet="assets/speed-lines.gif" />)}
            {!isRevealingBackground && (<EndBackground onClick={() => setShowPigReveal(false)} />)}
            {showBlankPig && (<BlankPig srcSet="images/mystery.png" />)}
            {!showBlankPig && (<ActualPig srcSet={`images/${pig.toLowerCase()}.png`} />)}
            {isFlash ? <Flash />:null}
        </Container>
    )
}

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 20vw;
    width: 80vw;
    height: 100vh;
    z-index: 50;
    display: flex; 
    align-items: center;
    justify-content: center;
`

const SpeedLines = styled.img`
    width: 100%;
    height: 100%;
    object-fit: fill;
    opacity: 0.95;
`

const PigZoomAnimation = keyframes`
    0% { height: 0%; width: 0%; top: 50%; left: 40vw; }
    100% { height: 50%; width: 50%; top: 25%; left: 20vw; }
`

const BlankPig = styled.img`
    position: absolute;
    top: 25%;
    left: 20vw;
    height: 50%;
    width: 50%;
    z-index: 51;
    object-fit: contain;
    animation: ${PigZoomAnimation} 2.5s ease-in-out;
`

const FlashAnimation = keyframes`
    0% { opacity: 100%; }
    75% { opacity: 0%; }
    90% { opacity: 0%; }
    100% { opacity: 100%; }
`

const Flash = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 80vw;
    height: 100vh;
    z-index: 55;
    background-color: #fff;
    opacity: 100%;
    animation: ${FlashAnimation} 5s ease-in;
`

const EndBackground = styled.div`
    width: 100%;
    height: 100%;
    object-fit: fill;
    opacity: 0.9;
    background-color: #000;
`

const ActualPig = styled.img`
    position: absolute;
    top: 25%;
    left: 20vw;
    height: 50%;
    width: 50%;
    z-index: 55;
    object-fit: contain;    
`