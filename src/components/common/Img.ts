import styled from 'styled-components';

export default styled.img`
    box-sizing: border-box;
    max-height: 150px;
    
    @media screen and (min-width: 576px) {
        max-height: 200px;
    }
`;
