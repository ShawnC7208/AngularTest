export interface Imarker {
    lat: number;
    lng: number;
    label?: string;
}

export interface IlocationData {
    address: string;
    cityStateZip: string;
    zestimate: number;
    zestimateLow: number;
    zestimateHigh: number;
    monthlyRent: number;
    yearlyRent: number;
    taxInsurance: number;
    HOA: number;
}