import { defineStore } from "pinia";
import axios from "axios";

const backend = "/api";

export const useUserStore = defineStore('user', {
    state: () => ({ isLoggedIn: false, uuid: '' }),
    persist: {
        storage: sessionStorage,
    },
    actions: {
        async login(user) {
            let response = await axios.post(backend + "/user/login", user);
            if (response.status === 200) {
                this.isLoggedIn = true;
                return true;
            } else {
                return false;
            }
        },
        async userSignup(user) {
            console.log(user);
            let response = await axios.post(backend + "/user/signup", user);
            console.log(response);
            if (response.status === 200) {
                if(response.data.isSuccess) {
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
                if(response.data.isSuccess) {
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
            let response = await axios.post(backend + "/seller/signup", seller);
            console.log(response);
            if (response.status === 200) {
                if(response.data.isSuccess) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },
    }
});