export type EventRow = {
    id: number
    name: string
    description: string
    clubId: string
    date: string
    priceCategory: 1 | 2 | 3
    admissionFee: number
    admissionFeeWithDiscount: number
    special: string
    minimumAge: number
    amountOfFloors: number
}