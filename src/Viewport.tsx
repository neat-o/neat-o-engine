import React, {CSSProperties, useRef} from 'react';

import FlexComponent from "./FlexComponent";

const Viewport: React.FC<{ style?: CSSProperties }> = ({style}) => {

    const ref = useRef<HTMLCanvasElement>(null);

    return <FlexComponent style={style}>{({width, height}) => <canvas
        ref={ref}
        style={{position: 'absolute', width, height}}
        width={width}
        height={height}
    />}</FlexComponent>
};

export default Viewport;
