import styled from 'styled-components';

const Container = styled.div`
    margin: 0.5em;

    @media screen and (min-width: 576px) {
        margin: 1em;
    }

    @media screen and (min-width: 768px) {
        margin: 1em 2em;
    }

    @media screen and (min-width: 1200px) {
        margin: 2em auto;
        max-width: 1200px;
    }
`;

export default Container;
