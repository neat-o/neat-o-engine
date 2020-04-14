import React, {CSSProperties} from 'react';
import MonacoEditor from 'react-monaco-editor';

import FlexComponent from "./FlexComponent";

export default function Editor(props: {

    style?: CSSProperties,
    language?: string,
    value: string,
    onChange: (value: string) => void,
    isValid: (value: string) => boolean,

} & { style?: CSSProperties }): React.ReactElement {

    return <FlexComponent style={props.style}>{({width, height}) => {
        return <MonacoEditor
            width={width}
            height={height}
            language={props.language || 'javascript'}
            theme="vs"
            value={props.value}
            options={{
                overviewRulerBorder:  false,
                lineDecorationsWidth: 6,
                lineNumbers:          "off",
                scrollBeyondLastLine: false,
                minimap:              {
                    enabled: false,
                },
            }}
        />;
    }}</FlexComponent>;
}
