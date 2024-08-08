
import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/useUserStore";
import LoginPage from "@/pages/Common/LoginPage.vue";
import LoginRedirect from "@/pages/Common/LoginRedirect.vue";

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
import SellerCompanyModifyComponent from "@/components/Seller/SellerCompanyModifyComponent.vue";
import CompanyDetailComponent from "@/components/Seller/CompanyDetailComponent.vue";

import UserPage from "@/pages/User/UserPage.vue";
import MainComponent from "@/components/User/MainComponent.vue";
import GroupbuyDetailComponent from '@/components/User/GroupbuyDetailComponent.vue'
import OrderPageComponent from '@/components/User/OrderPageComponent.vue';
import GroupbuyRegisterComponent from '@/components/User/GroupbuyRegisterComponent.vue';
import MyWaitGroupbuyListComponent from '@/components/User/MyWaitGroupbuyListComponent.vue';
import SearchResultComponent from '@/components/User/SearchResultComponent.vue';
import ProductDetailComponent from '@/components/User/ProductDetailComponent.vue'
import OrderHistoryPage from "@/pages/User/OrderHistoryPage.vue";

import UserMypage from '@/pages/User/UserMypage.vue'
import UserMypageCouponListComponent from "@/components/User/UserMypageCouponListComponent.vue";
import UserMypageInfoDetailComponent from "@/components/User/UserMypageInfoDetailComponent.vue";
import UserMypageInfoEditComponent from "@/components/User/UserMypageInfoEditComponent.vue";
import UserMypageLikesListComponent from "@/components/User/UserMypageLikesListComponent.vue";
import UserMypageManageAddressComponent from "@/components/User/UserMypageManageAddressComponent.vue";



const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/login", component: LoginPage },
    { path: "/login/redirect", component: LoginRedirect },
    {
      path: "/signup", component: SignupPage
      , children: [
        { path: "common", component: SignupComponent },
        { path: "user", component: UserSignupComponent },
        { path: "seller", component: SellerSignupComponent },
      ]
    },
    


    {
      path: "/seller", component: SellerPage,
      children: [
        { path: "mypage", component: SellerMyPageComponent, meta: { requiresAuth: true, roles: ['ROLE_SELLER'] } },
        { path: "product", component: SellerProductListComponent, meta: { requiresAuth: true, roles: ['ROLE_SELLER'] } },
        { path: "bid", name: "SellerBidListPage", component: SellerBidListComponent, meta: { requiresAuth: true, roles: ['ROLE_SELLER'] } },
        { path: "waitgroupbuy", component: SellerWaitGroupbuyListComponent, meta: { requiresAuth: true, roles: ['ROLE_SELLER'] } },
        { path: "company/register", component: CompanyRegisterComponent, meta: { requiresAuth: true, roles: ['ROLE_SELLER'] } },
        { path: "company/detail", component: CompanyDetailComponent, meta: { requiresAuth: true, roles: ['ROLE_SELLER'] } },
        { path: "company/modify", component: SellerCompanyModifyComponent, meta: { requiresAuth: true, roles: ['ROLE_SELLER'] } },

      ]
    },
    { path: "/seller/bid/register", name: "BidRegisterPage", component: SellerBidRegisterPage, meta: { requiresAuth: true, roles: ['ROLE_SELLER'] } },
    { path: "/seller/bid/modify", name: "BidModifyPage", component: SellerBidModifyPage, meta: { requiresAuth: true, roles: ['ROLE_SELLER'] } },
    { path: "/seller/product/register", component: SellerProductRegisterMain, meta: { requiresAuth: true, roles: ['ROLE_SELLER'] } },

    {
      path: "/", component: UserPage,
      children: [
        { path: "", component: MainComponent},
        { path: "order", component: OrderPageComponent, meta: { requiresAuth: true, roles: ['ROLE_USER'] } },
        { path: "groupbuy/register", component: GroupbuyRegisterComponent, meta: { requiresAuth: true, roles: ['ROLE_USER'] } },
        { path: "groupbuy/wait", component: MyWaitGroupbuyListComponent, meta: { requiresAuth: true, roles: ['ROLE_USER'] } },
        { path: "groupbuy/search", name: "searchGroupbuy", component: SearchResultComponent },
        { path: "groupbuy/detail/wait/:idx", component: GroupbuyDetailComponent, meta: { requiresAuth: true, roles: ['ROLE_USER'] } },
        { path: "groupbuy/detail/progress/:idx", component: ProductDetailComponent },
        {
          path: 'user/mypage', component: UserMypage, meta: { requiresAuth: true, roles: ['ROLE_USER'] },
          children: [
            { path: "detail", component: UserMypageInfoDetailComponent, meta: { requiresAuth: true, roles: ['ROLE_USER'] } },
            { path: "edit", component: UserMypageInfoEditComponent, meta: { requiresAuth: true, roles: ['ROLE_USER'] } },
            { path: "manage/address", component: UserMypageManageAddressComponent, meta: { requiresAuth: true, roles: ['ROLE_USER'] } },
            { path: "coupon/list", component: UserMypageCouponListComponent, meta: { requiresAuth: true, roles: ['ROLE_USER'] } },
            { path: "likes/list", component: UserMypageLikesListComponent, meta: { requiresAuth: true, roles: ['ROLE_USER'] } },
          ]
        },
      ]
    },
    { path: "/order/history", component: OrderHistoryPage, meta: { requiresAuth: true, roles: ['ROLE_USER'] } },
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
      next({ path: '/login', query: { redirect: to.fullPath } }); // 리다이렉트 경로 저장
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