
import { createRouter, createWebHistory } from "vue-router";
import { useUserStore} from "@/stores/useUserStore";
import LoginPage2 from "@/login/LoginPage.vue";
import LoginPage from "@/pages/Common/LoginPage.vue";

import SignupPage from "@/pages/Common/SignupPage.vue";
import SignupComponent from "@/components/Common/SignupComponent.vue";
import UserSignupComponent from "@/components/Common/UserSignupComponent.vue";
import SellerSignupComponent from "@/components/Common/SellerSignupComponent.vue";

import SellerPage from "@/pages/Seller/SellerPage.vue";
import SellerMyPageComponent from "@/components/Seller/SellerMyPageComponent.vue";
import SellerBidListComponent from "@/components/Seller/SellerBidListComponent.vue";
import SellerWaitGroupbuyListComponent from "@/components/Seller/SellerWaitGroupbuyListComponent.vue";
import SellerProductListComponent from "@/components/Seller/SellerProductListComponent.vue";
import SellerBidRegisterPage from "@/pages/Seller/SellerBidRegisterPage.vue";
import SellerBidModifyPage from "@/pages/Seller/SellerBidModifyPage.vue";
import SellerProductRegisterMain from "@/components/Seller/SellerProductRegisterMain.vue";
import CompanyRegisterComponent from "@/components/Seller/CompanyRegisterComponent.vue";
import CompanyDetailComponent from "@/components/Seller/CompanyDetailComponent.vue";

import UserMypage from '@/pages/User/UserMypage.vue'
import UserMainPage from "@/pages/User/UserMainPage.vue";
import OrderHistoryPage from "@/pages/User/OrderHistoryPage.vue";
import OrderPage from "@/pages/User/OrderPage.vue";
import GroupbuyRegisterPage from "@/pages/User/GroupbuyRegisterPage.vue";
import MyWaitGroupbuyPage from "@/pages/User/MyWaitGroupbuyPage.vue";
import SearchResultPage from "@/pages/User/SearchResultPage.vue";
import GroupBuyDetailPage from "@/pages/User/GroupBuyDetailPage.vue";
import ProductDetailPage from "@/pages/User/ProductDetailPage.vue";
import SellerCompanyModifyComponent from "@/components/Seller/SellerCompanyModifyComponent.vue";
import UserMypageCouponListComponent from "@/components/User/UserMypageCouponListComponent.vue";
import UserMypageInfoDetailComponent from "@/components/User/UserMypageInfoDetailComponent.vue";
import UserMypageInfoEditComponent from "@/components/User/UserMypageInfoEditComponent.vue";
import UserMypageLikesListComponent from "@/components/User/UserMypageLikesListComponent.vue";
import UserMypageManageAddressComponent from "@/components/User/UserMypageManageAddressComponent.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: UserMainPage },
        { path: "/login", component: LoginPage },
        {
            path: "/signup", component: SignupPage
            , children: [
                { path: "common", component: SignupComponent },
                { path: "user", component: UserSignupComponent },
                { path: "seller", component: SellerSignupComponent },
            ]
        },
        { path: '/user/mypage', component: UserMypage, meta: {requiresAuth: true, roles: ['ROLE_USER']},
            children:[
                {path: "detail", component: UserMypageInfoDetailComponent, meta: {requiresAuth: true, roles: ['ROLE_USER']} },
                {path: "edit", component: UserMypageInfoEditComponent, meta: {requiresAuth: true, roles: ['ROLE_USER']}},
                {path: "manage/address", component: UserMypageManageAddressComponent, meta: {requiresAuth: true, roles: ['ROLE_USER']}},
                {path: "coupon/list", component: UserMypageCouponListComponent, meta: {requiresAuth: true, roles: ['ROLE_USER']}},
                {path: "likes/list", component: UserMypageLikesListComponent, meta: {requiresAuth: true, roles: ['ROLE_USER']}},
            ]
         },


        {
            path: "/seller", component: SellerPage,
            children: [
                { path: "mypage", component: SellerMyPageComponent, meta: {requiresAuth: true, roles: ['ROLE_SELLER']} },
                { path: "product", component: SellerProductListComponent, meta: {requiresAuth: true, roles: ['ROLE_SELLER']} },
                { path: "bid", name: "SellerBidListPage", component: SellerBidListComponent, meta: {requiresAuth: true, roles: ['ROLE_SELLER']} },
                { path: "waitgroupbuy", component: SellerWaitGroupbuyListComponent, meta: {requiresAuth: true, roles: ['ROLE_SELLER']} },
                { path: "company/register", component: CompanyRegisterComponent, meta: {requiresAuth: true, roles: ['ROLE_SELLER']} },
                { path: "company/detail", component: CompanyDetailComponent, meta: {requiresAuth: true, roles: ['ROLE_SELLER']} },
                { path: "company/modify", component: SellerCompanyModifyComponent, meta: {requiresAuth: true, roles: ['ROLE_SELLER']}},

            ]
        },
        { path: "/seller/bid/register", name: "BidRegisterPage", component: SellerBidRegisterPage, meta: {requiresAuth: true, roles: ['ROLE_SELLER']} },
        { path: "/seller/bid/modify", name: "BidModifyPage", component: SellerBidModifyPage , meta: {requiresAuth: true, roles: ['ROLE_SELLER']}},
        { path: "/seller/product/register", component: SellerProductRegisterMain , meta: {requiresAuth: true, roles: ['ROLE_SELLER']}},


        { path: "/order/history", component: OrderHistoryPage, meta: {requiresAuth: true, roles: ['ROLE_USER']} },
        { path: "/order", component: OrderPage, meta: {requiresAuth: true, roles: ['ROLE_USER']} },
        { path: "/groupbuy/register", component: GroupbuyRegisterPage, meta: {requiresAuth: true, roles: ['ROLE_USER']} },
        { path: "/groupbuy/wait", component: MyWaitGroupbuyPage, meta: {requiresAuth: true, roles: ['ROLE_USER']} },
        { path: "/groupbuy/search", name: "searchGroupbuy", component: SearchResultPage },
        { path: "/groupbuy/detail/wait/:idx", component: GroupBuyDetailPage, meta: {requiresAuth: true, roles: ['ROLE_USER']} },
        { path: "/groupbuy/detail/progress/:idx", component: ProductDetailPage },
    ]
});
router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore(); // Pinia 스토어
    const isAuthenticated = userStore.isLoggedIn; // 로그인 상태 확인
    const userRoles = userStore.roles; // 사용자 역할 (예: ['user'])
    
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const requiredRoles = to.matched.flatMap(record => record.meta.roles || []);
  
    if (requiresAuth) {
      if (!isAuthenticated) {
        next('/login'); // 로그인 페이지로 리다이렉트
      } else if (!requiredRoles.some(role => userRoles.includes(role))) {
        alert("접근 권한이 없습니다.");
        next('/'); // 권한 없음 페이지로 리다이렉트
      } else {
        next(); // 경로 허용
      }
    } else {
      next(); // 인증 필요 없는 페이지는 그대로 허용
    }
  });
export default router;