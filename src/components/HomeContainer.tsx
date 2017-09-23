import React from 'react';
import styled from 'styled-components';
import Loading from './styled/Loading/Bars';
import { getImageGroups, IImageGroup } from '../services/api';
import Home from './Home';

interface HomeProps {

}

interface HomeState {
    loaded: boolean;
    imageGroups: IImageGroup[];
}

const Div = styled.div`
    min-height: 100%;
    margin-bottom: -200px;
`;

export default class HomeContainer extends React.Component<HomeProps, HomeState> {

    state: HomeState = {
        loaded: false,
        imageGroups: [],
    };

    async componentDidMount() {
        let waited = false;

        setTimeout(() => waited = true, 2000);

        const imageGroups = await getImageGroups();

        while (!waited) {
            await new Promise((resolve => setTimeout(resolve, 500)));
        }

        this.setState({
            imageGroups,
            loaded: true,
        });
    }

    render() {

        let content;
        if (!this.state.loaded) {
            content = <Loading />;
        } else if (!this.state.imageGroups || this.state.imageGroups.length === 0) {
            content = <p>Oops, something went wrong...</p>;
        } else {
            content = <Home imageGroups={this.state.imageGroups} />;
        }

        return (
            <Div>{content}</Div>
        );
    }
}
