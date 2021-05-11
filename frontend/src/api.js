import axios from "axios";


const api = axios.create({
    baseURL: "http://localhost:5000",
});

export const SampleApi = {
    getList: () => api.get("http://localhost:5000/api/sample"),//샘플 리스트 가져오기 page2
    getInfo: (body, id) => api.get("http://localhost:5000/api/sample/" + id, body),//선택된 샘플 정보 가져오기
    getInfoImage: (id) => api.get("http://localhost:5000/api/sample/" + id + "/image"),
    postInfo: (body, id) => api.post("http://localhost:5000/api/review/" + id, body)//택시번호, 샘플, 유저정보 디비에 저장
}
export const ReviewApi = {
  postReview: (body, id) => api.post("http://localhost:5000/api/review/" + id + "/evaluate", body)//작성된 리뷰 디비에 저장
}







