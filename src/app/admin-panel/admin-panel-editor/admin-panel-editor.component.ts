import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EntityTypes } from '../../interfaces/constants';
import { Entity, IEntity } from '../../interfaces/my-media-data.interfaces';

@Component({
  selector: 'app-admin-panel-editor',
  templateUrl: './admin-panel-editor.component.html',
  styleUrls: ['./admin-panel-editor.component.css'],
})
export class AdminPanelEditorComponent implements OnInit {
  @Input() type: EntityTypes = 'films';
  @Input() editableEntity: IEntity = new Entity();

  @Output() changeData: EventEmitter<IEntity> = new EventEmitter<IEntity>();
  public formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      myTop: [0, [Validators.min(0), Validators.max(10)]],
      imageLink: [''],
      comments: [''],
      link: [''],
      description: [''],
    });
  }

  ngOnInit(): void {
    if (this.type === 'films') {
      this.formGroup.addControl(
        'filmGenre',
        new FormControl('', Validators.required)
      );
      this.formGroup.addControl(
        'IMDb',
        new FormControl(0, [Validators.min(0), Validators.max(10)])
      );
    } else if (this.type === 'series') {
      this.formGroup.addControl(
        'seasons',
        new FormControl(0, Validators.required)
      );

      this.formGroup.addControl(
        'episodesInSeason',
        new FormControl(0, Validators.required)
      );

      this.formGroup.addControl(
        'IMDb',
        new FormControl(0, [Validators.min(0), Validators.max(10)])
      );
      // this.formGroup.removeControl('comments');
    } else if (this.type === 'anime') {
      this.formGroup.addControl(
        'seasons',
        new FormControl(0, Validators.required)
      );

      this.formGroup.addControl(
        'episodesInSeason',
        new FormControl(0, Validators.required)
      );

      this.formGroup.addControl('category', new FormControl(''));
    } else if (this.type === 'manga') {
      this.formGroup.addControl('chapters', new FormControl(0));
      this.formGroup.addControl(
        'remangaGrade',
        new FormControl(0, [Validators.min(0), Validators.max(10)])
      );
    } else if (this.type === 'audiobooks') {
      this.formGroup.addControl('books', new FormControl(0));
      this.formGroup.addControl('chapters', new FormControl(0));
    }

    if (this.editableEntity) {
      this.formGroup.patchValue(this.editableEntity);
    }
  }

  public getIsAccessControl(controlName: string): boolean {
    return this.formGroup.get(controlName) !== null;
  }

  public submitData(): void {
    const data = this.formGroup.getRawValue();
    if (data) {
      this.changeData.emit(data);
    }
  }
}
