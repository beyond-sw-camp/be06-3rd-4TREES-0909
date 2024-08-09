import { defineStore } from "pinia";
import axios from "axios";

const backend = "/api";

export const useUserStore = defineStore('user', {
    state: () => ({ isLoggedIn: false, uuid: '', roles: [],
        userInfoDetail:
        {
            "name": "",
            "password": "",
            "birth": "",
            "email": "",
            "sex": "",
            "address": "",
            "postCode": 0,
            "phoneNumber": "",
            "couponList": [
              {
                "couponName": "",
                "couponPrice": 0,
                "couponContent": "",
                "minOrderPrice": 0
              }
            ],
            "deliveryAddressList": [
              {
                "addressName": "",
                "addressInfo": "",
                "addressDefault": true,
                "postCode": 0
              }
            ],
            "userPoint": 0
          },
    "deliveryAddressIdx": 0
     }),
    persist: {
        storage: sessionStorage,
    },
    actions: {
        async login(user) {
            try {
                let response = await axios.post(backend + "/user/login", user);
                console.log(response.data.result);
                if (response.status === 200) {
                    this.isLoggedIn = true;
                    if (response.data.result == "ROLE_USER") {
                        this.roles = ["ROLE_USER"];
                    } else {
                        this.roles = ["ROLE_SELLER"];
                    }
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                console.error("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요")
                return false;
            }

        },
        async logout() {
            await axios.post(backend + "/logout",);
            this.isLoggedIn = false;
            this.roles = [];
        },
        async userSignup(user) {
            console.log(user);
            let response = await axios.post(backend + "/user/signup", user);
            console.log(response);
            if (response.status === 200) {
                if (response.data.isSuccess) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },
        async compayRegverify(compayRegverify) {
            console.log(compayRegverify);
            let response = await axios.post(backend + "/company-reg/verify", compayRegverify);
            console.log(response);
            if (response.status === 200) {
                if (response.data.isSuccess) {
                    // uuid 저장
                    this.uuid = response.data.result.uuid;
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },
        async sellerSignup(seller) {
            console.log(seller);
            const response = await axios.post(backend + "/seller/signup", seller);
            console.log(response);
            if (response.status === 200) {
                if (response.data.isSuccess) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },
        async userDetail(){            
            const response = await axios.get("/api/user/info/detail", {withCredentials: true});
            this.userInfoDetail = response.data.result;
            console.log(this.userInfoDetail);
        },
        async saveAddr(deliveryAddressRegisterRequest){
          
          const response = await axios.post("/api/user/delivery/register",deliveryAddressRegisterRequest, {withCredentials: true})
          console.log(response.result);
          this.userDetail();
          
        }
    }
});