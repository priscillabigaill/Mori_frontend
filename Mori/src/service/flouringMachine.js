import axios from "axios";
import { host } from "./config";

axios.defaults.withCredentials = true;

export const addFlouringMachine = async (capacity, status) => {
    try {
        const machineDetails = {
            Capacity: capacity,
            Status: status,
        };

        return axios.post(host + "/secured/flouring-machine/create/", machineDetails, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error adding flouring machine: ", error);
        throw new Error(error);
    }
};

export const readFlouringMachineStatus = async (machineId) => {
    try {
        return axios.get(host + `/secured/flouring_machines/${machineId}/status`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error reading flouring machine status: ", error);
        throw new Error(error);
    }
};

export const readFlouringMachines = async (skip = 0, limit = 100) => {
    try {
        return axios.get(host + "/secured/flouring_machines/", {
            params: {
                skip: skip,
                limit: limit,
            },
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error reading flouring machines: ", error);
        throw new Error(error);
    }
};

export const startFlouringMachine = async (machineId) => {
    try {
        return axios.post(host + `/secured/flouring_machines/${machineId}/start`, {}, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error starting flouring machine: ", error);
        throw new Error(error);
    }
};

export const stopFlouringMachine = async (machineId) => {
    try {
        return axios.post(host + `/secured/flouring_machines/${machineId}/stop`, {}, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error stopping flouring machine: ", error);
        throw new Error(error);
    }
};

export const deleteFlouringMachine = async (machineId) => {
    try {
        return axios.delete(host + `/secured/flouring-machine/${machineId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error deleting flouring machine: ", error);
        throw new Error(error);
    }
};