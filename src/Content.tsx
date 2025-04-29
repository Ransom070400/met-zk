import {useEffect} from "react";
import {generateRandomness} from "@mysten/sui/zklogin";
import {ZKLogin, useZKLogin} from "react-sui-zk-login-kit";



// values can be stored in .env
const SUI_PROVER_ENDPOINT = 'https://prover-dev.mystenlabs.com/v1';

const providers = {
    google: {
        clientId: "1023115981397-hq2a1s77sdk6k3etfh494c8oiaiqlmnl.apps.googleusercontent.com",
        redirectURI: "https://met-zk.vercel.app",
    },
    twitch: {
        clientId: "ltu7mhvfj4l04maulcjcqx1wm5e5zh",
        redirectURI: "http://localhost:5173",
    }
}

export const Content = () => {
    const {encodedJwt,  setUserSalt, address, logout} = useZKLogin();

    useEffect(() => {
        if (encodedJwt) {
            // make you request to your server 
            // for recive useSalt by jwt.iss (issuer id)
            const requestMock = new Promise(
                (resolve): void =>
                    resolve(localStorage.getItem("userSalt") || generateRandomness())
            );

            requestMock.then(salt => setUserSalt(String(salt)))
        }
    }, [encodedJwt]);

    if (address) return  
    <div>
        <span>Your Address {address}</span>
        <button onClick={logout}>Logout</button>
    </div>
    return (
        <ZKLogin
            providers={providers}
            proverProvider={SUI_PROVER_ENDPOINT}
        />
    )
}
