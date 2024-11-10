export default class WebDownloader {
  private static readonly anchor = document.createElement('a');

  public static download(filename: string, blob: Blob): void {
    this.anchor.href = URL.createObjectURL(blob);
    this.anchor.download = filename;

    this.anchor.dispatchEvent(
      new MouseEvent('click', { bubbles: true, cancelable: true }),
    );
  }

  public static createDownloadLink(id: number): string {
    return window.location.origin + `?downloadId=${id}`;
  }

  public static copyOnDevice(downloadUrl: string, openModal: () => void): void {
    if (window.navigator?.clipboard) {
      window.navigator.clipboard.writeText(downloadUrl).then(openModal);
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = downloadUrl;
      document.body.appendChild(textArea);
      textArea.select();
      textArea.setSelectionRange(0, 99999);
      try {
        document.execCommand('copy');
      } catch (err) {
        console.error('복사 실패', err);
      }
      textArea.setSelectionRange(0, 0);
      document.body.removeChild(textArea);
      openModal();
    }
  }
}
