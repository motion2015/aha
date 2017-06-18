"use strict";
var ENV = {
    currentRadio: 0,
    FOR_PHONE: {
        CNT: 0,
        CTFNO_CNT: 0,
        CTFNO_SEND_CNT: 0,
        timer: null,
        interval: null,
        smsSendTime: 0,
        smsTimeout: 60 * 3,
        smsTimeoutChk: 60 * 3,
        ctfTimer: null,
        ctfInterval: null,
        ctfSmsTimeout: 60 * 3,
        ctfSmsTimeoutChk: 60 * 3,
        ctfNatvC: "N",
        ctfSuccess: false,
        ctfMbJDvC: "00"
    }
};
var EVENT = {
    init: function() {
        EVENT.clickEventInit()
    },
    currentScr: function() {},
    initScr: function(a) {
        if (a = "00") {
            if (ENV.currentRadio == "0") {
                $(".mb").find("label").addClass("on");
                $(".cd").find("label").removeClass("on");
                $(".ipin").find("label").removeClass("on");
                EVENT.FOR_PHONE.init()
            } else {
                if (ENV.currentRadio == "1") {
                    $(".mb").find("label").removeClass("on");
                    $(".cd").find("label").addClass("on");
                    $(".ipin").find("label").removeClass("on");
                    $("#agree_radio2").prop("checked", true)
                } else {
                    if (ENV.currentRadio == "2") {
                        $(".mb").find("label").removeClass("on");
                        $(".cd").find("label").removeClass("on");
                        $(".ipin").find("label").addClass("on");
                        $("#agree_radio3").prop("checked", true)
                    }
                }
            }
            scard.storage.remove("UOAPMJ0101M0")
        }
    },
    clickEventInit: function() {
        $(".btn_wrap  .prev_step, .next_step").on("click", function() {
            if ($(this).hasClass("prev_step")) {
                if (ENV.currentRadio == "0") {
                    location.replace("/oap/join/UOAPMJ0101M0.jsp")
                } else {
                    if (ENV.currentRadio == "1") {
                        $("#agree_radio1").trigger("click")
                    } else {
                        if (ENV.currentRadio == "2") {
                            $("#agree_radio1").trigger("click")
                        }
                    }
                }
            } else {
                if (ENV.currentRadio == "0") {
                    if (ENV.FOR_PHONE.ctfSuccess) {
                        EVENT.checkUser()
                    } else {
                        scard.showMessage("WCHPP0870");
                        return
                    }
                } else {
                    if (ENV.currentRadio == "1") {
                        EVENT.FOR_CARD.validation()
                    } else {
                        if (ENV.currentRadio == "2") {}
                    }
                }
            }
        })
    },
    nextPage: function() {
        location.href = "/oap/join/UOAPMJ0102M0.jsp"
    },
    checkUser: function() {
        scard.ajax({
            service: "SOAPMJ0114S01",
            data: {
                mbJDvC: ""
            },
            success: function(c, d, b) {
                ENV.FOR_PHONE.ctfMbJDvC = $.trim(c.mbJDvC);
                if (ENV.FOR_PHONE.ctfMbJDvC == "01") {
                    if (confirm(scard.getMessage("WCHPP0577").msgKrnCn + "이미 가입하신 회원입니다. 현재 회원님의 ID는 " + c.dgtlMmbrId + "입니다.\n로그인 하시겠습니까?")) {
                        location.replace("/oap/my-page/UOAPMP2001M0.jsp")
                    }
                    scard.storage.remove("UOAPMJ0101M0")
                } else {
                    if (ENV.FOR_PHONE.ctfMbJDvC == "03") {
                        alert("삼성카드 홈페이지 회원입니다.\n현재 회원님의 ID는 " + c.dgtlMmbrId + "입니다.\n삼성카드 다이렉트 오토 서비스 가입을 위한 약관에 동의하시면 서비스 가입이 완료됩니다");
                        var a = {
                            dgtlMmbrIdNo: c.dgtlMmbrIdNo,
                            dgtlMmbrId: c.dgtlMmbrId,
                            cardUser: "N"
                        };
                        scard.storage.set("UOAPMJ0101M0", a);
                        EVENT.nextPage()
                    } else {
                        if (ENV.FOR_PHONE.ctfMbJDvC == "05") {
                            scard.storage.remove("UOAPMJ0101M0");
                            EVENT.nextPage()
                        } else {
                            if (ENV.FOR_PHONE.ctfMbJDvC == "06") {
                                var a = {
                                    dgtlMmbrIdNo: "",
                                    dgtlMmbrId: "",
                                    cardUser: "Y"
                                };
                                scard.storage.set("UOAPMJ0101M0", a);
                                EVENT.nextPage()
                            } else {
                                scard.storage.remove("UOAPMJ0101M0");
                                scard.showMessage("ECHPP0018")
                            }
                        }
                    }
                }
            },
            error: function(a, c, b) {
                scard.log.debug(b);
                scard.showMessage(b);
                return false
            }
        })
    },
    FOR_PHONE: {
        init: function() {
            this.clickEventInit();
            var b = [{
                text: "선택",
                value: ""
            }];
            for (var a = 1; a < 32; a++) {
                b.push({
                    text: a,
                    value: a < 10 ? "0" + a : a
                })
            }
            $("#birthDay3").selectBoxAdd("insert", "1", b)
        },
        validation: function() {
            $("#birth_day").val($("#birthDay1").val() + "." + $("#birthDay2").val() + "." + $("#birthDay3").val());
            $("#namecheck").hide();
            $("#birthcheck").hide();
            $("#cellcheck").hide();
            $("#cellcheck2").hide();
            var a = true;
            if ($("#fi_in_name").val().trim() == "") {
                $("#namecheck").show();
                if (a) {
                    UTIL.scrollFocus($("#fi_in_name"))
                }
                a = false
            }
            if ($("#birth_day").dateVal().length != 8) {
                $("#birthcheck").show();
                if (a) {
                    UTIL.scrollFocus($("#birth_day"))
                }
                a = false
            }
            if ($("#fi_sl_hnum").val() == "-1") {
                $("#cellcheck2").show();
                if (a) {
                    UTIL.scrollFocus($("#fi_sl_hnum"))
                }
                a = false
            }
            if ($("#mphNo").val().length < 8) {
                $("#cellcheck").show();
                if (a) {
                    UTIL.scrollFocus($("#mphNo"))
                }
                a = false
            }
            if (!a) {
                return false
            }
            if (!this.chkPrv()) {
                scard.showMessage("WCHPP0357");
                return false
            }
            return true
        },
        chkPrv: function() {
            return $("input[name=fn_ck_age]:checked").length == $("input[name=fn_ck_age]").length
        },
        clickEventInit: function() {
            $("#extendTime").on("click", function(a) {
                EVENT.FOR_PHONE.smsTimeoutChk = ENV_CTF_INFO_PHONE.smsTimeout
            });
            $("#ctfNoreq").unbind("click");
            $("#ctfNoreq").on("click", function() {
                EVENT.FOR_PHONE.ctfNoFw()
            });
            $("#ctfCfmok").unbind("click");
            $("#ctfCfmok").on("click", function() {
                EVENT.FOR_PHONE.ctfNoVd()
            });
            $(".term_chk1, .term_chk2, .term_chk3").unbind("click");
            $(".term_chk1, .term_chk2, .term_chk3").on("click", function() {
                if ($("#fi_sl_hnum").val() == "-1") {
                    $("#cellcheck2").show();
                    return false
                } else {
                    $("#cellcheck2").hide()
                }
                var d = $("#fi_sl_hnum").val();
                var b = "";
                var a = "";
                var f = "";
                var c = "";
                switch (d) {
                    case "1":
                        b = "PO0211";
                        a = "PO0212";
                        f = "PO0213";
                        break;
                    case "2":
                        b = "PO0221";
                        a = "PO0222";
                        f = "PO0223";
                        break;
                    case "3":
                        b = "PO0231";
                        a = "PO0232";
                        f = "PO0233";
                        break;
                    case "5":
                        b = "PO0211";
                        a = "PO0212";
                        f = "PO0213";
                        break;
                    case "6":
                        b = "PO0221";
                        a = "PO0222";
                        f = "PO0223";
                        break;
                    case "7":
                        b = "PO0231";
                        a = "PO0232";
                        f = "PO0233";
                        break
                }
                if ($(this).hasClass("term_chk1")) {
                    c = b
                }
                if ($(this).hasClass("term_chk2")) {
                    c = a
                }
                if ($(this).hasClass("term_chk3")) {
                    c = f
                }
                var e = "01";
                scui.util.openPopup("/oap/common/UOAPCO1101P0.jsp?prvId=" + c + "&printType=" + e, 800, 700, {
                    name: "wcmsPrvPrint",
                    scrollbars: "yes",
                    resizable: "no",
                    align: "center"
                })
            })
        },
        ctfNoVd: function() {
            $("#ctfNocheck1").hide();
            if ($("#fi_in_rnum").val().length < 4) {
                scard.showMessage("WCHPP0438");
                return
            }
            scard.ajax({
                service: "SOAPCO0603S01",
                data: {
                    srnId: scard.env.scrnId.substr(0, 12),
                    ctfNo: $("#fi_in_rnum").val(),
                    ctfNatvNo: ENV.FOR_PHONE.ctfNatvC
                },
                success: function(c, d, b) {
                    scard.log.debug(c);
                    var a = c.etxtRspC;
                    $("#ctfNocheck1").hide();
                    if (a == "P000") {
                        if (ENV.FOR_PHONE.timer != null) {
                            clearInterval(ENV.FOR_PHONE.timer)
                        }
                        scard.showMessage("NCHPP0031");
                        ENV.FOR_PHONE.ctfSuccess = true;
                        ENV.FOR_PHONE.CTFNO_CNT = 0;
                        $(".input_auth").hide();
                        $("#ctfNocheck1").hide()
                    } else {
                        $("#ctfNocheck1").show();
                        ENV.FOR_PHONE.ctfSuccess = false;
                        ENV.FOR_PHONE.CNT++;
                        if (ENV.FOR_PHONE.CNT > 2) {
                            $("#ctfNoreq").text("인증번호 재발송");
                            $("#ctfNoreq").disabled(false);
                            $("#fi_in_rnum").val("");
                            $("#fi_in_rnum").attr("disabled", true);
                            $("#ctfCfmok").disabled();
                            if (ENV.FOR_PHONE.timer != null) {
                                clearInterval(ENV.FOR_PHONE.timer)
                            }
                            $("#timeoutArea").text("0분 0초");
                            $("#ctfNocheck1").hide();
                            $("#ctfNoRfw").show();
                            if (ENV.FOR_PHONE.CTFNO_CNT > 2) {
                                if (ENV.FOR_PHONE.CTFNO_CNT == 3) {
                                    $(".input_auth").hide()
                                }
                                $("#ctfNoRfw").hide();
                                $("#certPhoneForm").hide();
                                ENV.FOR_PHONE.ctfSmsTimeoutChk = ENV.FOR_PHONE.ctfSmsTimeout;
                                if (ENV.FOR_PHONE.ctfTimer != null) {
                                    clearInterval(ENV.FOR_PHONE.ctfTimer)
                                }
                                ENV.FOR_PHONE.ctfTimer = setInterval(function() {
                                    EVENT.FOR_PHONE.ctfClockInit()
                                }, 1000)
                            }
                        }
                        return
                    }
                },
                error: function(a, c, b) {
                    scard.showMessage(b)
                }
            })
        },
        ctfNoFw: function() {
            if (ENV.FOR_PHONE.CTFNO_CNT > 2 && ENV.FOR_PHONE.ctfSmsTimeoutChk > -1) {
                scard.showMessage("WCHPP1202");
                return
            }
            if (EVENT.FOR_PHONE.validation()) {
                $("#fi_in_rnum").val("");
                ENV.FOR_PHONE.CNT = 0;
                $("#ctfNoRfw").hide();
                $("#ctfNocheck1").hide();
                var a = $("#phone_no1").val() + $("#mphNo").val().split("-").join("");
                var c = $("input[name=fn_rd_sex]:checked").val();
                var b = $("input[name=fn_rd_lofo]:checked").val();
                try {
                    if (typeof c == "undefined") {
                        c = $("#fi_rd_man").parent().find("a.check").length == 1 ? "1" : "2"
                    }
                    if (typeof b == "undefined") {
                        b = $("#local").parent().find("a.check").length == 1 ? "1" : "2"
                    }
                } catch (d) {}
                scard.ajax({
                    service: "SOAPCO0601S01",
                    data: {
                        fnm: $("#fi_in_name").val(),
                        sexC: c,
                        frnrDvC: b,
                        bryyMmD: $("#birth_day").dateVal(),
                        mphNo: a,
                        mphMno: $("#phone_no1").val(),
                        mexno: $("#mphNo").val().split("-")[0],
                        mtllno: $("#mphNo").val().split("-")[1],
                        tlccoDv: $("#fi_sl_hnum").val()
                    },
                    success: function(g, h, f) {
                        scard.log.debug(g);
                        var e = g.etxtRspC;
                        ENV.FOR_PHONE.ctfNatvC = g.ctfNatvC;
                        if (e == "P000") {
                            if (g.cralTelCtfRs == "0000") {
                                ENV.FOR_PHONE.smsSendTime = new Date();
                                $(".input_auth").show();
                                ENV.FOR_PHONE.smsTimeoutChk = ENV.FOR_PHONE.smsTimeout;
                                if (ENV.FOR_PHONE.timer != null) {
                                    clearInterval(ENV.FOR_PHONE.timer)
                                }
                                ENV.FOR_PHONE.timer = setInterval(function() {
                                    EVENT.FOR_PHONE.clockInit()
                                }, 1000);
                                $("#fi_in_rnum").attr("disabled", false);
                                $("#ctfCfmok").disabled(false);
                                ENV.FOR_PHONE.CTFNO_CNT++;
                                ENV.FOR_PHONE.CTFNO_SEND_CNT++;
                                if (ENV.FOR_PHONE.CTFNO_SEND_CNT < 3) {
                                    $("#ctfNoreq").disabled(false)
                                } else {
                                    $("#ctfNoreq").disabled(true)
                                }
                                scard.showMessage("ICOAP0008")
                            } else {
                                scard.showMessage("ECOAP0010")
                            }
                        } else {
                            scard.showMessage("ECOAP0010");
                            return
                        }
                    },
                    error: function(e, g, f) {
                        scard.showMessage(f)
                    }
                })
            }
        },
        clockInit: function() {
            ENV.FOR_PHONE.smsTimeoutChk = ENV.FOR_PHONE.smsTimeout - parseInt((new Date() - ENV.FOR_PHONE.smsSendTime) / 1000);
            var a = parseInt(ENV.FOR_PHONE.smsTimeoutChk / 60) + "분 " + parseInt(ENV.FOR_PHONE.smsTimeoutChk % 60) + "초";
            $("#timeoutArea").text(a);
            ENV.FOR_PHONE.smsTimeoutChk--;
            if (ENV.FOR_PHONE.smsTimeoutChk > -1) {
                $("#ctfCfmok").disabled(false)
            } else {
                $("#ctfNoreq").disabled(false);
                $("#ctfCfmok").disabled();
                if (ENV.FOR_PHONE.timer != null) {
                    clearInterval(ENV.FOR_PHONE.timer)
                }
                $("#ctfNoreq").text("인증번호 재발송");
                scard.showMessage("WCHPP1058")
            }
        },
        ctfClockInit: function() {
            scard.log.debug("ctfClock timer");
            ENV.FOR_PHONE.ctfSmsTimeoutChk--;
            if (ENV.FOR_PHONE.ctfSmsTimeoutChk < 0) {
                ENV.FOR_PHONE.CTFNO_CNT = 0;
                if (ENV.FOR_PHONE.ctfTimer != null) {
                    clearInterval(ENV.FOR_PHONE.ctfTimer)
                }
            }
        }
    },
    FOR_CARD: {
        validation: function() {
            var b = true;
            $(".txt_error").hide();
            if ($("#cdno").val().length < 17) {
                $("#cdnoError").show();
                if (b) {
                    UTIL.scrollFocus($("#cdno"))
                }
                b = false
            }
            var a = $("#cdno").val();
            if ($("input[name=cardbrand]:checked").val() === "1" && a.length != 19) {
                $("#cdnoError").show();
                if (b) {
                    UTIL.scrollFocus($("#cdno"))
                }
                b = false
            }
            if ($("input[name=cardbrand]:checked").val() === "2" && a.length != 17) {
                $("#cdnoError").show();
                if (b) {
                    UTIL.scrollFocus($("#cdno"))
                }
                b = false
            }
            if ($("input[name=cardbrand]:checked").val() === "1" && a.substr(0, 1) === "3") {
                $("#cdnoError1").show();
                if (b) {
                    UTIL.scrollFocus($("#cdno"))
                }
                b = false
            }
            if ($("#pswde").val().trim() == "") {
                $("#cdpswdeError").show();
                if (b) {
                    UTIL.scrollFocus($("#pswde"))
                }
                b = false
            }
            if ($("#aprsCvcNo").val().trim() == "") {
                $("#aprsCvcNoError").show();
                if (b) {
                    UTIL.scrollFocus($("#aprsCvcNo"))
                }
                b = false
            }
            if (b) {
                return EVENT.FOR_CARD.cardctf() == "00"
            }
            return b
        },
        cardctf: function() {
            var c = $("#cdno").val();
            var a = $("#pswde").val();
            var b = $("#aprsCvcNo").val();
            scard.ajax({
                service: "SOAPCO0604S01",
                encForm: "npPfs",
                data: {
                    svo: {
                        cdno: c,
                        aprsCvcNo: b,
                        pswde: a
                    }
                },
                success: function(e, f, d) {
                    scard.log.debug(JSON.stringify(e));
                    EVENT.checkUser()
                },
                error: function(d, f, e) {
                    scard.log.debug(e);
                    scard.showMessage(e)
                }
            })
        }
    }
};
$(document).ready(function() {
    EVENT.init();
    EVENT.initScr("00");
    $("input[name='radio1']").on("click", function() {
        var a = $(this).val();
        if (a != ENV.currentRadio) {
            ENV.currentRadio = a;
            EVENT.initScr("00")
        }
    });
    $(".certify_card").on("change", ":radio#card, :radio#amex", function() {
        var a = this.id === "card" ? "card" : "amexcard";
        $("#cdno").val("").data("format", a).prop("maxlength", a === "card" ? 19 : 17).module("formatter").update()
    })
});
var _ipin_login_url = "https://ipin.ok-name.co.kr/tis/ti/POTI01A_LoginRP.jsp";

function IPinSubmit() {
    if (UTIL.getDiveceOS() == "I") {
        scui.util.openPopup("/oap/join/UOAPMJ0106P0.jsp", 450, 550, {
            name: "UOAPMJ0106P0",
            scrollbars: "yes",
            resizable: "no",
            align: "center"
        })
    } else {
        var a = window.open("", "kcbPop", "left=200, top=100, status=0, width=450, height=550");
        scard.ajax({
            service: "SOAPMJ0108S01",
            success: function(d, e, c) {
                scard.log.debug(JSON.stringify(d));
                $("body").append($("<form/>", {
                    target: "kcbPop",
                    name: "kcbInForm",
                    id: "kcbInForm",
                    method: "post",
                    action: scard.decodeXss(d.ipinCtfAkEncr.ipinLgnUrl)
                }));
                var b = location.protocol + "//" + location.host;
                $("#kcbInForm").append($("<input/>", {
                    type: "hidden",
                    name: "IDPCODE",
                    id: "IDPCODE",
                    value: scard.decodeXss(d.ipinCtfAkEncr.ipinBurC)
                })).append($("<input/>", {
                    type: "hidden",
                    name: "IDPURL",
                    value: scard.decodeXss(d.ipinCtfAkEncr.ipinBurUrl)
                })).append($("<input/>", {
                    type: "hidden",
                    name: "CPCODE",
                    value: scard.decodeXss(d.ipinCtfAkEncr.ipinMbcoId)
                })).append($("<input/>", {
                    type: "hidden",
                    name: "CPREQUESTNUM",
                    value: scard.decodeXss(d.ipinCtfAkEncr.ipinBurAkNo)
                })).append($("<input/>", {
                    type: "hidden",
                    name: "RETURNURL",
                    value: b + scard.decodeXss(d.ipinCtfAkEncr.ipinRtrnUrl)
                })).append($("<input/>", {
                    type: "hidden",
                    name: "WEBPUBKEY",
                    value: scard.decodeXss(d.ipinCtfAkEncr.ipinMpblKey)
                })).append($("<input/>", {
                    type: "hidden",
                    name: "WEBSIGNATURE",
                    value: scard.decodeXss(d.ipinCtfAkEncr.ipinCtf)
                })).append($("<input/>", {
                    type: "hidden",
                    name: "MODULETYPE",
                    value: scard.decodeXss(d.ipinCtfAkEncr.ipinModKnd)
                }));
                $("#kcbInForm").submit()
            },
            error: function(b, d, c) {
                window.setTimeout(function() {
                    window.ipin.errorFn();
                    a.close()
                }, 500)
            }
        })
    }
}
window.ipin = {
    successFn: function(a) {
        scard.log.debug("정상 : " + JSON.stringify(a));
        scard.ajax({
            service: "SOAPCO0607S01",
            data: {
                fnm: a.name,
                ciNo: scard.decodeXss(a.cino),
                sexC: a.gender,
                bryyMmD: a.bird,
                ipinCtfYn: "Y"
            },
            success: function(c, d, b) {
                scard.log.debug(c);
                EVENT.checkUser()
            },
            error: function(b, d, c) {
                scard.log.debug("실패");
                scard.log.debug(c);
                scard.showMessage(c)
            }
        })
    },
    errorFn: function() {
        scard.log.debug("error");
        scard.showMessage("ECHPP0018")
    }
};
