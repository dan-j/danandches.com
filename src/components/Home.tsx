import React from 'react';
import Measure from 'react-measure';
import { IImage, IImageGroup } from '../services/api';
import ImageGroupContainer from './ImageGroupContainer';
import Container from './styled/Container';
import InfiniteScroll from 'react-infinite-scroller';
import * as loglevel from 'loglevel';
import Card from './styled/Card';
import { default as Centered } from './styled/Centered';
import Welcome from './Welcome';
import DownloadButton from './DownloadButton';

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
    type SrcObj = { src: string, srcset: string[] };
    const urls: SrcObj[] = [];

    const defaultHeight = 600;
    imageGroups.forEach(
        (g: IImageGroup) => g.images.forEach((i: IImage) => {
            // get required width for a height of 600px because only widths can be set in srcset
            const srcset: string[] = [
                `${i.url}?w=320&fl=progressive 320w`,
                `${i.url}?w=750&fl=progressive 750w`,
            ];

            if ((i.details.image.width / i.details.image.height) > 1) {
                // we have a landscape image, add an extra "large" width to the srcset
                srcset.push(`${i.url}?w=950&fl=progressive 950w`);
            }

            urls.push({
                src: `${i.url}?h=${defaultHeight}&fl=progressive`,
                srcset,
            });
        }));

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
                    backdropClosesModal={true}
                />
                <Welcome />
                <Measure bounds={true}>
                    {({ measureRef, contentRect }) => {
                        let content;
                        const page = this.state.page;
                        if (contentRect.bounds && contentRect.bounds.width) {
                            const width = contentRect.bounds.width;
                            content = imageGroups.slice(0, page + 1)
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
                            content = <div />;
                        }
                        const autoLoadThreshold = -50;
                        return (
                            <Container id="home"
                                       innerRef={measureRef}
                                       style={{ overflow: 'auto', transition: 'height 1s' }}
                            >
                                <InfiniteScroll
                                    pageStart={0}
                                    loadMore={this.loadMore}
                                    hasMore={this.shouldRenderMore()}
                                    threshold={autoLoadThreshold}
                                >
                                    {content}
                                </InfiniteScroll>
                                {this.hasMore() ? (
                                    <Centered style={{ minHeight: -autoLoadThreshold }}>
                                        <Card>Scroll to load more</Card>
                                    </Centered>
                                ) : (
                                    <Centered>
                                        <Card>Thanks for viewing our pictures! Here's another link
                                            to download them!</Card>
                                        <DownloadButton />
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
