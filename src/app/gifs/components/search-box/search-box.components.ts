import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template : `
  <h5>Buscar:</h5>
  <input type="text"

  class="form-control"
  placeholder="Buscar gift..."
  (keyup.enter)="searchTag()"

  #txtTagInput
  >
  `
})

export class SearchBoxComponent  {

  @ViewChild("txtTagInput")
  public txtTag !: ElementRef<HTMLInputElement>;


  constructor(private gifsService: GifsService){}
  searchTag():void {
    const newTagInput = this.txtTag.nativeElement.value;
    this.gifsService.searchTag(newTagInput)
    this.txtTag.nativeElement.value = '';
  }

}
