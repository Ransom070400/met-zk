# Ransoms react-sui-zk-login-kit

React Kit for seamless ZK Login integration for Sui blokchain

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)


---

## Installation

```bash
npm install react-sui-zk-login-kit react -S
```

```bash
yarn add react-sui-zk-login-kit react
```

---

## Usage

#### For Next JS

- use Provider and Component with 'use-client'
- if experience problem with default remove hash from url try "disableRemoveHash" prop

### Example Usage in Your React App

**App.tsx**

```tsx
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
```

**Content.tsx**

```tsx
iimport { useEffect, useState } from "react";
import { generateRandomness } from "@mysten/sui/zklogin";
import { ZKLogin, useZKLogin } from "react-sui-zk-login-kit";

// Values can be stored in .env
const SUI_PROVER_ENDPOINT = 'https://prover-dev.mystenlabs.com/v1';

const providers = {
    google: {
        clientId: "1023115981397-hq2a1s77sdk6k3etfh494c8oiaiqlmnl.apps.googleusercontent.com",
        redirectURI: "http://localhost:5173",
    },
    twitch: {
        clientId: "ltu7mhvfj4l04maulcjcqx1wm5e5zh",
        redirectURI: "http://localhost:5173",
    },
   
    
};

export const Content = () => {
    const { encodedJwt, setUserSalt, address, logout } = useZKLogin();
    const [loginSuccessful, setLoginSuccessful] = useState(false);

    useEffect(() => {
        if (encodedJwt) {
            // Mock request to simulate fetching user salt
            const requestMock = new Promise(
                (resolve): void =>
                    resolve(localStorage.getItem("userSalt") || generateRandomness())
            );

            requestMock.then(salt => {
                setUserSalt(String(salt));
                setLoginSuccessful(true); // Set login successful to true
            });
        }
    }, [encodedJwt]);

    if (address) {
        return (
            <div>
                <span>Your Address: {address}</span>
                <button onClick={logout}>Logout</button>
                {loginSuccessful && <p>Login Successful!</p>}
            </div>
        );
    }

    return (
        <ZKLogin
            providers={providers} // Ensure all providers are passed here
            proverProvider={SUI_PROVER_ENDPOINT}
        />
    );
};
```

---
