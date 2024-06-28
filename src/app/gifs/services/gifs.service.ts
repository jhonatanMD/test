import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {


  private gifList: Gif[] = [];

  private _tagsHistory: string[] = [];

  private apiKey: string = 'HBgfuaRuMqh2GqEu4nLRpEdZ8qwachAE';
  private basePath: string = 'https://api.giphy.com/v1/gifs';


  constructor(private http: HttpClient) {
    this.loadLocalStorage()
  }


  public get gifListData(): Gif[] {
    return this.gifList;
  }

  private organationHistory(tag: string): void {

    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter(t => t !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10)

    this.saveLocalStorage();
  }

  searchTag(tag: string): void {

    if (tag.trim().length === 0) return;

    this.organationHistory(tag);


    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '20')
      .set('offset', '5')
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.basePath}/search`, { params })
      .subscribe(res => {
        this.gifList = res.data;
      })
  }


  get tagHistory(): string[] {
    return [... this._tagsHistory];
  }


  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }

  private loadLocalStorage(): void {

    if (!localStorage.getItem('history')) return;

      const localStorageHistory: string[] = JSON.parse(localStorage.getItem('history')!);

      this._tagsHistory = localStorageHistory;

      if(localStorageHistory.length === 0) return;

      this.searchTag(localStorageHistory[0])

  }
}
