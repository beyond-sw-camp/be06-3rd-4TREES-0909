import { defineStore } from "pinia";
import axios from "axios"

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
    ]
  }),
  actions: {
    async getGroupbuyList(page) {
      const response = await axios.get("/api/gpbuy/list", {
        params: {
          page: page,
          size: 10
        },
        withCredentials: true
      });
      this.groupbuyList = response.data.result;
    },
    async searchGroupbuyList(page, categoryIdx, minPrice, maxPrice) {
      const response = await axios.get("/api/gpbuy/search", {
        params: {
          page: page,
          size: 10,
          categoryIdx: categoryIdx,
          minPrice: minPrice,
          maxPrice: maxPrice
        },
        withCredentials: true
      });
      this.groupbuyList = response.data.result;
    },
    async registerGroupbuy(title, gpbuyQuantity, categoryIdx, content) {
      const registerGroupbuyRequest = {
        title: title,
        gpbuyQuantity: gpbuyQuantity,
        categoryIdx: categoryIdx,
        content: content
      }
      const response = await axios.post("/api/gpbuy/register", registerGroupbuyRequest, { withCredentials: true });
      this.gpbuyRegisterResponse = response.data.result;
      return this.gpbuyRegisterResponse;
    },
    async getMyWaitGroupbuyList() {
      const response = await axios.get("/api/gpbuy/list/wait", { withCredentials: true });
      this.myWaitGroupbuyList = response.data.result;
      console.log(this.myWaitGroupbuyList);
      console.log(response);
      return this.gpbuyRegisterResponse;
    },
    async getWaitGroupbuy(idx) {
      const response = await axios.get("/api/gpbuy/registered/bid/list?gpbuyIdx=" + idx, {
        withCredentials: true
      });
      this.waitGroupbuy = response.data.result;
      console.log(this.waitGroupbuy);
    },
    async getProgressGroupbuy(idx) {
      const response = await axios.get("/api/gpbuy/detail?gpbuyIdx=" + idx);
      this.progressGroupbuy = response.data.result;
      console.log(this.progressGroupbuy);
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
      const response = await axios.get("/api/gpbuy/likes/save?gpbuyIdx=" + idx);
      console.log(response);
      if (response.data.isSuccess) {
        this.isLiked = response.data.result.isLiked;
        return true;
      } else {
        return false
      }
    }
  }
});
