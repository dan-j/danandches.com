import React from 'react';
import styled, { keyframes } from 'styled-components';
import { beige, blue } from '../../../styles/colors';

const baseLineHeight = 32;
const pulseDuration = 750;

const pulse = keyframes`
  33% { 
    background: ${blue};
  } 
  80% {
    background: ${beige};
  }
`;

const Loading = styled.div`
  margin: 4em auto;
  position: relative;
  width: ${baseLineHeight / 4}px;
  height: ${baseLineHeight}px;
  background: ${beige};
  animation: ${pulse} ${pulseDuration}ms infinite ease-in;
  animation-delay: ${pulseDuration / 3}ms;
  
  &:before, &:after {
    content: '';
    position: absolute;
    display: block;
    height: ${baseLineHeight / 1.75}px;
    width: ${baseLineHeight / 4}px;
    background: ${beige};
    top: 50%;
    transform: translateY(-50%);
    animation: ${pulse} ${pulseDuration}ms infinite ease-in;
  }
  &:before {
    left: ${-baseLineHeight / 2}px;
  }
  &:after {
    left: ${baseLineHeight / 2}px;
    animation-delay: ${pulseDuration / 1.5}ms;
  }
`;

export default Loading;
