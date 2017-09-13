import styled from 'styled-components';
import React from 'react';

export const Img = styled.img`
    box-sizing: border-box;
    max-height: 150px;
    
    vertical-align: bottom;
    
    display: ${props => props.hidden ? 'none' : 'inherit'};
    
    @media screen and (min-width: 576px) {
        max-height: 200px;
    }
`;

export const BlurredImg = Img.extend`
    filter: blur(25px);
`;
