import { Starship } from "./starship.interface";

export interface StarshipApiResponse{
    count: number;
    next: string;
    previous: string | null;
    results: Starship[];
}