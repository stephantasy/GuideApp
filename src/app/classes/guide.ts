import { IGuide } from '../interfaces/guide';
import { IMaterial } from '../interfaces/material'

export class Guide implements IGuide{
    id: number;    
    title: string;
    description: string;
    team: string;
    imageUrl: string;
    materials: IMaterial[];
    instructions: string[];

    constructor({id, title, description, team, imageUrl, materials, instructions}){
        this.id = id;
        this.title = title;
        this.description = description;
        this.team = team;
        this.imageUrl = imageUrl;
        this.materials = materials;
        this.instructions = instructions;
    }
}