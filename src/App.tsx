import React from 'react';

function App() {
    return (
        <div className="App" style={{
            width:          '100%',
            minHeight:      '100vh',
            background:     'black',
            color:          'white',
            fontFamily:     'monospace',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            fontSize:       40,
            flexDirection:  'column',
        }}>
            NEAT-O
            <button
                style={{
                    background:   'white',
                    borderRadius: 0,
                    padding:      10,
                    marginTop:    10,
                    border:       0,
                }}
                onClick={() => {
                    const entropy = Math.random();
                    const suckIt  = entropy < .69420;
                    if (suckIt) window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
                    else window.location.href = 'https://www.youtube.com/channel/UCnxGkOGNMqQEUMvroOWps6Q';
                }}
            >
                50/50 JRE Clips of Rickroll
            </button>
        </div>
    );
}

export default App;
