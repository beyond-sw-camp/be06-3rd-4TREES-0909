
import { createRouter, createWebHistory } from "vue-router";
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
        { path: "/login2", component: LoginPage2 },
        { path: "/login", component: LoginPage },
        {
            path: "/signup", component: SignupPage
            , children: [
                { path: "common", component: SignupComponent },
                { path: "user", component: UserSignupComponent },
                { path: "seller", component: SellerSignupComponent },
            ]
        },
        { path: '/user/mypage', component: UserMypage,
            children:[
                {path: "detail", component: UserMypageInfoDetailComponent},
                {path: "edit", component: UserMypageInfoEditComponent},
                {path: "manage/address", component: UserMypageManageAddressComponent},
                {path: "coupon/list", component: UserMypageCouponListComponent},
                {path: "likes/list", component: UserMypageLikesListComponent},
            ]
         },


        {
            path: "/seller", component: SellerPage,
            children: [
                { path: "mypage", component: SellerMyPageComponent },
                { path: "product", component: SellerProductListComponent },
                { path: "bid", name: "SellerBidListPage", component: SellerBidListComponent },
                { path: "waitgroupbuy", component: SellerWaitGroupbuyListComponent },
                { path: "company/register", component: CompanyRegisterComponent },
                { path: "company/detail", component: CompanyDetailComponent },
                { path: "company/modify", component: SellerCompanyModifyComponent},

            ]
        },
        { path: "/seller/bid/register", name: "BidRegisterPage", component: SellerBidRegisterPage },
        { path: "/seller/bid/modify", name: "BidModifyPage", component: SellerBidModifyPage },
        { path: "/seller/product/register", component: SellerProductRegisterMain },


        { path: "/order/history", component: OrderHistoryPage },
        { path: "/order", component: OrderPage },
        { path: "/groupbuy/register", component: GroupbuyRegisterPage },
        { path: "/groupbuy/wait", component: MyWaitGroupbuyPage },
        { path: "/groupbuy/search", name: "searchGroupbuy", component: SearchResultPage },
        { path: "/groupbuy/detail/wait/:idx", component: GroupBuyDetailPage },
        { path: "/groupbuy/detail/progress/:idx", component: ProductDetailPage },
    ]
});
export default router;