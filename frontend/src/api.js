import axios from "axios";

// export const API_URL='http://ec2-3-35-4-148.ap-northeast-2.compute.amazonaws.com:5000'
export const API_URL = 'http://localhost:5000'


const api = axios.create({
    baseURL: API_URL,
});

export const SampleApi = {
    taxiIsValid: (taxiId, query) => api.get(API_URL + "/api/taxi/" + taxiId + '?isTaxiCode=true', {}, {params: query}),
    getList: () => api.get(API_URL + "/api/sample"),//샘플 리스트 가져오기 page2
    getInfo: (id) => api.get(API_URL + "/api/sample/" + id),//선택된 샘플 정보 가져오기
    getInfoImage: (id) => api.get(API_URL + "/api/sample/" + id + "/image"),
    postInfo: (body) => api.post(API_URL + "/api/review/", body),//택시번호, 샘플, 유저정보 디비에 저장
    postSample: (body) => api.post(API_URL + "/api/sample/", body),
    putSample: (id, body) => api.put(API_URL + "/api/sample/" + id, body),
    putSampleImage: (id, formData, headers) => api.put(API_URL + "/api/sample/" + id + "/image", formData, headers),
    deleteSample: (id) => api.delete(API_URL + "/api/sample/" + id)
}

export const ReviewApi = {
    getReview: (query) => api.get(API_URL + "/api/review", {params: query}),
    postReview: (body, id) => api.post(API_URL + "/api/review/" + id + "/evaluate", body)//작성된 리뷰 디비에 저장
}

export const TaxiApi = {
    getTaxi: (query = {}) => api.get(API_URL + "/api/taxi",  { params: query }),
    getTaxiInfo: (id) => api.get(API_URL + "/api/taxi/" + id),
    getAllTaxiSample: (id, query = {}) => api.get(API_URL + "/api/taxi/" + id + "/stock", { params: query }),
    getTaxiSample: (taxiId, sampleId) => api.get(API_URL + '/api/taxi/' + taxiId + '/sample/' + sampleId),
    postTaxi: (body) => api.post(API_URL + "/api/taxi/", body),
    postTaxiSample: (id, body) => api.post(API_URL + "/api/taxi/" + id + "/sample", body),
    putTaxi: (id, body) => api.put(API_URL + "/api/taxi/" + id, body),
    putTaxiSample: (taxiId, sampleId, body) => api.put(API_URL +'/api/taxi/' + taxiId +'/sample/' + sampleId, body),
    deleteTaxi: (id) => api.delete(API_URL + "/api/taxi/" + id),
    deleteTaxiSample: (id, sampleId) => api.delete(API_URL + "/api/taxi/" + id + "/sample/" + sampleId)
}

export const StockApi = {
    getStock: (id, query={}) => api.get(API_URL + '/api/taxi/' + id + '/stock', { params: query })
}







