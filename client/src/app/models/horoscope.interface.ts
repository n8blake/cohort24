import { IAstroSign } from "./astro-sign.model";

export interface IHoroscope {
    date: Date;
    sign: IAstroSign | string;
    horoscope: string;
}