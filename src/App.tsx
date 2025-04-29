import {SuiClient} from '@mysten/sui/client';
import {Content} from "./Content";
import {ZKLoginProvider} from 'react-sui-zk-login-kit';

const FULLNODE_URL = "https://fullnode.devnet.sui.io/";
const suiClient = new SuiClient({url: FULLNODE_URL});

function App() {
    return (
        <ZKLoginProvider client={suiClient}>
            <Content/>
        </ZKLoginProvider>
    )
}

export default App;