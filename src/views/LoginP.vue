<template>
    <div class="login" @keydown.enter="login">
        <div class="login-con">
            <el-card>
                <div slot="header">
                    <span>欢迎访问</span>
                </div>
                <el-form ref="loginForm" :model="user" :rules="rules">
                    <el-form-item prop="phone">
                        <el-input v-model="user.phone" placeholder="请输入账号" size="medium">
                            <template slot="prepend">账号</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="user.password" placeholder="请输入密码" size="medium" show-password>
                            <template slot="prepend">密码</template>
                        </el-input>
                    </el-form-item>
                    <el-button :loading="loading" size="medium" style="width: 100%" type="primary" @click="login">
                        登录
                    </el-button>
                </el-form>
                <div style="padding: 15px 0 0 15px;overflow:hidden;">
                    <el-button size="small" style="float: right;" @click="dialogVisible = true">忘记密码</el-button>
                </div>
            </el-card>
        </div>
        <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible" title="找回密码" width="460px"
            @close="dialogClose">
            <el-form ref="findPasswordForm" :model="findPassword" :rules="findPasswordRules" size="small">
                <el-form-item prop="mobile">
                    <el-input v-model="findPassword.mobile" placeholder="请输入">
                        <template slot="prepend">手机号</template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input v-model="findPassword.code" placeholder="请输入" style="width: 280px">
                        <template slot="prepend">验证码</template>
                    </el-input>
                    <el-button :disabled="sendMsgBtnDisabled" :loading="sendMsgBtnLoading" size="mini"
                        style="margin-left: 5px" type="success" @click="sendMsg">
                        {{ sendMsgBtnText }}
                    </el-button>
                </el-form-item>
                <el-form-item prop="newPassword">
                    <el-input v-model="findPassword.newPassword" placeholder="请输入" type="password">
                        <template slot="prepend">新密码</template>
                    </el-input>
                </el-form-item>
                <el-button :loading="loading" size="small" style="width: 100%" type="primary" @click="nextStep">
                    提交
                </el-button>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import loginUtil from "../utils/loginUtil";
import { login } from "@/api/login"
import { register } from "@/api/login";
import Cookie from 'js-cookie';
export default {
    data() {
        //const isDev = process.env.NODE_ENV === "development";
        return {
            dialogVisible: false,
            countdownSeconds: 60,
            sendMsgBtnDisabled: false,
            sendMsgBtnText: "发送短信",
            sendMsgBtnLoading: false,
            user: {
                name: "10101010101",
                password: "a123456",
                group: ""
            },
            loger: {
                userId : "",
                password: ""
            },
            findPassword: {
                phone: "",
                mobile: "",
                code: "",
                newPassword: "",
            },
            rules: {
                phone: { required: true, message: "手机号不能为空", trigger: "blur" },
                password: { required: true, message: "密码不能为空", trigger: "blur" },
            },
            findPasswordRules: {
                phone: { required: true, message: "不能为空", trigger: "blur" },
                mobile: { required: true, message: "不能为空", trigger: "blur" },
                code: { required: true, message: "不能为空", trigger: "blur" },
                newPassword: {
                    required: true,
                    min: 6,
                    max: 25,
                    message: "不能为空",
                    trigger: "blur",
                },
            },
            loading: false,
        };
    },
    methods: {
        login() {
            var user = this.user
            var loger = this.loger
            // 后端获取token
            // const token = "iamatoken";
            loger.userId = register(user)
            loger.password = user.password
            const token = login(loger)
            console.log(token)

            // 存入cookie / 存入localstorage
            Cookie.set('token', token)

            this.$router.push('\home')



            // this.$refs.loginForm.validate(valid => {
            //     if (valid) {
            //         let params = {
            //             phone: this.user.phone,
            //             password: this.user.password,
            //             platform: "web",
            //         };
            //         this.loading = true;
            //         this.$http
            //             .get("account/login", params)
            //             .then(res => {
            //                 this.loading = false;
            //                 loginUtil.login(res.data);
            //                 this.$router.push({ path: "/" });
            //             })
            //             .catch(() => {
            //                 this.loading = false;
            //             });
            //     }
            // });
        },
        countdown() {
            if (this.countdownSeconds === 0) {
                this.sendMsgBtnDisabled = false;
                this.sendMsgBtnText = "发送短信";
                this.countdownSeconds = 60;
            } else {
                this.sendMsgBtnDisabled = true;
                this.sendMsgBtnText = "重新发送" + this.countdownSeconds + "s";
                this.countdownSeconds--;
                setTimeout(() => {
                    this.countdown();
                }, 1000);
            }
        },
        sendMsg() {
            this.findPasswordRules.code.required = false;
            this.findPasswordRules.newPassword.required = false;
            this.$refs.findPasswordForm.validate(valid => {
                if (valid) {
                    this.sendMsgBtnLoading = true;
                    let params = {
                        mobile: this.findPassword.mobile,
                    };
                    this.$http
                        .get("account/sendMsg", params)
                        .then(() => {
                            this.countdown();
                            this.$message.success("短信发送成功");
                            this.sendMsgBtnLoading = false;
                        })
                        .catch(() => {
                            this.sendMsgBtnLoading = false;
                        });
                }
            });
        },
        nextStep() {
            this.findPasswordRules.code.required = true;
            this.findPasswordRules.newPassword.required = true;
            this.$refs.findPasswordForm.validate(valid => {
                if (valid) {
                    let params = {
                        mobile: this.findPassword.mobile,
                        code: this.findPassword.code,
                        newPassword: this.findPassword.newPassword,
                    };
                    this.$http
                        .get("account/forgotPassword", params)
                        .then(() => {
                            this.$message.success("密码修改成功");
                            this.dialogVisible = false;
                        })
                        .catch(error => {
                            if (error.response) {
                                this.$message.error("密码修改失败," + error.response.data.message);
                            }
                        });
                }
            });
        },
        dialogClose() {
            this.$refs.findPasswordForm.resetFields();
            this.sendMsgBtnLoading = false;
        },
        gotoDownloadApp() {
            window.location.href = window.config.serverUrl + "appUpdates/download";
        },
    },
};
</script>

<style lang="less" scoped>
.login {

    background: transparent;
    .login-con {
        width: 400px;
    border: 1px solid #eaeaea;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    border-radius: 15px;

    box-shadow: 0 0 25px #cac6c6;

    background-size: cover;
    position: relative;
    }

}
</style>