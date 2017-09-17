import styled, { keyframes } from 'styled-components';

const keyframe = keyframes`
    0% { 
        transform: scale(0);
    } 100% {
        transform: scale(1.0);
        opacity: 0;
    }
`;

const Pulse = styled.div`
    width: 40px;
    height: 40px;
    
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    background-color: #333;
    
    border-radius: 100%;  
    animation: ${keyframe} 1.0s infinite ease-in-out;
`;

export default Pulse;
