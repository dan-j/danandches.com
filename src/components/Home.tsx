import React from 'react';
import Measure from 'react-measure';
import { IImage, IImageGroup } from '../services/api';
import ImageGroupContainer from './ImageGroupContainer';
import Container from './styled/Container';
import Loading from './styled/Loading/Bars';
import InfiniteScroll from 'react-infinite-scroller';
import * as loglevel from 'loglevel';
import Card from './styled/Card';
import { default as Centered } from './styled/Centered';

const LightBox = require('react-images');


interface HomeProps {
    imageGroups: IImageGroup[];
}

interface HomeState {
    lightboxOpen: boolean;
    selectedIndex: number;
    page: number;
    loadedPage: number;
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
        page: 0,
        loadedPage: -1,
    };

    onImageSelected = (selectedIndex: number) => this.setState({
        selectedIndex,
        lightboxOpen: true,
    });

    onImageNext = () => this.setState({ selectedIndex: this.state.selectedIndex + 1 });
    onImagePrevious = () => this.setState({ selectedIndex: this.state.selectedIndex - 1 });

    onLightBoxClose = () => this.setState({ lightboxOpen: false });

    hasMore = () => this.state.page < this.props.imageGroups.length - 1;

    shouldRenderMore = () => this.state.page === this.state.loadedPage && this.hasMore();

    loadMore = (page: number) => {
        if (this.shouldRenderMore()) {
            this.setState({ page })
        }
    };

    onDimensionsCalculated = (groupId: string) => {
        const groupIndex = this.props.imageGroups.findIndex((g: IImageGroup) => g.id === groupId);

        if (groupIndex !== -1) {
            this.setState({ loadedPage: groupIndex })
        } else {
            loglevel.error(`Didn't find a group for ${groupId} when we should have`);
        }
    };

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
                            content = imageGroups.slice(0, this.state.page + 1)
                                .map((g: IImageGroup, index: number) => (
                                    <ImageGroupContainer
                                        key={g.id}
                                        group={g}
                                        containerWidth={width}
                                        preferredHeight={width <= 576 ? 150 : 200}
                                        onImageSelected={this.onImageSelected}
                                        onDimensionsCalculated={this.onDimensionsCalculated}
                                    />
                                ));
                        } else {
                            content = <Loading />;
                        }
                        return (
                            <Container id="home"
                                       innerRef={measureRef}
                                       style={{ height: '100%', overflow: 'auto' }}
                            >
                                <InfiniteScroll
                                    pageStart={0}
                                    loadMore={this.loadMore}
                                    hasMore={this.shouldRenderMore()}
                                    threshold={0}
                                >
                                    {content}
                                </InfiniteScroll>
                                {this.hasMore() ? (
                                    <Centered>
                                        <Card>Scroll to load more</Card>
                                    </Centered>
                                ) : (
                                    <Centered>
                                        <Card>Thanks for viewing our pictures! You can download them
                                            here!</Card>
                                    </Centered>
                                )}
                            </Container>
                        );
                    }}
                </Measure>
            </div>
        );
    }

}
