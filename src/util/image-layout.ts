import { IImage } from '../services/api';

export interface ImageDimensions {
    width: number;
    height: number;
}

export function calculate(images: IImage[],
                          containerWidth: number,
                          preferredHeight: number): ImageDimensions[][] {
    const aspectRatios = images.map(
        (img: IImage) => img.details.image.width / img.details.image.height);
    let processed = 0;
    const targetAspectRatio = containerWidth / preferredHeight;
    const dimensions: ImageDimensions[][] = [];

    while (processed < images.length) {
        const rowDimensions: ImageDimensions[] = [];
        const rowIndexes: number[] = [];

        let cumulativeAspectRatio: number = 0;

        while (cumulativeAspectRatio < targetAspectRatio && processed < images.length) {
            cumulativeAspectRatio += aspectRatios[processed];
            rowIndexes.push(processed);
            processed += 1;
        }

        // this will be a shrunk height to fit the items in this row, unless this contains the
        // final image (processed === this.images.length), in which case it could be shrunk
        // or grown
        const scaledHeight = preferredHeight * targetAspectRatio / cumulativeAspectRatio;

        rowDimensions.push(...rowIndexes.map((idx: number) => ({
            width: aspectRatios[idx] * scaledHeight,
            height: scaledHeight,
        })));

        dimensions.push(rowDimensions)
    }
    return dimensions;
}
