import apiFitbit from "@/lib/axios/apiFitbit";
import { getFitbitTokenData } from "@/lib/localStorage/settings";

class FitbitService {
    public async GetHrvData() {
        try {
            const token = JSON.parse(getFitbitTokenData())["access_token"];
            const response = await apiFitbit.get("/1/user/-/hrv/date/today.json", {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching HRV data:", error);
        }
    }
}

const mediaService = new FitbitService();
export default mediaService;
