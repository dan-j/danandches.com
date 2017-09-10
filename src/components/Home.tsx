import React from 'react';
import Measure from 'react-measure';
import { IImageGroup } from '../services/api';
import ImageGroupContainer from './ImageGroupContainer';
import Container from './common/Container';

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
        const { expandedIndex } = this.state;
        return (
            <Measure bounds={true}>
                {({ measureRef, contentRect }) => {
                    let content;
                    if (contentRect.bounds && contentRect.bounds.width) {
                        const width = contentRect.bounds.width;
                        content = this.props.imageGroups.map(
                            (g: IImageGroup, index: number) => (
                                <ImageGroupContainer
                                    key={g.id}
                                    group={g}
                                    expanded={expandedIndex === index || true}
                                    containerWidth={width}
                                    preferredHeight={width <= 576 ? 150 : 200}
                                />
                            ),
                        )
                    }
                    return (
                        <Container id="home" innerRef={measureRef}>
                            {content}
                        </Container>
                    );
                }}
            </Measure>
        );
    }
}
