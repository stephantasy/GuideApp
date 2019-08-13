import { Injectable } from '@angular/core';
import { Guide } from '../classes/guide';
import { IMaterial } from '../interfaces/material';
import * as GuideData from '../../data.json';
import * as _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class GuideService {

private guides: Guide[] = [];

  constructor() {
    (<any>GuideData).guides.foreach( guide => {
      this.guides.push( new Guide(guide) );
    })
  }

  public getGuides(): Guide[]{
    return this.guides;
  }

  public getGuide(id: number): Guide{
    return _.find(this.guides, (guide) => guide.id ===id);
  }

  public createGuide(
      title: string,
      description: string,
      team: string,
      imageUrl: string,
      materials: IMaterial[],
      instructions: string[]){

      const newGuideData = {
        id: this.getNextId(),
        title,
        description,
        team,
        imageUrl,
        materials: [...materials],
        instructions: [...instructions]
      }
      
      const newGuide = new Guide(newGuideData);
      this.guides.push(newGuide);
      return newGuide;
  }

  public updateGuide(guide: Guide): Guide {
    const guideIndex = _.findIndex(this.guides, (g) => g.id === guide.id);
    this.guides[guideIndex] = guide;
    return guide;
  }

  public deleteGuide(id: number) : void{
    let guideIndex = _.findIndex(this.guides, (g) => g.id === id);
    if(guideIndex !== -1){
      this.guides.splice(guideIndex, 1);
    }
  }



  private getNextId(): number {
    const max = _.maxBy(this.guides, (guide) => guide.id);
    return max.id + 1;
  }

}
