import styled from 'styled-components';

const Container = styled.div`
    margin: 0 0.5em 1em;

    @media screen and (min-width: 576px) {
        margin: 0 1em 1em;
    }

    @media screen and (min-width: 768px) {
        margin: 0 2em 1em;
    }

    @media screen and (min-width: 1200px) {
        margin: 0 auto 1em;
        max-width: 1200px;
    }
`;

export default Container;
