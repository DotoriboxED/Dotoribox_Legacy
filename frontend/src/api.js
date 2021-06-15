import axios from "axios";

// export const API_URL='http://ec2-3-35-4-148.ap-northeast-2.compute.amazonaws.com:5000'
export const API_URL='http://localhost:5000'


const api = axios.create({
    baseURL: API_URL,
});

export const SampleApi = {
    getTaxiNum: (taxiId) => api.get(API_URL + "/api/taxi/" + taxiId),
    getList: () => api.get(API_URL + "/api/sample"),//샘플 리스트 가져오기 page2
    getInfo: (id) => api.get(API_URL + "/api/sample/" + id),//선택된 샘플 정보 가져오기
    getInfoImage: (id) => api.get(API_URL + "/api/sample/" + id + "/image"),
    postInfo: (body) => api.post(API_URL + "/api/review/", body),//택시번호, 샘플, 유저정보 디비에 저장
    putSample: (id, body) => api.put(API_URL + "/api/sample/" + id, body),
    putSampleImage: (id, formData, headers) => api.put(API_URL + "/api/sample/" + id + "/image", formData, headers)
}
export const ReviewApi = {
  postReview: (body, id) => api.post(API_URL + "/api/review/" + id + "/evaluate", body)//작성된 리뷰 디비에 저장
}

export const TaxiApi = {
  getTaxi: () => api.get(API_URL + "/api/taxi"),
}







