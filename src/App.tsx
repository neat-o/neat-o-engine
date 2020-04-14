import React from 'react';
import Viewport from "./Viewport";
import Editor from "./Editor";

import testSetup from "./testSetup";

const App: React.FC = () => <div style={{
    display:   'flex',
    minHeight: '100vh',
}}>
    <Viewport style={{
        flex: 1,
    }}/>
    <div style={{
        borderLeft: '1px solid #eee',
        width:      400,
    }}>
        <div style={{padding: '0 22px 10px'}}>
            <h4>Experiment definition</h4>
            <Editor
                style={{height: 300, margin: '0 -22px'}}
                onChange={() => {
                }}
                isValid={(() => true)}
                value={testSetup}
            />
        </div>
        <div style={{borderTop: '1px solid #eee', padding: '0 22px 20px'}}>
            <h4>Experiment summary</h4>
            play / pause<br/>
            state history<br/>
        </div>
        <div style={{borderTop: '1px solid #eee', padding: '0 22px 20px'}}>
            <h4>Log</h4>
        </div>
    </div>
</div>
export default App;
