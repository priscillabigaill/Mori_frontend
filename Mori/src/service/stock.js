import axios from "axios";
import { host } from "./config";

axios.defaults.withCredentials = true

export const getAllStockDetails = async () => {
    try {
        return axios.get(host + "/secured/stocks", {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error getting stock details: ", error);
        throw new Error(error);
    }
};

export const getStockDetail = async (location_id) => {
    try {
        return axios.get(host + `/secured/stocks/${location_id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error getting stock detail: ", error);
        throw new Error(error);
    }
};