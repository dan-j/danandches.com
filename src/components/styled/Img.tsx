import styled, { css } from 'styled-components';
import React from 'react';
import { fade } from './transitions';

export const Img = styled.img`
    box-sizing: border-box;
    max-height: 150px;
    
    vertical-align: bottom;
    
    @media screen and (min-width: 576px) {
        max-height: 200px;
    }
    
    ${props => props.hidden ? css`
        display: none;
    ` : css`
        animation: ${fade} 200ms ease-in;
    `}    
`;

export const BlurredImg = Img.extend`
    filter: blur(15px);
`;
