import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {



  constructor(private gifsService:GifsService) {}


  clickTagHistory(tag:string){

    this.gifsService.searchTag(tag)
  }


  getTagHistory():string[]{
    return this.gifsService.tagHistory;
  }

}
