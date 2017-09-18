import React from 'react';
import Measure from 'react-measure';
import { IImage, IImageGroup } from '../services/api';
import ImageGroupContainer from './ImageGroupContainer';
import Container from './styled/Container';
import Loading from './styled/Loading/Bars';

const LightBox = require('react-images');


interface HomeProps {
    imageGroups: IImageGroup[];
}

interface HomeState {
    lightboxOpen: boolean;
    selectedIndex: number;
}

function extractImageUrls(imageGroups: IImageGroup[]) {
    type SrcObj = { src: string };
    const urls: SrcObj[] = [];

    imageGroups.forEach(
        (g: IImageGroup) => g.images.forEach((i: IImage) =>
            urls.push({ src: `${i.url}?h=600&fl=progressive` })));

    return urls;
}

export default class Home extends React.Component<HomeProps, HomeState> {

    state: HomeState = {
        lightboxOpen: false,
        selectedIndex: 0,
    };

    onImageSelected = (selectedIndex: number) => this.setState({
        selectedIndex,
        lightboxOpen: true,
    });

    onImageNext = () => this.setState({ selectedIndex: this.state.selectedIndex + 1 });
    onImagePrevious = () => this.setState({ selectedIndex: this.state.selectedIndex - 1 });

    onLightBoxClose = () => this.setState({ lightboxOpen: false });

    render() {
        const { imageGroups } = this.props;
        const { lightboxOpen, selectedIndex } = this.state;

        return (
            <div>
                <LightBox
                    images={extractImageUrls(imageGroups)}
                    isOpen={lightboxOpen}
                    currentImage={selectedIndex}
                    onClickPrev={this.onImagePrevious}
                    onClickNext={this.onImageNext}
                    onClose={this.onLightBoxClose}
                />
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
                                    onImageSelected={this.onImageSelected}
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
            </div>
        );
    }

}
