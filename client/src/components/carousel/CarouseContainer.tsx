import React, { ReactNode, useState, ComponentProps } from 'react'
import { CarouselView } from './CarouselView'

type Props = {
    renderImage(index: number): ReactNode
    imageCount: number
} & ComponentProps<'div'>
export function CarouselContainer(props: Props) {
    const { renderImage, imageCount, ...restProps } = props
    const [imageIndex, setImageIndex] = useState(0)

    function next() {
        setImageIndex((imageIndex + imageCount + 1) % imageCount)
    }

    function previous() {
        setImageIndex((imageIndex + imageCount - 1) % imageCount)
    }

    return (
        <CarouselView
            next={next}
            previous={previous}
            {...restProps}
            showArrows={imageCount > 1}
        >
            {renderImage(imageIndex)}
        </CarouselView>
    )
}
