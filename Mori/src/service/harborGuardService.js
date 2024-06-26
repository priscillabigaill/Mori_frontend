
import { api } from '../contexts/api';




export const getAllHarborGuards = async () => {
    try {
        return await api.get( "/secured/harborguard", {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error getting harbor guards: ", error);
        throw new Error(error);
    }
};

export const addHarborGuard = async (harbourName, location, phone, openingHour, closingHour) => {
    try {
        const guardDetails = {
            HarbourName: harbourName,
            Location: location,
            phone: phone,
            OpeningHour: openingHour,
            ClosingHour: closingHour
        };

        return await api.post( "/secured/harborguard", guardDetails, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error adding harbor guard: ", error);
        throw new Error(error);
    }
};

export const showHarborGuard = async (guard_id) => {
    try {
        return await api.get( `/secured/harborguards/${guard_id}`, );
    } catch (error) {
        console.error(`Error fetching harbor guard ${guard_id}: `, error);
        throw new Error(error);
    }
};

export const modifyHarborGuard = async (id, harbourName, location, phone, openingHour, closingHour) => {
    try {
        const guardDetails = {
            HarbourID: id,
            HarbourName: harbourName,
            Location: location,
            phone: phone,
            OpeningHour: openingHour,
            ClosingHour: closingHour
        };

        return await api.put( `/secured/harborguard/${id}`, guardDetails, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error(`Error modifying harbor guard ${guard_id} details: `, error);
        throw new Error(error);
    }
};

export const removeHarborGuard = async (guard_id) => {
    try {
        return await api.delete( `/secured/harborguard/${guard_id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error(`Error removing harbor guard ${guard_id}: `, error);
        throw new Error(error);
    }
};``