import { MeasurementType } from "~api/items/items"

export interface IItem {
    name: string
    description?: string
    expirationDate?: string
    count: number
    amount: number
    locationID?: string
    measurementType?: MeasurementType
    almostEmpty: boolean
}
