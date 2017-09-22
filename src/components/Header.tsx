import React from 'react';
import styled from 'styled-components';
import { blue, offWhite } from '../styles/colors';

const StyledHeader = styled.header`
    width: 100%;
    background-color: ${blue};
    color: ${offWhite};
    padding: 2em 0;
    text-align: center;
    
    h1, h3 {
        margin: 0;
    }
    
    h3 {
        margin-bottom: 0.5em;
    }
`;

const Header: React.StatelessComponent<{}> = () => (
    <StyledHeader>
        <h3>Dan {'&'} Ches'</h3>
        <h1>Wedding Day</h1>
    </StyledHeader>
);

export default Header;
