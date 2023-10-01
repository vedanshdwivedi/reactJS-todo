import axios from "axios";

const getUrl = () => {
    let URL = process.env.WEBHOOK_URL;
    if (!URL) {
        console.log(`Env Var not Set : ${JSON.stringify(process.env)}`);
        URL = "https://eoppo5xk0ckhzfp.m.pipedream.net";
    } 

    return URL;
};

export const makeApiCall = (payloadObject) => {
    try {
        const url = getUrl();
        const headers = {
            "Content-Type": "application/json",
        };

        axios.post(url, { payloadObject }, { headers });
    } catch (error) {
        console.log(`${JSON.stringify(error.stack)}`)
    }
};
