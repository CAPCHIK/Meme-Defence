export class Configuration {
    public static get serverUrl(): string {
        return process.env.VUE_APP_SERVER_URL || '';
    }
}
