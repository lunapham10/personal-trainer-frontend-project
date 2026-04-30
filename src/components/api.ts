import type { NewCustomer, NewTraining } from "../types";

// fetch Training
export const fetchTraining = () => {
    return fetch(import.meta.env.VITE_API_URL + "/gettrainings")
        .then(response => {
            if (!response.ok)
                throw new Error("Error when fetching trainings");
            return response.json();
        })
}

// delete Training
export const deleteTraining = (id: number | string) => {
    return fetch(import.meta.env.VITE_API_URL + "/trainings/" + id, {
        method: "DELETE"
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when deleting a training");
        })
}

// fetch Customer
export const fetchCustomer = () => {
    return fetch(import.meta.env.VITE_API_URL + "/customers")
        .then(response => {
            if (!response.ok)
                throw new Error("Error when fetching customers")
            return response.json()
        })
}

// delete Customer
export const deleteCustomer = (url: string) => {
    return fetch(url, {
        method: "DELETE"
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when deleting a customer");
        })
}

// update Customer
export const updateCustomer = (url: string, customerData: NewCustomer) => {
    return fetch(url, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(customerData)
        })
            .then(response => {
                if (!response.ok)
                    throw new Error("Error when updating a customer")
                return response.json();
            })
}

// Add Customer
export const addCustomer = (customer: NewCustomer) => {
    return fetch(import.meta.env.VITE_API_URL + "/customers", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(customer)
        })
            .then(response => {
                if (!response.ok)
                    throw new Error("Error when adding a customer");
                return response.json();
            })
}

export const addTraining = (training: NewTraining) => {
    return fetch(import.meta.env.VITE_API_URL + "/trainings", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(training)
        })
            .then(response => {
                if (!response.ok)
                    throw new Error("Error when adding training");
                alert("Training added successfully!");
            })
}