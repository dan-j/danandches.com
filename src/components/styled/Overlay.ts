import styled, { css, StyledComponentClass, StyledFunction } from 'styled-components';
import React from 'react';

interface OverlayProps extends React.HTMLProps<HTMLDivElement> {
    shouldFill: boolean;
}

const typedDiv: StyledFunction<OverlayProps> = styled.div;

const Overlay: StyledComponentClass<OverlayProps, {}> = typedDiv`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    ${props => props.shouldFill ? css`
        background-color: rgba(43, 65, 98, 0.1);
    ` : css`
        background-color: transparent;
    `}
`;

export default Overlay;
