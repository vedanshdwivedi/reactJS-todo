import axios from "axios";

export const makeApiCall = (payloadObject) => {
    try {
        const url = process.env.WEBHOOK_URL || "https://eo2dshcw0etqkp1.m.pipedream.net";
        // const url = "https://eoxn3phc58ocp8j.m.pipedream.net";
        const headers = {
            "Content-Type": "application/json",
        };

        axios.post(url, { payloadObject }, { headers });
    } catch (error) {
        console.log(`${JSON.stringify(error.stack)}`)
    }
};
