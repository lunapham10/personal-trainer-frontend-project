export type Customer = {
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
    _links: {
        self: {
            href: string;
        },
        customer: {
            href: string;
        },
        trainings: {
            href: string;
        }
    }
}

export type NewCustomer = Omit<Customer, "_links">

export type Training = {
    date: string;
    duration: string;
    activity: string;
    _links: {
        trainings: {
            href: string;
        },
        customers: {
            href: string;
        },
        profiles: {
            href: string;
        }
    }
}

export type NewTraining = {
    date: string;
    duration: string;
    activity: string;
    customer: string;
}