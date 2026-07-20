import { ItemCost } from "../../fakeData/fakeBiblioteca.data";

export interface itemToSell{
    title: string,
    description: string,
    cost: ItemCost
    id: number,
}