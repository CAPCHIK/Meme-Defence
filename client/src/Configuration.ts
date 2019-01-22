export class Configuration {
  public static get serverUrl(): string {
    switch (process.env.USE_HOST) {
      case "HARD":
        return (
          process.env.SERVER_PROTOCOL +
          "://" +
          process.env.SERVER_HOST +
          ":" +
          process.env.SERVER_PORT
        );
      case "SELF":
        return (
          `${process.env.SERVER_PROTOCOL}://` +
          `${window.location.hostname}:${process.env.SERVER_PORT}`
        );
      default:
        return "";
    }
  }
}
