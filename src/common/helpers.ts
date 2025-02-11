class Helpers {
    public static GnerateRandomToken(length = 44) {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let token = "";
        for (let i = 0; i < length; i++) {
            token += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return token;
    }

    public static StringToArrayBuffer(str: string) {
        const encoder = new TextEncoder();
        return encoder.encode(str);
    }

    public static ArrayBufferToBase64Url(buffer: ArrayBuffer) {
        let binary = "";
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary) // Convert to base64
            .replace(/\+/g, "-") // Replace '+' with '-'
            .replace(/\//g, "_") // Replace '/' with '_'
            .replace(/=+$/, ""); // Remove padding '='
    }
}

export default Helpers;
