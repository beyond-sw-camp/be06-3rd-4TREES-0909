import { defineStore } from "pinia";
import axios from "axios"

const backend = process.env.VUE_APP_BACKEND_URL;

// 전역 저장소 생성
export const useOrderStore = defineStore("order", {
  state: () => ({
    orderPageInfo: {
        name: "",
        email: "",
        phoneNumber: "",
        point: 0,
        userCouponResponseList: [
            {
                userCouponIdx: 0,
                couponName: "",
                couponContent: "",
                couponPrice: 0,
                minOrderPrice: 0
            }
        ],
        deliveryAddressResponseList: [
            {
                addressName: "",
                addressInfo: "",
                addressDefault: false,
                postCode: 0
            }
        ],
        bidPrice: 0,
        bidIdx: 0,
        productName: "",
        quantity: 0,
        productThumbnailUrl: ""
    }
  }),
  actions: {
    async getOrderPageInfo(gpbuyIdx, quantity, bidIdx) {
      const response = await axios.get(backend + "/orders/page", { 
        params: {
          gpbuyIdx: gpbuyIdx,
          quantity: quantity,
          bidIdx: bidIdx
        },
        withCredentials: true 
      });
      this.orderPageInfo = response.data.result;
    },
  }
});
