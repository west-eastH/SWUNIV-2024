export default class WebDownloader {
  private static readonly anchor = document.createElement('a');

  public static download(filename: string, blob: Blob): void {
    this.anchor.href = URL.createObjectURL(blob);
    this.anchor.download = filename;

    this.anchor.dispatchEvent(
      new MouseEvent('click', { bubbles: true, cancelable: true }),
    );
  }
}
