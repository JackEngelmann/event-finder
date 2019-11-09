import React from 'react'

type Props = {
    text: string
}
export function TextWithLineBreaks(props: Props) {
    const { text } = props
    
    if (!text) return null

    const lines = text.split('\n')

    function renderLine(line: string, lineIndex: number, allLines: string[]) {
        const isLastLine = lineIndex === allLines.length - 1
        if (isLastLine) return <span key={lineIndex}>{line}</span>
        return (
            <React.Fragment key={lineIndex}>
                <span>{line}</span>
                <br />
            </React.Fragment>
        )
    }

    return <>{lines.map(renderLine)}</>
}
