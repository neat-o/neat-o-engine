import React, {useState} from 'react';
import {Button} from "antd";

import Viewport from "./Viewport";

import Editor from "./Editor";
import testSetup from "./testSetup";
import {start} from "./hackyProofOfConcept";

const App: React.FC = () => {

    const [src, setSrc]   = useState(testSetup);
    const [stop, setStop] = useState<null | (() => void)>(null);

    return <div style={{
        display:   'flex',
        minHeight: '100vh',
    }}>
        <Viewport style={{flex: 1}}/>
        <div style={{borderLeft: '1px solid #eee', width: 400}}>
            <div style={{padding: '10px 22px 10px'}}>
                <h4>Experiment definition</h4>
                <Editor
                    style={{height: 340, margin: '0 -22px'}}
                    value={src}
                    onChange={setSrc}
                />
            </div>
            <div style={{borderTop: '1px solid #eee', padding: '10px 22px 20px'}}>
                <h4>Experiment summary</h4>
                <Button.Group>
                    <Button disabled={!!stop} onClick={() => {
                        const stop = start(src);
                        // Have to wrap the below callback in another callback because setState will unwrap the top callback
                        setStop(() => () => {
                            stop();
                            setStop(null);
                        });
                    }}>Start</Button>
                    <Button disabled={!stop} onClick={stop || undefined}>
                        Stop
                    </Button>
                </Button.Group>
            </div>
            <div style={{borderTop: '1px solid #eee', padding: '10px 22px 20px'}}>
                <h4>Log</h4>
            </div>
        </div>
    </div>;
};

export default App;
