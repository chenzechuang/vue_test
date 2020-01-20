<template>
    <div class="login_container">
        <div class="login_header">
            <p class="header_title">智能审讯系统</p>
            <img class="header_embled" :src="embled" alt="" />
        </div>
        <div class="login_content">
            <div class="login_form">
                <p class="form_title">用户登录</p>
                <el-form
                    :model="ruleForm"
                    status-icon
                    :rules="rules"
                    ref="ruleForm"
                    class="form_container"
                >
                    <el-form-item prop="username">
                        <el-input v-model="ruleForm.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            type="password"
                            v-model="ruleForm.password"
                            autocomplete="off"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="captcha">
                        <el-input
                            type="captcha"
                            v-model="ruleForm.captcha"
                            autocomplete="off"
                        ></el-input>
                        <div class="captcha_img">
                            <img v-show="captchaCodeImg" :src="captchaCodeImg" />
                            <div class="change_img" @click="getCaptchaCode">
                                <p>看不清</p>
                                <p>换一张</p>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            :loading="loading"
                            type="primary"
                            @click.native.prevent="handleLogin"
                            >登录</el-button
                        >
                    </el-form-item>
                </el-form>
                <!--    <div class="other_login_type">
                    <div class="login_type">
                        <div class="login_type_img"></div>
                        <div class="login_type_name">人脸登陆</div>
                    </div>
                    <div class="login_type">
                        <div class="login_type_img"></div>
                        <div class="login_type_name">数字证书登陆</div>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import { getCaptchas } from "@/api/login";
export default {
    data() {
        var checkName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("请输入用户帐号!"));
            }
            setTimeout(() => {
                callback();
            }, 1000);
        };
        var validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else {
                callback();
            }
        };
        var checkCaptcha = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入验证码"));
            } else {
                callback();
            }
        }
        return {
            embled: require("../../images/emblem.png"),
            captchaCodeImg: '',
            redirect: "",
            loading: false,
            ruleForm: {
                password: "",
                username: "",
                captcha: ""
            },
            rules: {
                username: [{ validator: checkName, trigger: "blur" }],
                password: [{ validator: validatePass, trigger: "blur" }],
                captcha: [{ validator: checkCaptcha, trigger: "blur" }]
            }
        };
    },
    methods: {
        handleLogin() {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    this.loading = true;
                    this.$store.dispatch("LoginByUserName", this.ruleForm)
                        .then(() => {
                            this.loading = false;
                            this.$router.push({ path: this.redirect || "/" });
                        })
                        .catch(() => {
                            this.loading = false;
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        getCaptchaCode() {
            new Promise((resolve) => {
                getCaptchas().then(res => {
                    this.captchaCodeImg = res.code
                    resolve();
                })
            })
        }
    },
    created(){
        this.getCaptchaCode()
    },
    watch: {
        $route: {
            handler: function(route) {
                this.redirect = route.query && route.query.redirect;
            },
            immediate: true
        }
    }
};
</script>

<style lang="scss">
.login_container {
    background: url(../../images/login_bg.png) center / cover no-repeat;
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
    .login_header {
        .header_title {
            font-size: 40px;
            color: #fff;
            font-weight: 600;
            text-align: center;
            letter-spacing: 5px;
            margin: 0;
        }
        .header_embled {
            width: 480px;
            display: block;
            margin: 15px 0;
        }
    }
    .login_content {
        width: 890px;
        height: 380px;
        margin: 0 auto;
        background: url(../../images/form_bg.png) center / cover no-repeat;
        .login_form {
            width: 320px;
            margin: 0 auto;
            padding: 0 40px 0 30px;
            box-sizing: border-box;
            .form_title {
                width: 100%;
                color: #12e5ff;
                text-align: center;
                font-size: 16px;
                font-weight: 700;
                margin-top: 50px;
                letter-spacing: 5px;
                margin-bottom: 10px;
            }
            .el-form {
                .el-form-item {
                    margin-bottom: 18px;
                    &:first-of-type {
                        background: url(../../images/user_input_bg.png) center / contain no-repeat;
                    }
                    &:nth-of-type(2) {
                        background: url(../../images/pass_input_bg.png) center / contain no-repeat;
                    }
                    .el-button {
                        width: 100%;
                    }
                    input {
                        background: transparent;
                        border: 0 none;
                        padding-left: 45px;
                        color: #fff;
                    }
                }
            }
            .other_login_type {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 15px;
                .login_type {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    width: 50%;
                    .login_type_img {
                        width: 70px;
                        height: 70px;
                        border-radius: 50%;
                        cursor: pointer;
                        &:first-of-type {
                            background: url(../../images/face_login.png) center / contain no-repeat;
                            &:hover {
                                background: url(../../images/face_login_active.png) center / contain
                                    no-repeat;
                            }
                        }
                        &:nth-of-type(2) {
                            background: url(../../images/certificate_login.png) center / contain
                                no-repeat;
                            &:hover {
                                background: url(../../images/certificate_login_active.png) center /
                                    contain no-repeat;
                            }
                        }
                    }
                    .login_type_name {
                        color: #fff;
                        font-size: 14px;
                        margin-top: 10px;
                    }
                }
            }
        }
    }
}
</style>
