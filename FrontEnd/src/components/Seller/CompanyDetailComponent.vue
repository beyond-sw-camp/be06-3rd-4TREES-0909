<template>
    <body>
        <div id="root">
            <div class="app">
                <div class="sc-hGoxap bInodS">
                    <div class="sc-dwztqd kmthuZ">
                        <div class="sc-fgrSAo fpcsZO">
                            <div class="sc-dvpmds bjUfOw">
                                <div class="frame-right">
                                    <form id="submitForm" name="submitForm" method="post">
                                        <h2 class="stit" style="border-bottom: 0px solid white;"><span class="sub-title">업체
                                                정보</span></h2>
                                        <div class="form_section">
                                            <fieldset class="fieldset medium">
                                                <legend>항목입력</legend>
                                                <div class="field">
                                                    <span class="label">업체명</span>
                                                    <div class="insert">
                                                        <span id="userEmail">{{ companyName }}</span>
                                                    </div>
                                                </div>
                                                <div class="field">
                                                    <span class="label">업종</span>
                                                    <div class="insert">
                                                        <span id="userName">{{ companyType }}</span>
                                                    </div>
                                                </div>
                                                <div class="field">
                                                    <span class="label">소개</span>
                                                    <div class="insert">
                                                        <span id="userSex">{{ companyIntro }}</span>
                                                    </div>
                                                </div>
                                                <div class="field">
                                                    <span class="label">주소</span>
                                                    <div class="insert">
                                                        <span id="userAddress">{{ companyAddress }}</span>
                                                    </div>
                                                </div>
                                                <div class="field">
                                                    <span class="label">우편번호</span>
                                                    <div class="insert">
                                                        <span id="userPostCode">{{ companyPostCode }}</span>
                                                    </div>
                                                </div>

                                            </fieldset>
                                        </div>
                                        <div class="form_btn_area"
                                            style="text-align:right; margin-top: -20px; margin-bottom: 30px">
                                            <p id="alertArea" class="desc"></p>
                                            <router-link to="/seller/company/modify">
                                                <a id="submitBtn" class="cs_btn large black">수정하기</a>
                                            </router-link>
                                        </div>
                                    </form>
                                </div>
                                <div style="margin: 10px"></div>
                                <div class="sc-jHXLhC dbTkfC">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>

<script>
import axios from 'axios';
import { useSellerStore } from '@/stores/useSellerStore';
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
    mounted() {
        this.sellerStore = useSellerStore();
        this.getCompanyDetail();
    },
    methods: {
        async getCompanyDetail() {
            const backend = process.env.VUE_APP_BACKEND_URL;

            try {
                const response = await axios.get(backend + '/company/detail', { withCredentials: true });
                const companyDetails = response.data.result;

                this.companyName = companyDetails.companyName;
                this.companyType = companyDetails.companyType;
                this.companyIntro = companyDetails.companyIntro;
                this.companyAddress = companyDetails.companyAddress;
                this.subAddress = companyDetails.subAddress;
                
                if (companyDetails.companyPostCode < 10000) {
                    this.companyPostCode = "0" + companyDetails.companyPostCode;
                } else {
                    this.companyPostCode = companyDetails.companyPostCode;
                }
            } catch (error) {
                alert('업체 정보를 불러오는 중 오류가 발생했습니다.');
                this.$router.push('/seller/company/register'); // 등록 페이지로 리다이렉트
            }
        },
    },
};


</script>

<style scoped>
html,
body,
div,
header,
nav,
section,
aside,
article,
footer,
ul,
ol,
li,
dl,
dt,
dd,
h1,
h2,
h3,
p {
    margin: 0;
    padding: 0;
}

html,
body,
div,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
address,
big,
cite,
code,
del,
dfn,
em,
font,
img,
ins,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
ul,
ol,
li,
dl,
dt,
dd,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
fieldset,
form,
label,
legend,
input,
button,
textarea,
select {
    margin: 0;
    padding: 0;
}

div {
    display: block;
    unicode-bidi: isolate;
}

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
em,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
    margin: 0px;
    padding: 0px;
    border: 0px;
    font-size: 100%;
    font-style: normal;
    vertical-align: baseline;
}

.bInodS {
    min-width: 1236px;
}

.kmthuZ {
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    background: rgb(255, 255, 255);
}

.fpcsZO {
    width: 1024px;
    margin-top: 30px;
}

.bjUfOw {
    margin-bottom: 30px;
}

*,
::after,
::before {
    box-sizing: border-box;
}

* {
    font-family: "Pretendard Variable", -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    scroll-behavior: smooth;
}

element.style {
    border-bottom: 0px solid white;
}

h2.stit {
    padding-top: 15px;
    border-bottom: 1px solid #203a4d;
    padding-bottom: 13px;
    padding-left: 10px;
    font-family: "Pretendard", -apple-system, BlinkMacSystemFont, sans-serif;
    font-weight: 400;
    font-size: 26px;
    color: #203a4d;
    line-height: 30px;
}

.stit {
    padding-left: 0px;
}

.h1,
.h2,
.h3,
.h4,
.h5,
.h6,
h1,
h2,
h3,
h4,
h5,
h6 {
    margin-top: 0;
    margin-bottom: .5rem;
    font-weight: 500;
    line-height: 1.2;
}

* {
    font-family: "Pretendard Variable", -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    scroll-behavior: smooth;
}

h2 {
    display: block;
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    unicode-bidi: isolate;
}

.form_section {
    margin-bottom: 30px;
}

.form_section .fieldset.medium {
    padding: 0;
    background: none;
}

.form_section .fieldset.medium {
    position: relative;
    margin-top: 1px;
    border-top: 1px solid #666;
    border-bottom: 1px solid #666;
}

fieldset {
    display: block;
    margin-inline-start: 2px;
    margin-inline-end: 2px;
    padding-block-start: 0.35em;
    padding-inline-start: 0.75em;
    padding-inline-end: 0.75em;
    padding-block-end: 0.625em;
    min-inline-size: min-content;
    border-width: 2px;
    border-style: groove;
    border-color: rgb(192, 192, 192);
    border-image: initial;
}

fieldset {
    min-width: 0;
    padding: 0;
    margin: 0;
    border: 0;
}

body {
    margin: 0;
    font-family: var(--bs-body-font-family);
    font-size: var(--bs-body-font-size);
    font-weight: var(--bs-body-font-weight);
    line-height: var(--bs-body-line-height);
    color: var(--bs-body-color);
    text-align: var(--bs-body-text-align);
    background-color: var(--bs-body-bg);
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
}

legend {
    display: block;
    padding-inline-start: 2px;
    padding-inline-end: 2px;
    unicode-bidi: isolate;
    border-width: initial;
    border-style: none;
    border-color: initial;
    border-image: initial;
}

legend {
    float: left;
    width: 100%;
    padding: 0;
    margin-bottom: .5rem;
    font-size: calc(1.275rem + .3vw);
    line-height: inherit;
}

.form_section .fieldset.medium .field {
    padding: 20px 15px;
}

.form_section .fieldset.medium .field .label {
    width: 154px;
    padding: 0;
    color: #222;
}

.fieldset .field .label {
    float: left;
    display: inline;
    font-size: 15px;
}

.form_section .fieldset.medium .field .insert {
    margin-left: 154px;
    color: #666;
}

.form_section .fieldset.medium {
    position: relative;
    margin-top: 1px;
    border-top: 1px solid #666;
    border-bottom: 1px solid #666;
}

.form_section .fieldset.medium {
    padding: 0;
    background: none;
}

fieldset {
    display: block;
    margin-inline-start: 2px;
    margin-inline-end: 2px;
    padding-block-start: 0.35em;
    padding-inline-start: 0.75em;
    padding-inline-end: 0.75em;
    padding-block-end: 0.625em;
    min-inline-size: min-content;
    border-width: 2px;
    border-style: groove;
    border-color: rgb(192, 192, 192);
    border-image: initial;
}

.form_section legend {
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
    line-height: 0;
    white-space: normal;
    word-wrap: break-word;
    word-break: break-all;
    clip: rect(0, 0, 0, 0);
}

legend {
    display: block;
    padding-inline-start: 2px;
    padding-inline-end: 2px;
    unicode-bidi: isolate;
    border-width: initial;
    border-style: none;
    border-color: initial;
    border-image: initial;
}

.form_section legend:before {
    display: block;
    width: 0;
    height: 0;
    font-size: 0;
    content: " ";
}

*,
::after,
::before {
    box-sizing: border-box;
}

.form_section .fieldset.medium .field {
    padding: 20px 20px;
}

legend+* {
    clear: left;
}

.form_section .fieldset.medium .field .label {
    width: 154px;
    padding: 0;
    color: #222;
}

.form_section .fieldset.medium .field .insert {
    margin-left: 154px;
    color: #666;
}

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
em,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
    margin: 0px;
    padding: 0px;
    border: 0px;
    font-size: 100%;
    font-style: normal;
    vertical-align: baseline;
}

.fieldset.medium .field:after {
    display: block;
    visibility: hidden;
    clear: both;
    width: 0;
    height: 0;
    content: "";
}

.form_section .fieldset.medium .field {
    padding: 20px 15px;
}

.form_section .fieldset.medium {
    padding: 0;
    background: none;
}
.field {
border-bottom: 1px solid #716f72;

}

.field :last-child{
    border-bottom: none;
}

.form_section {
    margin-bottom: 30px;
}

element.style {
    text-align: right;
    margin-top: -20px;
    margin-bottom: 30px;
}

.form_btn_area p.desc {
    margin: 10px 0 20px;
    color: #f96a62;
}

.cs_btn {
    display: inline-block;
}

p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    unicode-bidi: isolate;
}

.cs_btn.large.black {
    border-radius: 6px;
    background: #c981f1;
    border: 1px solid #a053ce;
    color: #fff;
}

.cs_btn.large {
    min-width: 96px;
    padding: 11px 16px;
    text-align: center;
    font-size: 16px;
    font-family: "Pretendard", -apple-system, BlinkMacSystemFont, sans-serif;
    font-weight: 400;
    text-decoration: none;
    letter-spacing: -1px;
    line-height: 18px;
}

.form_btn_area p.desc {
    margin: 10px 0 20px;
    color: #f96a62;
}

.form_section .fieldset.medium {
    position: relative;
    margin-top: 1px;
    border-top: 1px solid #666;
    border-left: 1px solid #666;
    border-right: 1px solid #666;
    border-bottom: 1px solid #666;
}

element.style {
    text-align: right;
    margin-top: -20px;
    margin-bottom: 30px;
}

.form_btn_area {
    margin-top: 20px;
    text-align: center;
}

element.style {
    margin: 10px;
}

.kHfkPy:first-child {
    border-left: 1px solid rgb(33, 33, 33);
}

a:link {
    color: #4f4f4f;
    text-decoration: none;
}

.kHfkPy {
    flex: 1 1 0%;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    display: flex;
    border-top: 1px solid rgb(33, 33, 33);
    border-right: 1px solid rgb(33, 33, 33);
    border-bottom: 1px solid rgb(255, 255, 255);
    background: rgb(255, 255, 255);
    color: rgb(33, 33, 33);
    font-weight: 600;
}

a {
    text-decoration: none;
    cursor: pointer;
}

.gyLEXJ {
    margin-left: 10px;
}

a:link {
    color: #4f4f4f;
    text-decoration: none;
}

.kHfkPy {
    flex: 1 1 0%;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    display: flex;
    border-top: 1px solid rgb(33, 33, 33);
    border-right: 1px solid rgb(33, 33, 33);
    border-bottom: 1px solid rgb(255, 255, 255);
    background: rgb(255, 255, 255);
    color: rgb(33, 33, 33);
    font-weight: 600;
}

.kHfkPy:first-child {
    border-left: 1px solid rgb(33, 33, 33);
}

a:link {
    color: #4f4f4f;
    text-decoration: none;
}

.dvLjiM {
    display: flex;
    height: 50px;
}

.gyLEXJ {
    margin-left: 10px;
}

.bJrpjk {
    margin-top: 30px;
}

.lmWoqQ {
    margin-bottom: 25px;
}

.kfUvd {
    display: flex;
    width: 100%;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
}

.epaGrj {
    display: flex;
    font-size: 16px;
}

.eUUkBg {
    display: flex;
    flex-wrap: wrap;
}

.lduImb {
    border: 1px solid rgb(238, 238, 238);
    background: rgb(255, 255, 255);
    display: block;
}

.hIlFFp {
    width: 196px;
    margin-right: 11px;
    margin-bottom: 11px;
}

.clDfaY {
    position: relative;
    width: 100%;
    height: 194px;
}

img {
    overflow-clip-margin: content-box;
    overflow: clip;
}

.dwFxLs {
    position: absolute;
    left: 10px;
    bottom: 10px;
    display: flex;
    gap: 5px;
}

.clDfaY {
    position: relative;
    width: 100%;
    height: 194px;
}

.ePKyjW {
    padding: 15px 10px;
    height: 80px;
}

.SHYdy {
    position: relative;
    font-size: 14px;
    padding-bottom: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.liFfKA {
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    height: 20px;
}

.fNGAyh {
    font-size: 12px;
    color: rgb(136, 136, 136);
}
</style>