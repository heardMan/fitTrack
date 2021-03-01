/**
 * @name Settings.js
 * @author Mark Heard
 * @version 1.0
 * @copyright 2021
 * @view A home view for the fitTrack application
 */

import { useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";

const Settings = () => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [userMetadata, setUserMetadata] = useState(null);
    const [token, setToken] = useState(null);
    const [fitStatToken, setFitStatToken] = useState(null);

    // const gettoken = async () => {
    //     try{
    //         const accessToken = await getAccessTokenSilently({
    //             audience: `https://dev-y5wb70ja.auth0.com/api/v2/`,
    //             scope: "read:current_user",
    //           });
    //           console.log(accessToken)
    //           return accessToken;


    //     }
    //     catch (error) {
    //         console.log(error)
    //     }

    // }

    useEffect(() => {
        const getUserMetadata = async () => {


            try {
                const accessToken = await getAccessTokenSilently({
                    audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`,
                    scope: "read:current_user",
                });

                const fitStatAccessToken = await getAccessTokenSilently({
                    audience: `fitStat`,
                });

                console.log(accessToken)
                setToken(accessToken)
                setFitStatToken(fitStatAccessToken)

                const userDetailsByIdUrl = `https://dev-y5wb70ja.auth0.com/api/v2/users/${user.sub}`;

                const metadataResponse = await fetch(userDetailsByIdUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const { user_metadata } = await metadataResponse.json();

                setUserMetadata(user_metadata);
            } catch (e) {
                console.log(e.message);
            }
        };

        getUserMetadata();
    }, []);

    return (
        //return a parent node with the id of home is returned with
        //in the main tag of the application

        <div id='settings'>
            {}
            <p>settings page</p>
            <p>you are LOGGED IN</p>

            <h3>Fit Stat Token</h3>
            <p>{fitStatToken}</p>

            <h3>User Object</h3>
            <p>{JSON.stringify(user)}</p>

            <h3>User Token</h3>
            <p>{token}</p>

            <h3>User MetaData</h3>
            <p>{JSON.stringify(userMetadata)}</p>
        </div >

    );

}

//ES6 export statement
export default Settings;