import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Data } from 'src/app/models/data.model';

@Component({
  selector: 'app-issue-item',
  templateUrl: './issue-item.component.html',
  styleUrls: ['./issue-item.component.scss'],
})
export class IssueItemComponent implements OnInit {
  @Output()
  onDelete: EventEmitter<Data> = new EventEmitter<Data>();

  @Output()
  onEdit: EventEmitter<Data> = new EventEmitter<Data>();

  @Output()
  onAddNewTag: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  item: Data;

  @Input()
  new: boolean;

  @Input()
  tagList: string[];

  @Input()
  edit: boolean;
  reactForm: FormGroup;

  constructor(public alertController: AlertController) {}

  ngOnInit() {
    this.buildForm();
  }

  save() {
    let data: Data = this.reactForm.value;
    this.onEdit.emit(data);
    this.canceledEdit();
    
  }

  canceledEdit() {
    this.buildForm();
    this.edit = false;
  }

  buildForm() {
    this.reactForm = new FormGroup({
      title: new FormControl(this.item ? this.item.title : '', Validators.required),
      tags: new FormControl(this.item ? this.item.tags : []),
      text: new FormControl(this.item ? this.item.text : '', Validators.required),
      id: new FormControl(this.item ? this.item.id : ''),
    });
  }

  addToTags(tags: string[]) {
    this.reactForm.controls['tags'].setValue(tags);
  }

  async showDeleteConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm',
      message: 'Do you really want to delete the issue?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Delete',
          handler: () => this.onDelete.emit(this.item),
        },
      ],
    });

    await alert.present();
  }
}
