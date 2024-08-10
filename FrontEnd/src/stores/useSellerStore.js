import { defineStore } from "pinia";
import axios from "axios"

// 전역 저장소 생성
export const useSellerStore = defineStore("seller", {
  state: () => ({
    registered: {
      productIdx: 0
    },
    sellerInfoDetail: {
      name: "",
      birth: "",
      sex: "",
      email: "",
      address: "",
      postCode: 0,
      phoneNumber: "",
      sellerBank: "",
      sellerDepoName: "",
      sellerAccount: "",
      sellerOpenedAt: "",
      sellerRegNum: "",
      sellerMosNum: ""
    },
    productInfoList: [
      {
        productIdx: 0,
        productName: "",
        productContent: "",
        category: {
          idx: 0,
          categoryName: ""
        },
        productImgList: [
          {
            idx: 0,
            productImgUrl: "",
            productImgSequence: 0
          }
        ]
      }
    ],
    bidInfoList: [
      {
        bidIdx: 0,
        gpbuyIdx: 0,
        gpbuyTitle: "",
        gpbuyStatus: "",
        productName: "",
        productImgUrl: "",
        bidPrice: 0
      }
    ],
    waitGroupbuyList: [
      {
        gpbuyIdx: 0,
        gpbuyTitle: "",
        gpbuyQuantity: 0
      }
    ]
  }),
  actions: {
    async registerProduct(productInfo, imageFiles) {
      const formData = new FormData();
      const jsonBlob = new Blob([JSON.stringify(productInfo)], { type: "application/json" });
      formData.append("productInfo", jsonBlob);
      formData.append("productInfo", productInfo);
      Array.from(imageFiles).forEach((file) => {
        formData.append("images", file);
      })

      const response = await axios.post("/api/product/register", formData, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } });
      this.registeredBid = response.data.result;
      return response.data.isSuccess;
    },
    async getSellerInfo() {
      const response = await axios.get("/api/seller/info/detail", { withCredentials: true });
      this.sellerInfoDetail = response.data.result;
    },
    async getProductInfoList() {
      const response = await axios.get("/api/product/mylist", { withCredentials: true });
      this.productInfoList = response.data.result;
    },
    async getBidInfoList(page, selected) {
      const response = await axios.get("/api/bid/mylist",
        {
          params: {
            page: page,
            size: 10,
            bidSelect: selected
          },
          withCredentials: selected
        }
      );
      this.bidInfoList = response.data.result;
    },
    async getWaitGroupbuyList(page, gpbuyTitle, categoryIdx) {
      const response = await axios.get("/api/bid/gpbuy/status-wait/list", {
        params: {
          page: page,
          size: 10,
          categoryIdx: categoryIdx,
          gpbuyTitle: gpbuyTitle
        },
        withCredentials: true
      });
      this.waitGroupbuyList = response.data.result;
    },

    async registerCompany(companyName, companyAddress, companyPostCode, companyType, companyIntro) {
      const request = {
        companyName: companyName,
        companyAddress: companyAddress,
        companyPostCode: companyPostCode,
        companyType: companyType,
        companyIntro: companyIntro
      }

      const response = await axios.post("/api/company/register", request, { withCredentials: true });
      this.registeredCompany = response.data.result;
      return response.data;
    },

    // 업체 정보 가져오기
    async getCompanyDetail() {
      const response = await axios.get('/api/company/detail', { withCredentials: true });
      this.companyDetail = response.data.result;

    },
    // 업체 정보 수정 업로드
    async modifyCompanyDetail(companyName, companyAddress, companyPostCode, companyType, companyIntro) {
      const request = {
        companyName: companyName,
        companyAddress: companyAddress,
        companyPostCode: companyPostCode,
        companyType: companyType,
        companyIntro: companyIntro
      }
      const response = await axios.post('/api/company/modify', request, { withCredentials: true });
      return response.data;

    }
  }
});