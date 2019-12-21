import React, { ReactNode, useState, ComponentProps } from 'react'
import { CarouselView } from './carousel-view'

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
        <CarouselView next={next} previous={previous} {...restProps}>
            {renderImage(imageIndex)}
        </CarouselView>
    )
}
