import http from "../http-common";

class DonateDataService {
    
    addDonation(data){
        return http.post("/donate/add", data);
    }
    getAll() {
        return http.get("/donate/");
    }
    getDonationOfUser(id) {
        return http.get(`/donate/user/${id}`);
    }
    getDonationofFund(id) {
        return http.get(`/donate/fund/${id}`);
    }


}

export default new DonateDataService();