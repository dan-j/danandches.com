import React from 'react';
import { IImageGroup } from '../services/api';
import ImageGroup from './ImageGroup';

interface HomeProps {
    imageGroups: IImageGroup[];
}

interface HomeState {
    expandedIndex: number;
}

export default class Home extends React.Component<HomeProps, HomeState> {

    state: HomeState = {
        expandedIndex: this.props.imageGroups.length > 0 ? 0 : -1,
    };

    render() {
        return (
            <div id="home">
                {this.props.imageGroups.map((g: IImageGroup, index: number) => (
                    <ImageGroup
                        key={g.id}
                        group={g}
                        expanded={this.state.expandedIndex === index}
                    />
                ))}
            </div>
        );
    }
}
