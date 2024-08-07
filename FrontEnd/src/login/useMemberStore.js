import { defineStore } from "pinia";
import axios from "axios";

// 전역 저장소 생성
export const useMemberStore = defineStore("member", {
    state: () => ({
        isLoggedIn: false
    }),
    // persist: true, // 로컬 스토리지에 저장
    persist: { // state 내용을 그대로 저장
        storage: sessionStorage,
    },
    actions: {
        getAge(){
            this.age++;
        },
        async login(member) {
            const response = await axios.post(
              "/api/user/login", member
            );
            if (response.status === 200){
                this.isLoggedIn = true;
                return true;
            } else {
                return false;
            }
        }
    }
});