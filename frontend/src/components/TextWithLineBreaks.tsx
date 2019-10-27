import React from 'react'

type Props = {
    text: string
}
export function TextWithLineBreaks(props: Props) {
    const { text } = props;
    const lines = text.split('\n')

    function renderLine(line: string, lineIndex: number, allLines: string[]) {
        const isLastLine = lineIndex === allLines.length - 1
        if (isLastLine) return <span>{line}</span>
        return <><span>{line}</span><br /></>
    }

    return (
        <>
            {lines.map(renderLine)}
        </>
    )
}