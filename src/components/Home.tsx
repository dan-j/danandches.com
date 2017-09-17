import React from 'react';
import Measure from 'react-measure';
import { IImageGroup } from '../services/api';
import ImageGroupContainer from './ImageGroupContainer';
import Container from './styled/Container';
import Loading from './styled/Loading/Bars';

interface HomeProps {
    imageGroups: IImageGroup[];
}

const Home: React.SFC<HomeProps> = ({ imageGroups }) => (
    <Measure bounds={true}>
        {({ measureRef, contentRect }) => {
            let content;
            if (contentRect.bounds && contentRect.bounds.width) {
                const width = contentRect.bounds.width;
                content = imageGroups.map((g: IImageGroup, index: number) => (
                    <ImageGroupContainer
                        key={g.id}
                        group={g}
                        containerWidth={width}
                        preferredHeight={width <= 576 ? 150 : 200}
                    />
                ));
            } else {
                content = <Loading />;
            }
            return (
                <Container id="home" innerRef={measureRef}>
                    {content}
                </Container>
            );
        }}
    </Measure>
);

export default Home;
