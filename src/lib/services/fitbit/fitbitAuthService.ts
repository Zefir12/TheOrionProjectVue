import { baseUrl } from "@/common/consts";
import Helpers from "@/common/helpers";
import { getFitbitAuthCodes, setFitbitAuthCodes } from "@/lib/localStorage/settings";

class FitbitAuthService {
    private async generateCodeChallenge(verifier: string) {
        const data = Helpers.StringToArrayBuffer(verifier);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data); // SHA-256 hash
        return Helpers.ArrayBufferToBase64Url(hashBuffer); // Convert hash to Base64Url
    }

    public async GenerateAndStoreCodes() {
        const state = Helpers.GnerateRandomToken(20);
        const codeVerifier = Helpers.GnerateRandomToken(128);
        const codeChallenge = await this.generateCodeChallenge(codeVerifier);

        setFitbitAuthCodes({ state, codeVerifier, codeChallenge });
    }

    public AuthorizeUrl(): string {
        const codes = getFitbitAuthCodes();
        if (codes != null) {
            const { state, codeChallenge } = codes;
            const apiBaseUrl = "https://www.fitbit.com/oauth2/";
            const clientId = import.meta.env.VITE_FITBIT_CLIENT_ID;
            const scope =
                "activity+cardio_fitness+electrocardiogram+heartrate+irregular_rhythm_notifications+location+nutrition+oxygen_saturation+profile+respiratory_rate+settings+sleep+social+temperature+weight";

            return `${apiBaseUrl}authorize?response_type=code&client_id=${clientId}&scope=${scope}&code_challenge=${codeChallenge}&code_challenge_method=S256&state=${state}&redirect_uri=${encodeURIComponent(baseUrl + "/fitbitcallback")}`;
        }
        console.error("No codes found");
        return "";
    }
}

const fitbitAuthService = new FitbitAuthService();
export default fitbitAuthService;
