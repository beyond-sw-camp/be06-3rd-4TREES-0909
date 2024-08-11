import { defineStore } from "pinia";
import axios from "axios"

const backend = process.env.VUE_APP_BACKEND_URL;

// 전역 저장소 생성
export const useGroupbuyStore = defineStore("groupbuy", {
  state: () => ({
    isLiked: false,
    waitGroupbuy: {
      gpbuyIdx: 0,
      gpbuyTitle: "",
      gpbuyContent: "",
      categoryIdx: 0,
      gpbuyQuantity: 0,
      gpbuyBidEndedAt: "",
      bidList: [
        {
          bidIdx: 0,
          productIdx: 0,
          productName: "",
          productThumbnailImg: "",
          bidPrice: 0,
          companyName: ""
        }
      ]
    },
    progressGroupbuy: {},
    groupbuyList: [
      {
        gpbuyIdx: 0,
        gpbuyQuantity: 0,
        gpbuyRemainQuantity: 0,
        productThumbnailImg: "",
        productName: "",
        bidPrice: 0,
        companyName: "",
        gpbuyStartedAt: "",
        gpbuyEndedAt: "",
        duration: ""
      }
    ],
    gpbuyRegisterResponse: {
      groupBuyIdx: 0
    },
    myWaitGroupbuyList: [
      {
        gpbuyIdx: 0,
        gpbuyTitle: "",
        gpbuyRegedAt: "",
        gpbuyBidEndedAt: ""
      }
    ],
    gpbuyList:[
      {
          "gpbuyIdx": 0,
          "gpbuyQuantity": 0,
          "gpbuyRemainQuantity": 0,
          "productThumbnailImg": "",
          "productName": "",
          "bidPrice": 0,
          "companyName": "",
          "gpbuyStartedAt": "",
          "gpbuyEndedAt": "",
          "duration": ""
        }],
        gpbuyLikesList:[
          {
              "gpbuyIdx": 0,
              "gpbuyQuantity": 0,
              "gpbuyRemainQuantity": 0,
              "productThumbnailImg": "",
              "productName": "",
              "bidPrice": 0,
              "companyName": "",
              "gpbuyStartedAt": "",
              "gpbuyEndedAt": "",
              "duration": ""
            }
      ]
  }),
  actions: {
    async getGroupbuyList(page) {
      const response = await axios.get(backend + "/gpbuy/list", {
        params: {
          page: page,
          size: 20
        },
        withCredentials: true
      });
      this.groupbuyList = [];
      if (response.data.result != null){
        this.groupbuyList.push(...response.data.result);
      }
    },
    async searchGroupbuyList(page, categoryIdx, minPrice, maxPrice) {
      const response = await axios.get(backend + "/gpbuy/search", {
        params: {
          page: page,
          size: 20,
          categoryIdx: categoryIdx,
          minPrice: minPrice,
          maxPrice: maxPrice
        },
        withCredentials: true
      });
      this.groupbuyList = [];
      if (response.data.result != null){
        this.groupbuyList.push(...response.data.result);
      }
    },
    async registerGroupbuy(title, gpbuyQuantity, categoryIdx, content) {
      const registerGroupbuyRequest = {
        title: title,
        gpbuyQuantity: gpbuyQuantity,
        categoryIdx: categoryIdx,
        content: content
      }
      const response = await axios.post(backend + "/gpbuy/register", registerGroupbuyRequest, { withCredentials: true });
      this.gpbuyRegisterResponse = response.data.result;
      return this.gpbuyRegisterResponse;
    },
    async getMyWaitGroupbuyList() {
      const response = await axios.get(backend + "/gpbuy/list/wait", { withCredentials: true });
      this.myWaitGroupbuyList = response.data.result;
      return this.gpbuyRegisterResponse;
    },
    async getWaitGroupbuy(idx) {
      const response = await axios.get(backend + "/gpbuy/registered/bid/list?gpbuyIdx=" + idx, {
        withCredentials: true
      });
      this.waitGroupbuy = response.data.result;
    },
    async getProgressGroupbuy(idx) {
      const response = await axios.get(backend + "/gpbuy/detail?gpbuyIdx=" + idx);
      this.progressGroupbuy = response.data.result;
    },
    getCategoryText(categoryIdx) {
      const categoryMap = {
        1: '전자 제품',
        2: '도서/티켓',
        3: '의류',
        4: '가전 제품',
        5: '유아동/출산',
        6: '스포츠 용품',
        7: '뷰티',
        8: '가구',
        9: '식품',
        10: '농수산물',
        11: '반려동물용품'
      };
      return categoryMap[categoryIdx] || '알 수 없는 카테고리';
    },
    async getGroupbuyLikes(idx) {
      const response = await axios.get(backend + "/gpbuy/likes/save?gpbuyIdx=" + idx);
      if (response.data.isSuccess) {
        this.isLiked = response.data.result.isLiked;
        return true;
      } else {
        return false
      }
    },
    async gpbuySearch(request){            
      const response = await axios.get(backend + "/gpbuy/list",request);
      this.gpbuyList = response.data.result;
    },

    async myLikesList() {
        const response = await axios.get(backend + "/gpbuy/likes/list", { withCredentials: true });
        this.gpbuyLikesList = response.data.result;
        
    },

    async cancleLikes(gpbuyIdx){
        await axios.get(backend + "/gpbuy/likes/save?gpbuyIdx="+gpbuyIdx,{withCredentials: true});
        this.myLikesList();
    }
  }
});
