import axios from "axios";


const api = axios.create({
    baseURL: "http://localhost:5000",
});

export const SampleApi = {
    getList: (body) => api.post("", body),//샘플 리스트 가져오기 page2
    getInfo: (body) => api.post("", body),//선택된 샘플 정보 가져오기
    postInfo: (body) => api.post("")//택시번호, 샘플, 유저정보 디비에 저장
}
export const ReviewApi = {
  postReview: (body) => api.post("")//작성된 리뷰 디비에 저장
}






