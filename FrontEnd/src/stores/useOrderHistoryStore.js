import { defineStore } from "pinia";
import axios from "axios"

const backend = process.env.VUE_APP_BACKEND_URL;

// 전역 저장소 생성
export const useOrderHistoryStore = defineStore("orderHistory", {
  state: () => ({
    orderHistoryList: [
        {
          groupBuyIdx: 0,
          groupBuyStatus: "",
          productName: "",
          productThumbnailImg: "",
          deliveryNumber: "",
          bidPrice: 0,
          orderStartedAt: "",
          orderStatus: ""
        }
      ]
  }),
  actions: {
    async getOrderHistoryList(page) {
      const response = await axios.get(backend + "/orders/info/list", { 
        params: {
          page: page,
          size: 10
        },
        withCredentials: true 
      });
      this.orderHistoryList = response.data.result;
    },
  }
});
