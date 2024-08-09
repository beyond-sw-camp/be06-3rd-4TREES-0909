<template>
        <div class="frame-right">
        <form id="submitForm" name="submitForm" method="post">
            <h2 class="stit"><span>회원정보수정</span></h2>
            <div class="form_section">
                <div class="content_intro">
                    <h3>필수정보입력</h3>
                    <p class="join_txt">
                        <img src="//sui.ssgcdn.com/ui/ssg/img/mem/ico_star.gif" alt="필수"> 표시는 필수입력 항목 이오니 반드시 입력해 주세요.
                    </p>
                </div>
                <fieldset class="fieldset medium">
                    <legend>항목입력</legend>
                    <div class="field">
                        <span class="label">아이디 <img src="//sui.ssgcdn.com/ui/ssg/img/mem/ico_star.gif" alt="필수"></span>
                        <div class="insert" id="idCheckDiv">
                            
                                <span>{{userStore.userInfoDetail.email}}</span>
                            
                            
                        </div>
                    </div>
                    <div class="field">
                        <span class="label">이름 <img src="//sui.ssgcdn.com/ui/ssg/img/mem/ico_star.gif" alt="필수"></span>
                        <div class="insert">
                            <span id="mbrNm">강태성</span>
                        </div>
                    </div>
                    
                    <div class="field">
                        <span class="label">생년월일
                        </span>
                        <div class="insert">
                            <span id="userBirth">1997-05-13</span>
                        </div>
                    </div>
                    <div class="field">
                        <span class="label">성별</span>
                        <div class="insert">
                            <span id="userSex">남</span>
                        </div>
                    </div>
                    <div class="field">
                        <span class="label">주소 <img src="//sui.ssgcdn.com/ui/ssg/img/mem/ico_star.gif" alt="필수"></span>
                        <div class="insert">
                            <input type="text" id="email" name="email"  value="" class="input_text small translated" style="width:250px" maxlength="50"><span class="trans_placeholder blind" ></span>
                            <button class="searchAddrBtn" style="border: 0.5px solid #666; width: 80px;" onclick="searchAddr()">우편번호검색</button>
                        </div>
                    </div>
                    <div class="field">
                        <span class="label">상세주소 <img src="//sui.ssgcdn.com/ui/ssg/img/mem/ico_star.gif" alt="필수"></span>
                        <div class="insert">
                            <input type="text" id="email" name="email"  value="" class="input_text small translated" style="width:250px" maxlength="50"><span class="trans_placeholder blind" ></span>
                        </div>
                    </div>
                    <div class="field">
                        <span class="label">우편번호 <img src="//sui.ssgcdn.com/ui/ssg/img/mem/ico_star.gif" alt="필수"></span>
                        <div class="insert">
                            <input type="text" id="email" name="email"  value="" class="input_text small translated" style="width:100px" maxlength="50"><span class="trans_placeholder blind" ></span>
                        </div>
                    </div>
                    <div class="field">
                        <label for="mbrCntsELno" class="label">휴대폰번호 <img src="//sui.ssgcdn.com/ui/ssg/img/mem/ico_star.gif" alt="필수"></label>
                        <input type="hidden" name="cntsTypeCd" value="20">
                        <input type="hidden" name="mbrCntsno" id="mbrCntsno">
                        <div class="insert">
                            <div>
                                <select id="mbrCntsano" name="mbrCntsano" title="식별번호 선택" class="select small" style="width: 102px;">
                                    <option value="010" addtoptnval1="" addtoptnval2="" selected="selected">010</option><option value="011" addtoptnval1="" addtoptnval2="">011</option><option value="016" addtoptnval1="" addtoptnval2="">016</option><option value="017" addtoptnval1="" addtoptnval2="">017</option><option value="018" addtoptnval1="" addtoptnval2="">018</option><option value="019" addtoptnval1="" addtoptnval2="">019</option>
                                </select>
                                <span>-</span>
                                <input type="tel" id="mbrCntsELno" title="휴대폰 번호 뒷자리" placeholder="- 없이 뒷자리를 입력해주세요." :value="userStore.userInfoDetail.phoneNumber" class="input_text small translated" style="width:136px;ime-mode:disabled;" maxlength="8" numberonly=""><span class="trans_placeholder blind" data-default-txt="- 없이 뒷자리를 입력해주세요.">- 없이 뒷자리를 입력해주세요.</span>
                            </div>
                        </div>
                    </div>


                    
                    <div class="field" id="emailChg01">
                        <label for="email" class="label">이메일주소 <img src="//sui.ssgcdn.com/ui/ssg/img/mem/ico_star.gif" alt="필수"></label>
                        <div class="insert">
                            <input type="text" id="email" name="email" placeholder="자주 사용하시는 이메일 주소를 입력해주세요." :value="userStore.userInfoDetail.email" class="input_text small translated" style="width:250px" maxlength="50"><span class="trans_placeholder blind" data-default-txt="자주 사용하시는 이메일 주소를 입력해주세요.">자주 사용하시는 이메일 주소를 입력해주세요.</span>
                        </div>
                    </div>
                </fieldset>
            </div>
            <div class="form_btn_area">
                <p id="alertArea" class="desc"></p>
                <a href="javascript:void(0);" onclick="modify.update();" id="submitBtn" class="cs_btn large black">변경하기</a>
            </div>
            <div class="cs_info_box">
                <h3 class="cs_info_subtit">회원정보변경 안내</h3>
                <ul class="cs_info_lst">
                    <li>배송지 정보는 '나의 정보관리 &gt; 배송지 관리' 메뉴에서 추가/수정/삭제하실 수 있습니다.</li>
                    <li>주문 정보는 회원 정보에 등록된 휴대폰번호 및 이메일주소로 안내됩니다.</li>
                </ul>
            </div>
        </form>
    <div class="frame-cnt-inner">
    
    </div>
    </div><!--// content-wrap -->
</template>

<script>
import { mapStores } from 'pinia';
import { useUserStore } from '@/stores/useUserStore';
export default {
    name: "UserMypageInfoEditComponent",
    data() {
        return { 
        }
    },
    computed: {
        ...mapStores(useUserStore)
    },
    methods: {

    },
}

</script>

<style scoped>
html, body, div, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, address, big, cite, code, del, dfn, em, font, img, ins, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, ul, ol, li, dl, dt, dd, table, caption, tbody, tfoot, thead, tr, th, td, fieldset, form, label, legend, input, button, textarea, select {
    margin: 0;
    padding: 0;
}

.frame-right{
    width: 100%;
    padding: 0 4rem;
    float: right;
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

.form_section {
    margin-bottom: 30px;
}
div {
    display: block;
    unicode-bidi: isolate;
}
.stit + .form_section .content_intro {
    margin-top: 30px;
}
.form_section .content_intro {
    margin-top: 60px;
    overflow: unset;
}
.content_intro {
    position: relative;
}
.form_section .content_intro h3 {
    margin-top: 20px;
    margin-bottom: 10px;
    font-family: "Pretendard", -apple-system, BlinkMacSystemFont, sans-serif;
    font-weight: 400;
    font-size: 20px;
    color: #203a4d;
    line-height: 22px;
    letter-spacing: -1px;
    text-align: left;
}
h3 {
    display: block;
    font-size: 1.17em;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    unicode-bidi: isolate;
}

.form_section .content_intro p {
    margin-bottom: -1px;
    padding-bottom: 20px;
    color: #666;
}

p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    unicode-bidi: isolate;
}

img {
    overflow-clip-margin: content-box;
    overflow: clip;
}

img {
    vertical-align: middle;
    border: 0;
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
legend, caption {
    position: absolute;
    left: -99999px;
    display: block;
    width: 1px;
    height: 1px;
    overflow: hidden;
    text-indent: -99999px;
    clip: rect(0, 0, 0, 0);
}
.form_section legend:before {
    display: block;
    width: 0;
    height: 0;
    font-size: 0;
    content: " ";
}
*, ::after, ::before {
    box-sizing: border-box;
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
.form_section .fieldset.medium .field {
    padding: 12px 10px;
}
.fieldset.medium .field {
    padding: 12px 10px;
    vertical-align: middle;
    border-top: 1px solid #e5e5e5;
}
.fieldset .field {
    zoom: 1;
}
.form_section .fieldset.medium .field .label {
    width: 154px;
    padding: 0;
    color: #222;
}
.fieldset.medium .field .label {
    width: 154px;
    line-height: 28px;
    font-weight: bold;
    color: #222;
}
.form_section .fieldset.medium .field .insert {
    margin-left: 154px;
    color: #666;
}
.fieldset.medium .field .insert {
    position: relative;
    margin-left: 154px;
    line-height: 28px;
    vertical-align: middle;
    zoom: 1;
}

.fieldset.medium .field:after {
    display: block;
    visibility: hidden;
    clear: both;
    width: 0;
    height: 0;
    content: "";
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
.input_text.small, .input_password.small {
    height: 28px;
    line-height: 28px \9;
    padding: 0;
    border: 1px solid #b2b2b2;
    text-indent: 10px;
}
.input_text, .input_password, .input_search, .input_number, .textarea {
    margin: 0;
    border: solid 1px #b2b2b2;
    border-radius: 0;
    background-color: #fff;
    font-size: 12px;
    font-family: "Pretendard", -apple-system, BlinkMacSystemFont, sans-serif;
    font-weight: 400;
    color: #666;
    vertical-align: middle;
    outline: 0;
    -moz-border-radius: 0;
    -webkit-border-radius: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    resize: none;
}
input{
    text-rendering: auto;
    color: fieldtext;
    letter-spacing: normal;
    word-spacing: normal;
    line-height: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    appearance: auto;
    -webkit-rtl-ordering: logical;
    cursor: text;
    background-color: field;
    margin: 0em;
    padding: 1px 0px;
    border-width: 2px;
    border-style: inset;
    border-color: light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
    border-image: initial;
    padding-block: 1px;
    padding-inline: 2px;
}
.blind {
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
.form_btn_area {
    margin-top: 20px;
    text-align: center;
}
.form_btn_area p.desc {
    margin: 10px 0 20px;
    color: #f96a62;
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
    background: #ac6af6;
    border: 1px solid #ac6af6;
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
.cs_info_box {
    margin-top: 30px;
    text-align: left;
}
.cs_info_box .cs_info_subtit {
    padding-bottom: 10px;
    border-bottom: 1px solid #e8e8e8;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: -0.28px;
    color: #222;
    font-family: "Pretendard", -apple-system, BlinkMacSystemFont, sans-serif;
    font-weight: 400;
}
h3 {
    display: block;
    font-size: 1.17em;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    unicode-bidi: isolate;
}
.cs_info_box .cs_info_lst {
    overflow: hidden;
    padding: 15px 0;
}
ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
    unicode-bidi: isolate;
}
.cs_info_box .cs_info_lst li:first-child {
    margin-top: 0;
}
.cs_info_box .cs_info_lst li {
    position: relative;
    margin-top: 5px;
    padding-left: 8px;
    font-size: 12px;
    color: #888;
    line-height: 16px;
    letter-spacing: -0.28px;
}
ul li {
    list-style: none;
}
li {
    display: list-item;
    text-align: -webkit-match-parent;
    unicode-bidi: isolate;
}
.cs_info_box .cs_info_lst li:before {
    position: absolute;
    top: 8px;
    left: 0;
    width: 2px;
    height: 2px;
    background: #888;
    border-radius: 50%;
    content: "";
}
.cs_info_box .cs_info_lst li {
    position: relative;
    margin-top: 5px;
    padding-left: 8px;
    font-size: 12px;
    color: #888;
    line-height: 16px;
    letter-spacing: -0.28px;
    }
    li {
    display: list-item;
    text-align: -webkit-match-parent;
    unicode-bidi: isolate;
}
.cs_info_box .cs_info_lst li {
    position: relative;
    margin-top: 5px;
    padding-left: 8px;
    font-size: 12px;
    color: #888;
    line-height: 16px;
    letter-spacing: -0.28px;
}
.cs_info_box .cs_info_lst li:before {
    position: absolute;
    top: 8px;
    left: 0;
    width: 2px;
    height: 2px;
    background: #888;
    border-radius: 50%;
    content: "";
}
.frame-cnt-inner {
    width: 820px;
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
html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
}
body {
    position: relative;
    line-height: 1.5em;
    font-size: 0.75em;
    font-family: "Pretendard", -apple-system, BlinkMacSystemFont, sans-serif;
    font-weight: 400;
}

</style>