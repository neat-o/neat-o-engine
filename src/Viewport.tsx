import React, {CSSProperties} from 'react';

import FlexComponent from "./FlexComponent";

const Viewport: React.FC<{ style?: CSSProperties }> = ({style}) => {

    return <FlexComponent style={style}>{({width, height}) => <canvas
        style={{position: 'absolute', width, height}}
        width={width}
        height={height}
    />}</FlexComponent>
};

export default Viewport;
