import { defineStore } from "pinia";
import axios from "axios"

const backend = process.env.VUE_APP_BACKEND_URL;

// 전역 저장소 생성
export const useBidStore = defineStore("bid", {
    state: () => ({
        registeredBid: {
            bidIdx: 0
        }

    }),
    actions: {
        async registerBid(gpbuyIdx, productIdx, bidPrice) {
            const bidRegisterRequest = {
                gpbuyIdx: gpbuyIdx,
                productIdx: productIdx,
                bidPrice: bidPrice
            };
            const response = await axios.post(backend + "/bid/register", bidRegisterRequest, {withCredentials: true});
            this.registeredBid = response.data.result;
        },
        async modifyBid(bidIdx, productIdx, bidPrice) {
            const bidModifyRequest = {
                bidIdx: bidIdx,
                productIdx: productIdx,
                bidPrice: bidPrice
            };
            const response = await axios.post(backend + "/bid/modify", bidModifyRequest, {withCredentials: true});
            return response;
        },
    }
});
