import { Component, Input } from '@angular/core';

import { EntityTypes } from '../interfaces/constants';
import { Entity, IEntity } from '../interfaces/my-media-data.interfaces';

@Component({
  selector: 'app-description-file',
  templateUrl: './description-file-component.html',
  styleUrls: ['./description-file-component.css'],
})
export class DescriptionFileComponent {
  @Input() type: EntityTypes = 'films';
  @Input() editableEntity: IEntity = new Entity();
}
