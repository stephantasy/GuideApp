import { IMaterial } from './material'

export interface IGuide {
    id: number;
    title: string;
    description: string;
    team: string;
    imageUrl: string;
    materials: IMaterial[];
    instructions: string[];
}
