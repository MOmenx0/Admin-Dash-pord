import { Component, OnInit } from '@angular/core';
import { Property, PropertyType } from 'app/models/property';
import { PropertyService } from 'app/services/property.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  properties: Property[];
  imagePath = '../../assets/img/camera1.jpg';

  constructor(private propertyService: PropertyService) { }

  ngOnInit() {
    this.propertyService.getAllProperties().subscribe(properties => {
      this.properties = properties.filter(p => !p.isDeleted);
    }, error => {
      console.log(error);
    });
  }

  getPropertyTypeName(type: PropertyType): string {
    switch (type) {
      case PropertyType.Room:
        return 'Room';
      case PropertyType.Bed:
        return 'Bed';
      case PropertyType.Apartment:
        return 'Apartment';
      default:
        return '';
    }

}
onDelete(property: Property) {
  this.propertyService.deleteCardById(property.id).then(() => {
    this.properties = this.properties.filter(p => p.id !== property.id);
  }, error => {
    console.log(error);
  });

}
}