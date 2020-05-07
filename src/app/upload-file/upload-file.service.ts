import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class UploadFileService {
  constructor(private httpClient: HttpClient) {}
  public upload(files: Set<File>, url: string) {
    const formData = new FormData();
    files.forEach((file) => formData.append("file", file, file.name));

    //const request = new HttpRequest("POST", url, formData,{ observe: "events" });
    //return this.httpClient.request(url, formData, { observe: "events" });
    return this.httpClient.post(url, formData, {
      observe: "events",
      reportProgress: true,
    });
  }
  download(url: string) {
    return this.httpClient.get(url, {
      responseType: "blob" as "json",
    });
  }
  handleFile(res: any, fileName: string) {
    const file = new Blob([res], { type: res.type });
    //IE
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(file);
      return;
    }
    const blob = window.URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = blob;
    link.download = fileName;
    link.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );
    setTimeout(() => {
      //Firefox
      window.URL.revokeObjectURL(blob);
      link.remove;
    });
    //link.click();
  }
}
