import React, {CSSProperties, useEffect, useRef} from 'react';

import FlexComponent from "./FlexComponent";
import container from "./inversify.config";

const Viewport: React.FC<{ pixelDensity?: number, style?: CSSProperties }> = ({pixelDensity = 2, style}) => {

    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!ref.current) return;
        // TODO this is a super hacky temporary way of making the rendering context available globally
        const context = ref.current.getContext('2d');
        if (context) container.bind<CanvasRenderingContext2D>('context').toConstantValue(context);
    }, []);

    return <FlexComponent style={style}>{({width, height}) => <canvas
        ref={ref}
        style={{position: 'absolute', width, height}}
        width={width * pixelDensity}
        height={height * pixelDensity}
    />}</FlexComponent>
};

export default Viewport;
