<template>
    <main class="css-mkkf9p">
        <div class="css-k3npxh">
            <div class="css-vdsrs0">
                <div class="css-1geb722">
                    <h1 class="css-1je12r6">업체 정보<span class="css-vg8pgq"></span>등록</h1>
                    <section class="css-1dy31wn">
                        <article>
                            <h1 class="css-7m4a1a">업체 정보</h1>
                            <div class="css-k9oiqw">
                                <label class="css-yhuigj">0909 업체명</label>
                                <div class="css-ay1s">
                                    <input type="text" v-model="companyName" autocomplete="off" name="companyName"
                                        class="css-11nkng1">
                                </div>
                            </div>
                            <div class="css-k9oiqw">
                                <label class="css-yhuigj">업종</label>
                                <div class="css-ay1s">
                                    <input type="text" v-model="companyType" autocomplete="off" required=""
                                        placeholder="종목명 (30자 내 입력)" name="businessItem" maxlength="30" class="css-11nkng1"
                                        value="">
                                </div>
                            </div>
                            <div class="css-k9oiqw">
                                <label class="css-yhuigj">업체 소개</label>
                                <div class="css-ay1s">
                                    <input type="text" v-model="companyIntro" autocomplete="off" required=""
                                        placeholder="업체 소개글 (500자 내 입력)" name="businessItem" maxlength="500"
                                        class="css-11nkng1" value="">
                                </div>
                            </div>
                            <div class="css-k9oiqw">
                                <label class="css-yhuigj">사업장 우편번호</label>
                                <div class="css-ay1s">
                                    <input type="text" v-model="companyPostCode" autocomplete="off" required=""
                                        placeholder="우편번호 (5자 입력)" name="companyPostCode" maxlength="5" class="css-11nkng1"
                                        readonly>
                                </div>
                            </div>
                            <div class="css-k9oiqw">
                                <label class="css-yhuigj">사업장 소재지</label>
                                <div class="css-ay1s">
                                    <div>
                                        <button type="button" class="css-1v0rcng" @click="execDaumPostcode">주소 찾기</button>
                                    </div>
                                    <input type="text" v-model="companyAddress" autocomplete="off" required=""
                                        spellcheck="false" placeholder="주소" name="companyAddress" readonly
                                        class="css-1k3phzy">
                                    <input type="text" v-model="subAddress" autocomplete="off"
                                        placeholder="상세 주소 입력 (40자 내 입력)" name="subAddress" maxlength="40"
                                        class="css-11nkng1">
                                </div>
                            </div>
                        </article>
                        <div class="css-vopr99"></div>
                    </section>
                    <div class="css-zl1inp">
                        <button type="button" class="css-110qy8c" @click="submitForm()">업체 등록 신청</button>
                    </div>
                </div>
            </div>
            <div class="css-icndca">
            </div>
        </div>
    </main>
</template>

<script>
import { useSellerStore } from '@/stores/useSellerStore';
import { mapStores } from 'pinia';

export default {
    data() {
        return {
            companyName: '',
            companyType: '',
            companyIntro: '',
            companyAddress: '',
            companyPostCode: '',
        };
    },
    computed: {
        ...mapStores(useSellerStore),
    },
    methods: {
        isFormValid() {
            // 폼 유효성 검사
            return this.companyName !== '' && this.companyType !== '' && this.companyIntro !== '' && this.companyAddress !== '' && this.subAddress !== '' && this.companyPostCode !== '';
        },
        execDaumPostcode() {
            // eslint-disable-next-line no-undef
            if (typeof daum !== 'undefined' && typeof daum.Postcode !== 'undefined') {
                // eslint-disable-next-line no-undef
                new daum.Postcode({
                    oncomplete: (data) => {
                        // 선택한 주소를 인풋 박스에 입력
                        this.companyAddress = data.address;
                        this.companyPostCode = data.zonecode;  // 우편번호 설정
                    }
                }).open();
            } else {
                console.error('Daum Postcode script is not loaded');
            }
        },
        async submitForm() {
            console.log(this.companyName);
            try {
                const response = await this.sellerStore.registerCompany(
                    this.companyName,
                    this.companyAddress,
                    Number(this.companyPostCode),
                    this.companyType,
                    this.companyIntro
                );

                if (response.isSuccess) {
                    console.log('업체 등록 성공');
                    // 성공적인 등록 후 추가 로직
                } else {
                    // 실패 시 코드에 따른 에러 메시지 처리
                    switch (response.code) {
                        case 3001:
                            alert('업체 등록 실패: 이미 등록된 업체입니다.');
                            break;
                        case 3002:
                            alert('업체 등록 실패: 정보가 부족합니다.');
                            break;
                        case 3003:
                            alert('업체 등록 실패: 잘못된 요청입니다.');
                            break;
                        case 3004:
                            alert('업체 등록 실패: 서버 오류입니다.');
                            break;
                        case 3005:
                            alert('업체 등록 실패: 데이터베이스 오류입니다.');
                            break;
                        case 3006:
                            alert('업체 등록 실패: 인증 오류입니다.');
                            break;
                        case 3007:
                            alert('업체 등록 초과. 등록 실패했습니다.');
                            break;
                        default:
                            alert('알 수 없는 오류가 발생했습니다.');
                    }
                    console.error('Registration failed:', response.message);
                }
                this.$router.push("/seller/company/detail");
            } catch (error) {
                console.error('Failed to register company:', error);
                alert('업체 등록 중 오류가 발생했습니다.');
            }
        },
        mounted() {
            // window 객체에 Kakao가 로드되었는지 확인
            if (typeof window.Kakao !== 'undefined') {
                if (!window.Kakao.isInitialized()) {
                    window.Kakao.init(process.env.VUE_APP_KAKAO_API_KEY); // 환경 변수로부터 API 키를 불러옴
                }
            } else {
                console.error('Kakao SDK is not loaded');
            }
        }
    }
}
</script>


<style scoped>
.css-ay1s {
    margin-top: 10px;
}

.css-yhuigj {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

.css-k9oiqw {
    margin-bottom: 15px;
}

.main-contents {
    display: flex;
    min-width: 900px;
    padding: 40px 50px 90px;
}

.css-mkkf9p {
    flex: 1 1 auto;
}

* {
    font-family: "Pretendard Variable", -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    scroll-behavior: smooth;
}

.css-k3npxh {
    padding: 0px 20px 100px;
}

.css-vdsrs0 {
    box-sizing: border-box;
    margin: 0px auto;
    padding: 0px;
    min-width: 1024px;
    width: 1024px;
    max-width: 100%;
    scrollbar-width: none;
}

.css-1geb722 {
    max-width: 1045px;
    padding-top: 55px;
    margin: 0px auto;
}

.css-1je12r6 {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    column-gap: 8px;
    font-size: 25px;
    line-height: 0.88;
    font-weight: bold;
    color: rgb(25, 25, 25);
}

.css-vg8pgq {
    width: 2px;
    height: 22px;
    font-weight: 300;
    background-color: rgb(178, 178, 178);
}

.css-1fw72n4 {
    margin-top: 14px;
}

.css-162qnrj {
    display: flex;
    -webkit-box-align: start;
    align-items: start;
    column-gap: 6px;
    font-size: 25px;
    font-weight: bold;
    line-height: 1.67;
    color: rgb(102, 102, 102);
}

.css-162qnrj::before {
    content: "•";
    color: rgb(178, 178, 178);
}

.css-165uhau {
    padding: 0px;
    line-height: inherit;
    font-size: inherit;
    font-weight: inherit;
    background-color: transparent;
    color: inherit;
    text-decoration: underline;
}

button {
    border: none;
    background: rgb(255, 255, 255);
    cursor: pointer;
}

.css-1fw72n4 {
    margin-top: 14px;
}

.css-1dy31wn {
    border: 1px solid rgb(229, 229, 229);
    border-radius: 10px;
    margin: 24px 0px 30px;
}

.css-1dy31wn article {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    row-gap: 40px;
    padding: 40px 30px 60px;
}

.css-7m4a1a {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    column-gap: 8px;
    font-size: 20px;
    line-height: 1;
    font-weight: bold;
    color: rgb(25, 25, 25);
}

.css-k9oiqw {
    display: flex;
    column-gap: 20px;
}

.css-yhuigj {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    min-width: 140px;
    white-space: pre-wrap;
    font-weight: bold;
    color: rgb(76, 76, 76);
    height: 48px;
    font-size: 16px;
    line-height: 1;
    box-sizing: border-box;
}

.css-ay1s {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
}

.css-49gxn1 {
    padding: 14px;
    border-radius: 6px;
    border: 1px solid rgb(229, 229, 229);
    background-color: rgb(255, 255, 255);
    color: rgb(25, 25, 25);
    caret-color: rgb(2, 122, 255);
    font-size: 16px;
    line-height: 1;
    font-weight: 700;
    opacity: 1;
}

.css-1v0rcng {
    border-radius: 6px;
    line-height: 1;
    font-weight: 700;
    cursor: pointer;
    background: rgb(255, 255, 255);
    color: rgb(2, 122, 255);
    border: 1px solid rgba(2, 122, 255, 0.6);
    padding: 10px 14px;
    font-size: 14px;
}

.css-11nkng1:read-only,
.css-11nkng1.read-only {
    color: rgb(140, 140, 140);
    cursor: default;
    pointer-events: none;
}

.css-11nkng1:disabled {
    background-color: rgb(246, 246, 246);
    color: rgb(178, 178, 178);
    cursor: not-allowed;
}

.css-11nkng1 {
    padding: 14px;
    border-radius: 6px;
    border: 1px solid rgb(229, 229, 229);
    background-color: rgb(255, 255, 255);
    color: rgb(25, 25, 25);
    caret-color: rgb(2, 122, 255);
    font-size: 16px;
    line-height: 1;
    font-weight: 700;
}

.css-l7tt0k {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    min-width: 140px;
    white-space: pre-wrap;
    font-weight: bold;
    color: rgb(76, 76, 76);
    height: 20px;
    font-size: 16px;
    line-height: 1;
    box-sizing: border-box;
}

.css-c6z799 {
    display: flex;
    column-gap: 40px;
}

.css-he4ojk {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    column-gap: 9px;
}

.css-qxl4sw:disabled:checked {
    border: 2px solid rgb(229, 229, 229);
}

.css-qxl4sw:disabled {
    cursor: not-allowed;
}

.css-qxl4sw:checked {
    background-color: rgb(255, 255, 255);
    border: 2px solid rgb(2, 122, 255);
}

.css-qxl4sw {
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    appearance: none;
    min-width: 20px;
    height: 20px;
    border: 1px solid rgb(229, 229, 229);
    border-radius: 15px;
    margin: 0px;
    outline: none;
    background-clip: padding-box;
    background-color: rgb(255, 255, 255);
    cursor: pointer;
}

.css-qxl4sw:disabled:checked::after {
    background-color: rgb(229, 229, 229);
}

.css-qxl4sw:checked::after {
    background-color: rgb(2, 122, 255);
}

.css-qxl4sw::after {
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 15px;
    background-color: rgb(255, 255, 255);
}

.css-qxl4sw:disabled {
    cursor: not-allowed;
}

.css-qxl4sw:disabled:checked {
    border: 2px solid rgb(229, 229, 229);
}

.css-qxl4sw:disabled {
    cursor: not-allowed;
}

.css-qxl4sw:checked {
    background-color: rgb(255, 255, 255);
    border: 2px solid rgb(2, 122, 255);
}

.css-1acmhqo {
    font-weight: 700;
    color: rgb(127, 127, 127);
}

.css-he4ojk {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    column-gap: 9px;
}

.css-qxl4sw:disabled {
    cursor: not-allowed;
}

.css-1acmhqo {
    font-weight: 700;
    color: rgb(127, 127, 127);
}

.css-he4ojk {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    column-gap: 9px;
}

.css-c6z799 {
    display: flex;
    column-gap: 40px;
}

.css-czlwq2 {
    font-size: 12px;
    font-weight: bold;
    color: rgb(127, 127, 127);
}

.css-1v0rcng:disabled {
    cursor: not-allowed;
}

.css-ay1s {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
}

.css-1k3phzy.read-only {
    color: rgb(140, 140, 140);
    cursor: default;
    pointer-events: none;
}

.css-1k3phzy:disabled {
    background-color: rgb(246, 246, 246);
    color: rgb(178, 178, 178);
    cursor: not-allowed;
}

.css-1k3phzy {
    padding: 14px;
    border-radius: 6px;
    border: 1px solid rgb(229, 229, 229);
    background-color: rgb(255, 255, 255);
    color: rgb(25, 25, 25);
    font-size: 16px;
    line-height: 1;
    font-weight: 700;
    caret-color: transparent;
}

.css-110qy8c {
    border-radius: 6px;
    line-height: 1;
    font-weight: 700;
    cursor: pointer;
    background: rgb(2, 122, 255);
    color: rgb(255, 255, 255);
    border: 1px solid rgb(2, 122, 255);
    padding: 15px;
    font-size: 15px;
    width: 265px;
}

.css-110qy8c:disabled {
    background: rgb(217, 235, 255);
    border-color: rgb(217, 235, 255);
    cursor: not-allowed;

}

element.style {
    padding-top: 51px;
}
</style>