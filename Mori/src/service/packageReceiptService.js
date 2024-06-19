
// import { host } from "./config";
// import { api } from '../contexts/api';



export const createPackageReceipt = async (userID, packageID, totalWeight, timeAccepted, note, date) => {
    try {
        const receiptDetails = {
            UserID: userID,
            PackageID: packageID,
            TotalWeight: totalWeight,
            TimeAccepted: timeAccepted,
            Note: note,
            Date: date
        };

        return await api.post(host + "/secured/package_receipts", receiptDetails, );
    } catch (error) {
        console.error("Error creating package receipt: ", error);
        throw new Error(error);
    }
};

export const readPackageReceipts = async (skip = 0, limit = 100) => {
    try {
        const params = {
            skip: skip,
            limit: limit
        };

        return await api.get(host + "/secured/package_receipts", {
            headers: {
                "Content-Type": "application/json",
            },
            params: params
        });
    } catch (error) {
        console.error("Error reading package receipts: ", error);
        throw new Error(error);
    }
};

export const getPackageReceiptDetails = async (receipt_id) => {
    if (!receipt_id) {
      throw new Error("Invalid receipt_id provided");
    }
  
    try {
      const response = await axios.get(`${host}/secured/package_receipts/${receipt_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error getting details of package receipt ${receipt_id}: `, error);
      throw new Error(error);
    }
  };
  

export const updatePackageReceipt = async (receipt_id, userID, packageID, totalWeight, timeAccepted, note, date) => {
    try {
        const receiptDetails = {
            UserID: userID,
            PackageID: packageID,
            TotalWeight: totalWeight,
            TimeAccepted: timeAccepted,
            Note: note,
            Date: date
        };

        return await api.put(host + `/secured/package_receipts/${receipt_id}`, receiptDetails, );
    } catch (error) {
        console.error(`Error updating package receipt ${receipt_id}: `, error);
        throw new Error(error);
    }
};

export const deletePackageReceipt = async (receipt_id) => {
    try {
        return await api.delete(host + `/secured/package_receipts/${receipt_id}`, );
    } catch (error) {
        console.error(`Error deleting package receipt ${receipt_id}: `, error);
        throw new Error(error);
    }
};