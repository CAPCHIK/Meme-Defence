export class Configuration {
    public static get serverUrl(): string {
        switch (process.env.VUE_APP_USE_HOST) {
            case 'HARD':
                return process.env.VUE_APP_SERVER_PROTOCOL
                    + '://' + process.env.VUE_APP_SERVER_HOST
                    + ':' + process.env.VUE_APP_SERVER_PORT;
            case 'SELF':
                return `${process.env.VUE_APP_SERVER_PROTOCOL}://` +
                    `${window.location.hostname}:${process.env.VUE_APP_SERVER_PORT}`;
            default: return '';
        }
    }
}
