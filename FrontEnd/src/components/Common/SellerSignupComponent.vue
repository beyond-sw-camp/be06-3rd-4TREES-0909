<template>
  <div class="contentWrapper registContent">
    <div class="uBlock">
            <div class="uInputArea emailType">
                <div class="col">
                    <div class="uInput">
                        <label for="inputEmail">이메일</label>
                        <div class="inputBox">
                            <input type="text" id="inputEmail" class="inputText" tabindex="5" v-model="seller.email" @input="validateEmail">
                        </div>
                    </div>
                </div>
                <div class="col selectCol">
                    <div class="uSelectBox">
                        <label>
                            <select @change="updateEmail" v-model="selectedDomain" tabindex="6">
                                <option value="">직접 입력</option>
                                <option value="@naver.com">@naver.com</option>
                                <option value="@hanmail.net">@hanmail.net</option>
                                <option value="@gmail.com">@gmail.com</option>
                                <option value="@nate.com">@nate.com</option>
                                <option value="@hotmail.com">@hotmail.com</option>
                            </select>
                        </label>
                    </div>
                </div>
            </div>
            <div class="uErrorText" v-if="emailError">{{ emailError }}</div>
        </div>
        
        <div class="uBlock">
            <div class="uInputArea">
                <div class="col">
                    <div class="uInput">
                        <label for="inputPw">비밀번호</label>
                        <div class="inputBox">
                            <input type="password" id="inputPw" class="inputText" placeholder="8~12자 영문, 숫자, 특수문자" tabindex="2" v-model="seller.password" @input="validatePassword">
                            <button type="button" class="btnDel" aria-label="삭제"></button>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="uBtnArea">
                        <button type="button" class="uBtn" id="togglePwBtn" @click="togglePassword">보기</button>
                    </div>
                </div>
            </div>
            <div class="uErrorText" v-if="passwordError">{{ passwordError }}</div>
        </div>
        
        <div class="uBlock">
            <div class="uInputArea">
                <div class="col">
                    <div class="uInput">
                        <label for="inputPwConfirm">비밀번호 확인</label>
                        <div class="inputBox">
                            <input type="password" id="inputPwConfirm" class="inputText" placeholder="8~12자 영문, 숫자, 특수문자" tabindex="3" v-model="confirmPassword" @input="validateConfirmPassword">
                        </div>
                    </div>
                </div>
            </div>
            <div class="uErrorText" v-if="confirmPasswordError">{{ confirmPasswordError }}</div>
        </div>
        
        <div class="uBlock">
            <div class="uInputArea">
                <div class="col">
                    <div class="uInput">
                        <label for="inputName">이름</label>
                        <div class="inputBox">
                            <input type="text" id="inputName" class="inputText" tabindex="4" v-model="seller.name" @input="validateName">
                        </div>
                    </div>
                </div>
            </div>
            <div class="uErrorText" v-if="nameError">{{ nameError }}</div>
        </div>
        
        <div class="uBlock">
            <div class="uInputArea">
                <div class="col">
                    <div class="uInput">
                        <label for="inputBirth">생년월일</label>
                        <div class="inputBox">
                            <input type="date" id="inputBirth" class="inputText" tabindex="4" v-model="seller.birth" @change="validateBirth">
                        </div>
                    </div>
                </div>
            </div>
            <div class="uErrorText" v-if="birthError">{{ birthError }}</div>
        </div>
        
        <div class="uBlock">
            <div class="uInputArea">
                <div class="col">
                    <div class="uInput">
                        <label for="genderMale">성별</label>
                        <div class="inputBox radioBox">
                            <input type="radio" id="genderMale" name="gender" value="남" v-model="seller.sex" tabindex="4" @change="validateGender">
                            <label for="genderMale">남성</label>
                            <input type="radio" id="genderFemale" name="gender" value="여" v-model="seller.sex" tabindex="5" @change="validateGender">
                            <label for="genderFemale">여성</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="uErrorText" v-if="genderError">{{ genderError }}</div>
        </div>
        
        <div class="uBlock">
            <div class="uInputArea">
                <div class="col">
                    <div class="uInput">
                        <label for="inputPostCode">우편번호</label>
                        <div class="inputBox">
                            <input type="text" id="inputPostCode" class="inputText" tabindex="2" v-model="seller.postCode" @input="validatePostCode">
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="uBtnArea">
                        <button type="button" class="uBtn" @click="execDaumPostcode">우편번호 찾기</button>
                    </div>
                </div>
            </div>
            <div class="uErrorText" v-if="postCodeError">{{ postCodeError }}</div>
        </div>
        
        <div class="uBlock">
            <div class="uInputArea">
                <div class="col">
                    <div class="uInput">
                        <label for="inputAddress">주소</label>
                        <div class="inputBox">
                            <input type="text" id="inputAddress" class="inputText" tabindex="4" v-model="seller.address" @input="validateAddress">
                        </div>
                    </div>
                </div>
            </div>
            <div class="uErrorText" v-if="addressError">{{ addressError }}</div>
        </div>
        
        <div class="uBlock">
            <div class="uInputArea">
                <div class="col">
                    <div class="uInput">
                        <label for="inputDetailAddr">상세주소</label>
                        <div class="inputBox">
                            <input type="text" id="inputDetailAddr" class="inputText" tabindex="4" v-model="detailAddress" @input="validateDetailAddress">
                        </div>
                    </div>
                </div>
            </div>
            <div class="uErrorText" v-if="detailAddressError">{{ detailAddressError }}</div>
        </div>


    <div class="certBox">
        <div class="uBlock">
            <div class="uInputArea">
                <div class="col">
                    <div class="uInput">
                        <label for="inputResNum">사업자등록번호</label>
                        <div class="inputBox">
                            <input type="text" id="inputResNum" class="inputText" tabindex="4" v-model="companyVerfy.b_no" @input="validateCompanyReg">
                        </div>
                    </div>
                </div>
            </div>
            <div class="uErrorText" v-if="companyRegError">{{ companyRegError }}</div>
        </div>

        <div class="uBlock">
            <div class="uInputArea">
                <div class="col">
                    <div class="uInput">
                        <label for="inputCEOName">대표자명</label>
                        <div class="inputBox">
                            <input type="text" id="inputCEOName" class="inputText" tabindex="4" v-model="companyVerfy.p_nm" @input="validateCeoName">
                        </div>
                    </div>
                </div>
            </div>
            <div class="uErrorText" v-if="ceoNameError">{{ ceoNameError }}</div>
        </div>

        <div class="uBlock">
            <div class="uInputArea">
                <div class="col">
                    <div class="uInput">
                        <label for="inputOpenDate">개업일자</label>
                        <div class="inputBox">
                            <input type="date" id="inputOpenDate" class="inputText" tabindex="4" v-model="companyVerfy.start_dt" @change="validateOpenedDt">
                        </div>
                    </div>
                </div>
            </div>
            <div class="uErrorText" v-if="openedDtError">{{ openedDtError }}</div>
        </div>
        <div class="uBtnArea"><button type="button" class="uBtn borderType" :class="{'verified': userStore.uuid}" @click="verifySubmit"> {{ userStore.uuid ? '인증 완료' : '사업자등록번호 인증하기 (필수)' }}</button>
        </div>
    </div>
    <div class="uBlock">
            <div class="uInputArea">
                <div class="col">
                    <div class="uInput">
                        <label for="inputMosNum">통신판매업번호</label>
                        <div class="inputBox">
                            <input type="text" id="inputMosNum" class="inputText" tabindex="4" v-model="seller.sellerMosNum" @input="validateMosNum">
                        </div>
                    </div>
                </div>
            </div>
            <div class="uErrorText" v-if="mosNumError">{{ mosNumError }}</div>
        </div>

    <div class="uBlock">
        <div class="uInputArea">
            <div class="col">
                <div class="uInput">
                    <label for="inputBankName">은행명</label>
                    <div class="inputBox">
                        <input type="text" id="inputBankName" class="inputText" tabindex="4" v-model="seller.sellerBank" @input="validateBankName">
                    </div>
                </div>
            </div>
        </div>
        <div class="uErrorText" v-if="bankNameError">{{ bankNameError }}</div>
    </div>

    <div class="uBlock">
        <div class="uInputArea">
            <div class="col">
                <div class="uInput">
                    <label for="inputDepoName">예금주명</label>
                    <div class="inputBox">
                        <input type="text" id="inputDepoName" class="inputText" tabindex="4" v-model="seller.sellerDepoName" @input="validateDepoName">
                    </div>
                </div>
            </div>
        </div>
        <div class="uErrorText" v-if="depoNameError">{{ depoNameError }}</div>
    </div>

    <div class="uBlock">
        <div class="uInputArea">
            <div class="col">
                <div class="uInput">
                    <label for="inputAccount">계좌번호</label>
                    <div class="inputBox">
                        <input type="text" id="inputAccount" class="inputText" tabindex="4" v-model="seller.sellerAccount" @input="validateAccount">
                    </div>
                </div>
            </div>
        </div>
        <div class="uErrorText" v-if="accountError">{{ accountError }}</div>
    </div>

    
    <div class="uBlock">
        <div class="uInputArea">
            <div class="col">
                <div class="uInput">
                    <label for="inputCellphone">휴대폰</label>
                    <div class="inputBox">
                        <input type="text" id="inputCellphone" class="inputText" placeholder="010-1234-5678" tabindex="7" v-model="seller.phoneNumber" @input="validateAndFilterPhoneNumber" pattern="\d*">
                    </div>
                </div>
            </div>
        </div>
        <div class="uErrorText" v-if="phoneNumberError">{{ phoneNumberError }}</div>
    </div>
        
    <div class="uBlock checkBlock">
        <div class="uBlock">
            <p class="blockText">※ 가입 후 이메일 인증까지 완료하여야 계정이 활성화됩니다.</p>
        </div>
        <div class="ubtnArea">
            <div class="col">
                <button type="button" class="uBtn point" @click="submit" :disabled="isSubmitDisabled">가입완료</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/useUserStore';
import { mapStores } from 'pinia';
export default {
    name: "SellerSignupComponent",
    data() {
        return {
            companyVerfy: {
                b_no: '',
                p_nm: '',
                start_dt: ''
            },
            seller: {
                email: '',
                password: '',
                name: '',
                birth: '',
                sex: '',
                postCode: '',
                address: '',
                phoneNumber: '',
                sellerBank: '',
                sellerDepoName: '',
                sellerAccount: '',
                sellerRegNum: '',
                sellerMosNum: '',
                sellerOpenedAt: '',
                comUuid: '',
            },
            confirmPassword: '',
            selectedDomain: '',
            detailAddress: '',
            emailError: '',
            passwordError: '',
            confirmPasswordError: '',
            nameError: '',
            birthError: '',
            genderError: '',
            postCodeError: '',
            addressError: '',
            detailAddressError: '',
            phoneNumberError: '',
            ceoNameError: '',
            companyRegError: '',
            openedDtError: '',
            isSubmitDisabled: true,
            depoNameError: '',
            bankNameError: '',
            mosNumError: '',
            accountError: ''
        };
    },
    computed: {
        ...mapStores(useUserStore)
    },
    methods: {
        validateEmail() {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            this.emailError = emailPattern.test(this.seller.email) ? '' : '유효한 이메일을 입력하세요.';
            this.updateSubmitButtonState();
        },
        validatePassword() {
            const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/;
            this.passwordError = passwordPattern.test(this.seller.password) ? '' : '비밀번호는 8~12자 영문, 숫자, 특수문자를 포함해야 합니다.';
            this.updateSubmitButtonState();
        },
        validateConfirmPassword() {
            this.confirmPasswordError = this.seller.password === this.confirmPassword ? '' : '비밀번호가 일치하지 않습니다.';
            this.updateSubmitButtonState();
        },
        validateName() {
            this.nameError = this.seller.name ? '' : '이름을 입력하세요.';
            this.updateSubmitButtonState();
        },
        validateBirth() {
            this.birthError = this.seller.birth ? '' : '생년월일을 입력하세요.';
            this.updateSubmitButtonState();
        },
        validateGender() {
            this.genderError = this.seller.sex ? '' : '성별을 선택하세요.';
            this.updateSubmitButtonState();
        },
        validatePostCode() {
            this.postCodeError = this.seller.postCode ? '' : '우편번호를 입력하세요.';
            this.updateSubmitButtonState();
        },
        validateAddress() {
            this.addressError = this.seller.address ? '' : '주소를 입력하세요.';
            this.updateSubmitButtonState();
        },
        validateDetailAddress() {
            this.detailAddressError = this.detailAddress ? '' : '상세주소를 입력하세요.';
            this.updateSubmitButtonState();
        },
        validateCeoName() {
            this.ceoNameError = this.companyVerfy.p_nm ? '' : '대표자명을 입력하세요.';
            this.updateSubmitButtonState();
        },
        validateCompanyReg() {
            this.companyRegError = this.companyVerfy.b_no ? '' : '사업자등록번호를 입력하세요.';
            this.updateSubmitButtonState();
        },
        validateOpenedDt() {
            this.openedDtError = this.companyVerfy.start_dt ? '' : '개업일자를 입력하세요.';
            this.updateSubmitButtonState();
        },
        validateDepoName() {
            this.depoNameError = this.seller.sellerDepoName ? '' : '예금주명을 입력하세요.';
            this.updateSubmitButtonState();
        },
        validateBankName() {
            this.bankNameError = this.seller.sellerBank ? '' : '은행명을 입력하세요.';
            this.updateSubmitButtonState();
        },
        validateAccount() {
            this.accountError = this.seller.sellerAccount ? '' : '계좌번호를 입력하세요.';
            this.updateSubmitButtonState();
        },
        validateMosNum() {
            this.mosNumError = this.seller.sellerMosNum ? '' : '통신판매업번호를 입력하세요.';
            this.updateSubmitButtonState();
        },
        validateAndFilterPhoneNumber(event) {
            let input = event.target.value;

            // 숫자만 필터링
            this.seller.phoneNumber = input.replace(/[^0-9]/g, '');

            // 하이픈을 기준으로 전화번호 포맷팅
            if (this.seller.phoneNumber.length > 3) {
                if (this.seller.phoneNumber.length > 7) {
                    this.seller.phoneNumber = `${this.seller.phoneNumber.slice(0, 3)}-${this.seller.phoneNumber.slice(3, 7)}-${this.seller.phoneNumber.slice(7)}`;
                } else {
                    this.seller.phoneNumber = `${this.seller.phoneNumber.slice(0, 3)}-${this.seller.phoneNumber.slice(3)}`;
                }
            }

            // 전화번호 유효성 검사 (하이픈 포함)
            const phonePattern = /^01[0-9]-\d{3,4}-\d{4}$/;
            this.phoneNumberError = phonePattern.test(this.seller.phoneNumber) ? '' : '유효한 휴대폰 번호를 입력하세요.';
            
            this.updateSubmitButtonState();
        },
        updateEmail() {
            this.seller.email = this.seller.email.split('@')[0] + this.selectedDomain; // 선택된 도메인 추가
            this.validateEmail(); // 이메일 유효성 재검사
        },
        togglePassword() {
            const input = document.getElementById('inputPw');
            input.type = input.type === 'password' ? 'text' : 'password';
        },
        execDaumPostcode() {
            // eslint-disable-next-line no-undef
            new daum.Postcode({
                oncomplete: (data) => {
                    this.seller.address = data.address; // 주소
                    this.seller.postCode = Number(data.zonecode); // 우편번호
                }
            }).open();
        },
        updateSubmitButtonState() {
            this.isSubmitDisabled = !this.isFormValid();
        },
        isFormValid() {
            return !this.emailError && !this.passwordError && !this.confirmPasswordError &&
                !this.nameError && !this.birthError && !this.genderError &&
                !this.postCodeError && !this.addressError && !this.detailAddressError &&
                !this.phoneNumberError && !this.ceoNameError && !this.companyRegError &&
                !this.openedDtError && !this.depoNameError && !this.bankNameError &&
                !this.accountError && !this.mosNumError &&
                this.seller.email && this.seller.password && this.confirmPassword &&
                this.seller.name && this.seller.birth && this.seller.sex &&
                this.seller.postCode && this.seller.address && this.detailAddress &&
                this.seller.phoneNumber && this.companyVerfy.p_nm &&
                this.companyVerfy.b_no && this.companyVerfy.start_dt &&
                this.seller.sellerDepoName && this.seller.sellerBank &&
                this.seller.sellerAccount && this.seller.sellerMosNum;
        },
        async verifySubmit() {
            const originalStartDt = this.companyVerfy.start_dt;
            // - 제외
            this.companyVerfy.start_dt = this.companyVerfy.start_dt.replace(/-/g, '');
            const result = await this.userStore.compayRegverify(this.companyVerfy);
            this.companyVerfy.start_dt = originalStartDt;

            if(result) {
                console.log(this.userStore.uuid);
            }
        },
        submit() {
            // - 제외
            this.seller.phoneNumber = this.seller.phoneNumber.replace(/-/g, '');
            // 상세 주소가 입력된 경우 주소에 추가
            if (this.detailAddress) {
                this.seller.address += `, ${this.detailAddress}`; // 콤마로 구분
            }
            this.seller.sellerOpenedAt = this.companyVerfy.start_dt;
            this.seller.sellerRegNum = this.companyVerfy.b_no;
            this.seller.comUuid = this.userStore.uuid;

            const result = this.userStore.sellerSignup(this.seller);
            if (result) {
                let user = JSON.parse(sessionStorage.getItem('user'));

                // uuid 키 삭제
                if (user && user.uuid) {
                    delete user.uuid;
                }

                sessionStorage.setItem('user', JSON.stringify(user));

                this.$router.push("/login");
            }
        }
    }
}

</script>

<style scoped>
.certBox {
  border: 1px solid black;
  padding: 20px;
  max-width: 500px;
  margin: 20px auto;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.uBtn {
  display: block;
  width: 100%;
  height: 50px;
  padding-bottom: 1px;
  font-size: 15px;
  color: #000;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  cursor: pointer;
}

.uBtn:disabled {
  color: #fff;
  font-weight: bold;
  background: #ccc;
  border: 0;
}

.uBtn.active {
  color: #fff;
  font-weight: bold;
  background: #333;
  border: 0;
}

.uBtn.active:disabled {
  background: #ccc;
}

.uBtn.point {
  color: #fff;
  font-weight: bold;
  background: #1769ff;
  border: 0;
}

.uBtn.point:disabled {
  background: #ccc;
}

a {
  text-decoration: none;
}

.uInputArea {
  display: table;
  width: 100%;
  height: 30px;
  padding: 10px 0;
  border-bottom: 1px solid #000;
}

.uInputArea.emailType {
  position: relative;
  background: url("//openimage.interpark.com/member/common/icon/icon_arrow_down.png") 100% 50% no-repeat;
  background-size: 22px auto;
}

.uInputArea.emailType .uInput .inputBox .inputText {
  padding-right: 0;
}

.uInputArea.emailType .uSelectBox label {
  min-width: 106px;
  background: none;
}

.uInputArea.emailType .uSelectBox select {
  padding-left: 0;
}

.uInputArea.emailType.active .inputBox {
  padding-right: 60px;
}

.uInputArea.emailType.active .selectCol {
  position: absolute;
  top: 50%;
  right: 0;
  padding: 0;
  opacity: 0;
  margin-top: -15px;
}

.uInputArea.emailType.active .selectCol label {
  min-width: 0;
  width: 50px;
  height: 100%;
  padding: 0;
}

@media screen and (min-width: 769px) {
  .uInputArea.emailType.active .selectCol label {
    min-width: 130px;
    width: auto;
    height: 100%;
    padding: 0;
  }
}

.uInputArea .col {
  display: table-cell;
  vertical-align: top;
}

.uInputArea .col:first-child {
  width: 100%;
  padding-left: 5px;
}

.uInputArea .col:last-child {
  padding-right: 5px;
}

.uInputArea .label {
  display: inline-block;
  height: 30px;
  padding: 0;
  line-height: 30px;
}

.uInputArea .uInput:after {
  content: "";
  display: block;
  clear: both;
}

.uInputArea .uInput label {
  font-size: 15px;
  line-height: 30px;
  color: #000;
  float: left;
  font-weight: bold;
}

.uInputArea .uInput .inputBox {
  overflow: hidden;
  position: relative;
}

.uInputArea .uInput .inputBox .inputText {
  font-size: 15px;
  line-height: 30px;
  color: #000;
  display: block;
  width: 100%;
  height: 30px;
  padding: 0 25px 0 10px;
  box-sizing: border-box;
  border: 0;
  outline: 0;
  background: none;
}

.uInputArea .uInput .inputBox .inputText:-webkit-autofill,
.uInputArea .uInput .inputBox .inputText:-webkit-autofill:hover,
.uInputArea .uInput .inputBox .inputText:-webkit-autofill:focus,
.uInputArea .uInput .inputBox .inputText:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px #fff inset !important;
}

.uInputArea .uInput .inputBox .inputText::placeholder {
  font-size: 15px;
  line-height: 30px;
  color: #000;
  color: #ccc;
}

.uInputArea .uInput .inputBox .btnDel {
  display: none;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 25px;
  height: 30px;
}

.uInputArea .uInput .inputBox .btnDel:after {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 14px;
  height: 14px;
  margin: -7px 0 0 -7px;
  background: url("//openimage.interpark.com/member/common/icon/icon_delete.png") 0 0 no-repeat;
  background-size: 100% auto;
  content: "";
}

.uInputArea .uBtnArea {
  white-space: nowrap;
  font-size: 0;
}

.uInputArea .uBtnArea .uBtn {
  display: inline-block;
  width: auto;
  font-size: 13px;
  height: 30px;
  margin-left: 5px;
  color: #666;
  border: 0;
}

.uInputArea .uBtnArea .uBtn:first-child {
  margin-left: 0;
}

.uInputArea .uBtnArea .uBtn.borderType {
  min-width: 70px;
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;
  border-radius: 6px;
  border: 1px solid #ccc;
  color: #000;
}


.verified {
    background-color: #4caf50; /* 인증 완료 시 초록색으로 변경 */
    color: white; /* 텍스트 색상 변경 */
}

.uErrorText {
  font-size: 13px;
  line-height: 20px;
  color: #dc941b;
  margin-top: 5px;
  padding: 0 5px;
}

.uNoticeText {
  font-size: 13px;
  line-height: 20px;
  color: #999;
  margin-top: 5px;
  padding: 0 5px;
}

.uNoticeText.point {
  color: #dc941b;
}

.businessJoinNotice {
  font-size: 13px;
  line-height: 20px;
  color: #999;
  margin-top: 13px;
  padding: 0 5px;
}

.businessJoinNotice p {
  position: relative;
  padding-left: 8px;
}

.businessJoinNotice p::before {
  position: absolute;
  top: 8px;
  left: 0;
  display: inline-block;
  content: "";
  width: 3px;
  height: 3px;
  background-color: #999;
  border-radius: 100%;
}

.businessJoinNotice p a {
  color: #999;
  text-decoration: underline;
}

.uCheckbox {
  font-size: 0;
}

.uCheckbox:after {
  content: "";
  display: block;
  clear: both;
}

.uCheckbox.sType label {
  min-height: 23px;
}

.uCheckbox.sType .text {
  padding-top: 2px;
}

.uCheckbox.sType .text:after {
  width: 23px;
  height: 23px;
}

.uCheckbox input[type="checkbox"] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
  pointer-events: none;
}

.uCheckbox input[type="checkbox"]:checked+.text:after {
  border-color: #1769ff;
  background-color: #1769ff;
  background-position: 0 100%;
}

.uCheckbox label {
  float: left;
  min-height: 28px;
}

.uCheckbox .text {
  font-size: 13px;
  line-height: 20px;
  color: #000;
  display: inline-block;
  position: relative;
  height: 100%;
  padding-top: 4px;
  padding-left: 33px;
  cursor: pointer;
}

.uCheckbox .text:after {
  background: url("//openimage.interpark.com/member/common/icon/icon_check_new.png") 0 0 no-repeat;
  background-size: 100% auto;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 28px;
  height: 28px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  background-color: #fff;
  background-position: 0 0;
  background-size: 100% auto;
  border-radius: 50%;
}

.uCheckbox .checkboxCont {
  overflow: hidden;
}

.uCheckbox .checkboxCont .uNoticeText {
  padding: 0;
}

.uCheckbox .btnLink {
  font-size: 15px;
  line-height: 20px;
  color: #666;
  display: inline-block;
  position: relative;
  padding-right: 20px;
  vertical-align: top;
}

.uCheckbox .btnLink:after {
  position: absolute;
  top: 50%;
  height: 15px;
  margin-top: -7.5px;
  background: url("//openimage.interpark.com/member/common/icon/icon_arrow_left.png") 0 0 no-repeat;
  background-size: 100% auto;
  content: "";
  width: 15px;
  right: 0;
}

.uCheckbox .btnLink.hasSmallLink:after {
  display: none;
}

.uCheckbox .btnLink em {
  font-size: 13px;
  line-height: 20px;
  color: #666;
  position: relative;
  display: inline-block;
  width: auto;
  margin-left: 10px;
}

.uCheckbox .btnLink em:after {
  position: absolute;
  top: 50%;
  height: 14px;
  margin-top: -7px;
  background: url("//openimage.interpark.com/member/common/icon/icon_arrow_left.png") 0 0 no-repeat;
  background-size: 100% auto;
  background-position: 50% 50%;
  content: "";
  width: 15px;
  right: -14px;
}

@media screen and (max-width: 420px) {
  .uCheckbox .btnLink em {
    margin-top: 10px;
    margin-left: 0;
  }
}

.label {
  font-size: 15px;
  line-height: 22px;
  color: #000;
  padding: 10px 0;
  font-weight: bold;
}

/* .uRadioBox {
    overflow: hidden;
    height: 40px;
    padding: 2px;
    box-sizing: border-box;
    border-radius: 10px;
    background: #f3f3f3;
  }
  
  .uRadioBox input[type="radio"] {
    position: absolute;
    clip: rect(0, 0, 0, 0);
    pointer-events: none;
  }
  
  .uRadioBox input[type="radio"]:checked + .text {
    background: #fff;
    color: #000;
    border-radius: 8px;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);
  }
  
  .uRadioBox .uRadio {
    font-size: 15px;
    line-height: 36px;
    color: #666;
    float: left;
    width: 50%;
    height: 100%;
    background: #f3f3f3;
    text-align: center;
  }
  
  .uRadioBox .uRadio label,
  .uRadioBox .uRadio .text {
    display: block;
    position: relative;
    height: 100%;
  } */

.inputBox.radioBox {
  display: flex;
  align-items: center;
  gap: 20px;
  height: 30px;
}

.uInput label {
  font-size: 15px;
  line-height: 30px;
  color: #000;
  margin-right: 30px;
}

.radioBox label {
  font-size: 15px;
  line-height: 30px;
  font-weight: normal;
}

.radioBox input[type="radio"] {
  margin-right: 5px;
}

.uSelectBox label {
  display: inline-block;
  position: relative;
  min-width: 160px;
  height: 30px;
  vertical-align: top;
  background: url("//openimage.interpark.com/member/common/icon/icon_arrow_down.png") 100% 50% no-repeat;
  background-size: 22px auto;
}

.uSelectBox label select {
  padding: 0 14px 0 10px;
  height: 100%;
  border: 0;
  background: none;
  outline: 0;
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  font-size: 15px;
  line-height: 30px;
  color: #666;
}

button {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  background: transparent;
  -webkit-user-select: none;
  user-select: none;
  font-family: -apple-system, BlinkMacSystemFont, Roboto, "Droid Sans", "Helvetica Neue", "Apple SD Gothic Neo", "sans-serif", sans-serif;
}

button:active {
  opacity: .5;
}

select::-ms-expand {
  display: none;
}

.contentWrapper {
  padding: 0 20px;
}

@media screen and (min-width: 769px) {
  .contentWrapper {
    width: 500px;
    min-height: 800px;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 0;
  }
}

.registContent {
  padding-top: 15px;
  padding-bottom: 40px;
}

@media screen and (min-width: 769px) {
  .registContent {
    padding-top: 75px;
  }
}

.registContent .uBlock {
  min-height: 76px;
}

.registContent .uBlock.checkBlock {
  min-height: 0;
  margin-top: 15px;
}

.registContent .uBlock.validPeriod {
  padding-bottom: 20px;
}

.registContent .uBlock.validPeriod .label {
  padding-left: 5px;
}

.registContent .uBlock .uCheckbox {
  margin-top: 10px;
}

.registContent .uBlock .uCheckbox:first-child {
  margin-top: 0;
}

/* .registContent .uBlock .uErrorText {
  display: none;
} */

.registContent .uBlock .certifyTime {
  font-size: 13px;
  line-height: 20px;
  color: #dc941b;
  margin-top: 5px;
  padding: 0 5px;
  font-weight: bold;
}

.registContent .uBlock .blockText {
  padding: 20px 0;
  font-size: 15px;
  line-height: 22px;
}

.registContent .agreeBlock {
  min-height: auto;
}

.registContent .agreeBlock .uInputArea {
  border: 0;
}

.registContent .ubtnArea {
  margin-top: 45px;
}

.registContent .infoBlock {
  min-height: 0;
  padding: 0 5px 30px;
}

.registContent .infoList li {
  margin-top: 10px;
  font-size: 17px;
  line-height: 25px;
}

.registContent .infoList li:after {
  content: "";
  display: block;
  clear: both;
}

.registContent .infoList li:first-child {
  margin-top: 0;
}

.registContent .infoList li .title {
  float: left;
  padding-right: 10px;
  font-weight: bold;
}

.registContent .infoList li .text {
  overflow: hidden;
}

.registContent .accountValiBlock {
  margin-top: 25px;
  padding: 0 0 25px 5px;
}

.registContent .accountValiBlock .accountGuide {
  font-size: 13px;
  line-height: 20px;
  color: #dc941b;
  font-weight: bold;
}

.registContent .accountValiBlock .blockText {
  font-size: 13px;
  line-height: 20px;
  color: #000;
  padding: 10px 0;
}

.registContent .accountValiBlock .btnArrow {
  font-size: 13px;
  line-height: 20px;
  color: #000;
  display: inline-block;
  position: relative;
  padding-right: 8px;
  border-bottom: 1px solid #000;
}

.registContent .accountValiBlock .btnArrow:after {
  position: absolute;
  top: 50%;
  right: 0;
  width: 5px;
  height: 8px;
  margin-top: -4px;
  background: url("//openimage.interpark.com/member/common/icon/icon_btn_arrow.png") 0 0 no-repeat;
  background-size: 100% auto;
  content: "";
}

.completeContent {
  padding-bottom: 247px;
}

@media screen and (min-width: 769px) {
  .completeContent {
    padding-top: 24px;
  }

  .completeContent .title br {
    display: none;
  }
}

.completeContent .title {
  font-size: 24px;
  line-height: 37px;
  color: #000;
  margin-top: 120px;
  font-weight: bold;
  text-align: center;
}

.completeContent .text {
  font-size: 15px;
  line-height: 22px;
  color: #666;
  margin-top: 24px;
  text-align: center;
}

.completeContent .btnArea {
  display: table;
  width: 100%;
  margin-top: 30px;
}

.completeContent .btnArea .col {
  display: table-cell;
  width: 50%;
  padding: 0 5px;
}

.completeContent .btnArea .col:first-child {
  padding-left: 0;
}

.completeContent .btnArea .col:last-child {
  padding-right: 0;
}

.completeContent .bannerArea {
  margin-top: 30px;
}

.completeContent .bannerArea a {
  display: block;
}

.completeContent .bannerArea img {
  width: 100%;
}

.guideContent {
  padding-bottom: 247px;
}

@media screen and (min-width: 769px) {
  .guideContent .title br {
    display: none;
  }
}

.guideContent .title {
  font-size: 20px;
  line-height: 30px;
  color: #000;
  margin-top: 60px;
  font-weight: bold;
  text-align: center;
}

.guideContent .title span {
  display: block;
}

.guideContent .phrase {
  font-size: 15px;
  line-height: 22px;
  color: #666;
  margin-top: 24px;
  text-align: left;
}

.guideContent .phrase em {
  font-weight: bold;
}

.guideContent .btnArea {
  display: table;
  width: 100%;
  margin-top: 60px;
}

.guideContent .btnArea .col {
  display: table-cell;
  width: 50%;
  padding: 0 5px;
}

.guideContent .btnArea .col:first-child {
  padding-left: 0;
}

.guideContent .btnArea .col:last-child {
  padding-right: 0;
}

.guideContent .bannerArea {
  margin-top: 30px;
}

.guideContent .bannerArea a {
  display: block;
}

.guideContent .bannerArea img {
  width: 100%;
}

.guideContent .termsAgreeWrap .allAgree {
  padding-top: 24px;
  margin-top: 24px;
  border-top: 1px solid #ddd;
}

.guideContent .termsAgreeWrap .allAgree .text {
  font-weight: bold;
  font-size: 17px;
  line-height: 25px;
  color: #000;
}

.guideContent .termsAgreeWrap .termsBlock {
  margin-top: 10px;
  padding-left: 5px;
}

.guideContent .termsAgreeWrap .termsBlock .uCheckbox+.uCheckbox {
  margin-top: 15px;
}

.guideContent .termsAgreeWrap+.ubtnArea {
  margin-top: 45px;
}

.termsContent {
  padding-top: 25px;
  padding-bottom: 40px;
}

@media screen and (min-width: 769px) {
  .termsContent {
    padding-top: 75px;
  }
}

.termsContent .text {
  font-size: 15px;
  line-height: 22px;
  color: #666;
}

.termsContent .text+.termsAgreeWrap {
  margin-top: 45px;
}

.termsContent .uBlock {
  margin-top: 10px;
}

.termsContent .uBlock:first-child {
  margin-top: 0;
}

.termsContent .termsBlock {
  margin-top: 10px;
  padding-left: 5px;
}

.termsContent .termsBlock+.termsBlock {
  margin-top: 20px;
}

.termsContent .allAgree .text {
  font-size: 17px;
  line-height: 25px;
  color: #000;
  padding-top: 0;
  font-weight: bold;
}

.termsContent .termsItem .uCheckbox {
  margin-top: 15px;
}

.termsContent .termsItem .uCheckbox:first-child {
  margin-top: 0;
}

.termsContent .ubtnArea {
  margin-top: 45px;
}

.termsContent .termsDetailCont {
  margin: 15px 5px 0 0;
  padding: 0 15px;
  background: #f3f3f3;
  border-radius: 10px;
  display: none;
}

.termsContent .termsCont {
  padding: 15px 0;
}

.termsContent .termsCont:first-child {
  border-top: 0;
}

.termsContent .termsCont .title {
  font-size: 13px;
  line-height: 20px;
  color: #666;
}

.termsContent .termsCont .checkList {
  margin-top: 5px;
}

.termsContent .termsCont .checkList:after {
  content: "";
  display: block;
  clear: both;
}

.termsContent .termsCont .checkList li {
  float: left;
  width: 50%;
  margin-top: 5px;
}

.termsContent .termsCont .checkList+.uCheckbox {
  margin-top: 15px;
  margin-bottom: 10px;
  padding-top: 15px;
  border-top: 1px solid #ccc;
}

.termsContent .termsCont .uCheckbox .text {
  color: #666;
}

.termsContent .termsCont .uCheckbox+.title {
  margin-top: 20px;
}

.termsContent .termsCont .termsText {
  font-size: 11px;
  line-height: 17px;
  color: #999;
}

.termsContent .termsCont .termsText ul {
  margin-top: 10px;
}

.termsContent .termsCont .termsText li {
  margin-top: 10px;
}

.termsContent .businessCertifyArea {
  padding: 10px 0 40px;
}

.termsContent .businessCertifyArea .label {
  font-size: 17px;
  line-height: 25px;
  color: #000;
  padding-left: 5px;
}

.termsContent .termsPart {
  margin-top: 8px;
}

.termsContent .termsPart li a {
  font-size: 13px;
  color: #999;
}

.termsContent .termsPart li a.btnLink {
  padding-right: 15px;
}

.termsContent .termsPart li a.btnLink:after {
  width: 10px;
  margin-top: -5px;
}

.termsContent .choiceAgree .uCheckbox .checkboxCont>.btnLink {
  padding-right: 0;
}

.termsContent .choiceAgree .uCheckbox .checkboxCont>.btnLink:after {
  content: none;
}
</style>