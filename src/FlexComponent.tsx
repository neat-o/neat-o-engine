import React, {CSSProperties, useRef} from 'react';
import useComponentSize from "@rehooks/component-size";

/**
 * Accepts a function component as its `children` prop which will receive `width` and `height` as props.
 * The inner element will be aligned using `position: absolute` so make sure to set the `style` on the
 * outer component in a such a way that it fills out some available layout slice (e.g. `flex: 1`)
 */
const FlexComponent: React.FC<{

    style?: CSSProperties,
    children: React.FC<{ width: number, height: number }>,

}> = ({style, children}) => {

    const ref  = useRef<HTMLDivElement>(null);
    const size = useComponentSize(ref);

    return <div
        style={{...style, position: 'relative'}}
        ref={ref}
    >
        <div style={{position: 'absolute'}}>
            {children(size)}
        </div>
    </div>;
};

export default FlexComponent;
