export class Logger {
  private static formatMessage(service: string, message: string): string {
    const timestamp = new Date().toISOString()
    return `[${timestamp}] [${service}] ${message}`
  }

  public static log(service: string, message: string): void {
    console.log(this.formatMessage(service, message))
  }

  public static error(service: string, message: string, error?: unknown): void {
    console.error(this.formatMessage(service, message))
    if (error) {
      console.error(error)
    }
  }
}
