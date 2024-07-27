import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { DataService } from 'src/app/Modules/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { partinerType } from 'src/app/Modules/interfaces/pointers.iterface';


interface UploadEvent {
  originalEvent: Event;
  files: File[];
}


@Component({
  selector: 'app-partinaers',
  templateUrl: './partinaers.component.html',
  styleUrls: ['./partinaers.component.scss']
})


export class PartinaersComponent {

  partiner: FormGroup<any>;
  photourl: string = "";
  partView: string = "show";
  uploadingMsg: boolean = false;
  partiners: partinerType[] = [];
  editObject: any = "";


  constructor(private FormBuilder: FormBuilder, private firestorage: AngularFireStorage,
    private toastr: ToastrService, private dataServ: DataService, private messageService: MessageService) {
    this.partiner = FormBuilder.group({
      id: [new Date().getTime()],
      text: [""],
      image: [""],
    })
    this.getData()
  }

  getData() {
    this.partView = "show";
    this.partiners = []
    this.dataServ.getPartiners().subscribe((data: any) => {
      for (const key in data) {
        this.partiners.push(data[key])
      }
    })
  }

  async onUpload(event: any) {
    let file = event.target.files[0];
    this.uploadingMsg = true;
    if (file) {
      const path = `links/${file.name}${new Date().getTime()}`; // we make name of file in firebase storage 
      const uploadTask = await this.firestorage.upload(path, file)
      const url = await uploadTask.ref.getDownloadURL()
      this.photourl = url;
      this.partiner.patchValue({
        id: new Date().getTime(),
        image: this.photourl
      })
    }
    this.uploadingMsg = false;
  }

  edit(item: partinerType) {
    this.editObject = item;
    this.partView = 'edit';
    this.photourl = item.image;
    this.partiner.patchValue({
      id: item.id,
      image: item.image,
      text: item.text,
    })
  }

  submit() {
    if (this.partView == "add") {
      this.dataServ.createPartiner(this.partiner.value).subscribe(() => {
        this.toastr.success("تمت اصافة شركاء نجاح");
        this.getData()
      })
    } else {
      this.dataServ.getPartiners().subscribe((data: any) => {
        for (const key in data) {
          if (data[key].id == this.editObject.id) {
            this.dataServ.updatePartiner(this.partiner.value, key).subscribe(() => {
              this.toastr.success("تمت تعديل شركاء نجاح")
              this.getData()
            })
          }
        }
      })
    }
  }

  deleteItem(item: any) {
    this.dataServ.getPartiners().subscribe((data: any) => {
      for (const key in data) {
        if (data[key].id == item.id)
          this.dataServ.deletePartiner(key).subscribe(() => {
            this.toastr.success("تمت حذف شركاء نجاح")
            this.getData()
          })
      }

    })
  }




}
