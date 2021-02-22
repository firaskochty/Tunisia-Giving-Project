import http from "../http-common";

class FundDataService {
    

    createFund(data){
        return http.post("/fund/add", data);
    }

    getAll() {
        return http.get("/fund/");
    }
    get(id) {
        return http.get(`/fund/${id}`);
    }
    getOrg(id) {
        return http.get(`/fund/org/${id}`);
    }

    update(id, data) {
        return http.put(`/fund/${id}`, data);
    }

    delete(id) {
        return http.delete(`/fund/${id}`);
    }

}

export default new FundDataService();