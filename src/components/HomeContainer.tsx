import React from 'react';
import Loading from './styled/Loading';
import { getImageGroups, IImageGroup } from '../services/api';
import Home from './Home';

interface HomeProps {

}

interface HomeState {
    loaded: boolean;
    imageGroups?: IImageGroup[];
}

export default class HomeContainer extends React.Component<HomeProps, HomeState> {

    state: HomeState = {
        loaded: false,
        imageGroups: undefined,
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

        if (!this.state.loaded) {
            return <Loading />;
        }

        if (!this.state.imageGroups) {
            return <p>Oops, something went wrong...</p>;
        }

        return (
            <Home imageGroups={this.state.imageGroups} />
        );
    }
}
