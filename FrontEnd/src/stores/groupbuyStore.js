import { defineStore } from "pinia";
import axios from "axios";

export const groupbuyStore = defineStore("groupbuy", {
    state: () => ({gpbuyList:[
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
        ]}),
    actions: {
        async gpbuySearch(request){            
            const response = await axios.get("/api/gpbuy/list",request);
            this.gpbuyList = response.data.result;
        },

        async myLikesList() {
            const response = await axios.get("/api/gpbuy/likes/list", { withCredentials: true });
            this.gpbuyLikesList = response.data.result;
            
        },

        async cancleLikes(gpbuyIdx){
            await axios.get("/api/gpbuy/likes/save?gpbuyIdx="+gpbuyIdx,{withCredentials: true});
            this.myLikesList();
        }
        
    }
})