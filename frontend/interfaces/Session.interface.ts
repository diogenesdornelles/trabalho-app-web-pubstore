import { CustomerProps } from "./Customer.interface";

export default interface SessionProps extends Omit<CustomerProps, 'created_at'> {
    token: string
    loggedAt: string
}