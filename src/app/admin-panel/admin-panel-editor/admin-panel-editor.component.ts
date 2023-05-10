import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EntityTypes } from '../../interfaces/constants';

@Component({
  selector: 'app-admin-panel-editor',
  templateUrl: './admin-panel-editor.component.html',
  styleUrls: ['./admin-panel-editor.component.css'],
})
export class AdminPanelEditorComponent implements OnInit {
  @Input() type: EntityTypes = 'films';
  @Input() editableEntity: any = null;

  @Output() changeData: EventEmitter<any> = new EventEmitter<any>();
  public formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      myTop: [0, [Validators.min(0), Validators.max(10)]],
      imageLink: [''],
      comments: [''],
      link: [''],
    });
  }

  ngOnInit(): void {
    if (this.type === 'films') {
      this.formGroup.addControl(
        'filmGenre',
        new FormControl('', Validators.required)
      );
    } else if (this.type === 'manga') {
      this.formGroup.removeControl('comments');
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
