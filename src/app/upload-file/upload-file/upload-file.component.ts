import { Component, OnInit } from "@angular/core";
import { UploadFileService } from "../upload-file.service";
import { filterResponde, uploadProgress } from "src/app/shared/rxjs-operators";
import { type } from "os";

@Component({
  selector: "app-upload-file",
  templateUrl: "./upload-file.component.html",
  styleUrls: ["./upload-file.component.scss"],
})
export class UploadFileComponent implements OnInit {
  files: Set<File>;
  progress = 0;
  constructor(private uploadService: UploadFileService) {}

  ngOnInit() {}
  onChange(event) {
    console.log(event);
    const selectedFiles = <FileList>event.srcElement.files;

    const filesNames = [];
    this.files = new Set();

    for (let i = 0; i < selectedFiles.length; i++) {
      filesNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }
    document.getElementById("customFileLabel").innerHTML = filesNames.join(
      ", "
    );
    this.progress = 0;
  }
  onUpload() {
    if (this.files && this.files.size > 0) {
      this.uploadService
        .upload(this.files, "/api/upload")
        .pipe(
          uploadProgress((progress) => {
            console.log(progress);
            this.progress = progress;
          }),
          filterResponde()
        )
        .subscribe((response) => console.log("Upload Concluído"));
      // .subscribe((event: HttpEvent<object>) => {
      //   if (event.type === HttpEventType.Response) {
      //     console.log("Upload Concluído");
      //   } else if (event.type === HttpEventType.UploadProgress) {
      //     const percentDone = Math.round((event.loaded * 100) / event.total);

      //     this.progress = percentDone;
      //   }
      // });
    }
  }
  onDownloadExcel() {
    this.uploadService.download("/api/downloadExcel").subscribe((res: any) => {
      this.uploadService.handleFile(res, "report.xlsx");
    });
  }
  onDownloadPDF() {
    this.uploadService.download("/api/downloadPDF").subscribe((res: any) => {
      this.uploadService.handleFile(res, "report.pdf");
    });
  }
}
