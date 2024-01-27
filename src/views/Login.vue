<template>
    <div class="login_container" :style="currentShow.bgc">
        <!--登录界面-->
        <div class="login_login" v-show="isLogin">
            <div class="login_title">LFG挖矿自动化工具</div>
            <div class="titleTwo">出圈社区Club🥇</div>
            <!--登录表单-->
            <el-form
                    ref="loginFormRef"
                    :rules="loginRules"
                    :model="loginForm"
                    label-width="70px">
                <el-form-item label="用户名" prop="username" class="item">
                    <el-input
                            prefix-icon="el-icon-user"
                            placeholder="请输入用户名"
                            v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" class="item">
                    <el-input
                            prefix-icon="el-icon-lock"
                            placeholder="请输入密码"
                            v-model="loginForm.password"
                            show-password></el-input>
                </el-form-item>
                <el-form-item label="" class="item">
                    <div class="btn_button">
                        <el-button type="info" @click="resetLoginForm">清空</el-button>
                        <el-button type="primary" @click="login">登录</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Login',
    data() {
        return {
            isLogin: true,
            loginForm: {
                username: '',
                password: ''
            },
            checked: false,
            loginRules: {
                username: [
                    { required: true, message: "请输入用户名", trigger: "blur" },
                    { min: 2, max: 12, message: "长度在 2 到 12 个字符", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    { min: 3, max: 20, message: "密码为 3~20 位", trigger: "blur" }
                ]
            },
            // 背景图片数据
            bgList: [
                {
                    bgc: {
                        background: 'url(' + require('../assets/img/banner_slide_01.jpg') + ') no-repeat center center',
                        backgroundSize: 'cover'
                    }
                },
                {
                    bgc: {
                        background: 'url(' + require('../assets/img/banner_slide_02.jpg') + ') no-repeat center center',
                        backgroundSize: 'cover'
                    }
                },
                {
                    bgc: {
                        background: 'url(' + require('../assets/img/banner_slide_03.jpg') + ') no-repeat center center',
                        backgroundSize: 'cover'
                    }
                },
                {
                    bgc: {
                        background: 'url(' + require('../assets/img/banner_slide_04.jpg') + ') no-repeat center center',
                        backgroundSize: 'cover'
                    }
                },
                {
                    bgc: {
                        background: 'url(' + require('../assets/img/banner_slide_05.jpg') + ') no-repeat center center',
                        backgroundSize: 'cover'
                    }
                }
            ],
            // 当前图片
            currentShow: {},
            bgi: 1
        }
    },
    created() {
        this.imgChange()
        sessionStorage.setItem('token', "");
        //键盘监听事件
        //页面加载完全局监听键盘事件，然后调用函数
        document.addEventListener("keyup",this.keyDown)
    },
    methods: {
        //重置表单
        resetLoginForm() {
            //充值数据，并清空校验警告
            this.$refs.loginFormRef.resetFields();
        },
        login() {
            //表单验证
            this.$refs.loginFormRef.validate((valid) => {
                if(!valid) {
                    return this.$message.error('账户密码错误，请仔细填写信息！');
                }
                if(this.loginForm.username==='turnup' && this.loginForm.password ==='lfg123'){
                    sessionStorage.setItem('token', "登录成功");
                    //页面跳转
                    this.$router.push({ path: '/lfg' });
                }else {
                    return this.$message.error('账户密码错误，请仔细填写信息！');
                }
            });
        },
        keyDown(e){
            //按键判断：e.which返回当前按键的键值，然后if判断键值是否等于13,13是回车键的键值。如果是调用登录请求
            let keyNum=e.which;
            if(keyNum==13){
                this.login()
            }
        },
        // 切换图片
        imgChange() {
            const that = this
            setInterval(function () {
                if (that.bgi >= 4) {
                    that.bgi = 0
                }
                that.currentShow = that.bgList[that.bgi]
                that.bgi++
            }, 10000)
            // 获取图片信息
        },
    },
    destroyed(){
        //页面跳转销毁全局监听事件
        document.removeEventListener("keyup",this.keyDown)
    },
}
</script>

<!-- 加上 "scoped" 该样式只在当前组件有效 -->

<style lang="less" scoped>
    .login_container {
        background: url('../assets/img/banner_slide_01.jpg') no-repeat center center;
        background-size: cover;
        height: 100%;
        width: 100%;
    }
    .el-form-item__error{
        left:20px;
    }

    /*登录框,注册框总体*/
    .login_login {
        width: 500px;
        height: 400px;
        background-color: rgba(255, 255, 255, 0.31);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 1px solid aqua;
        border-radius: 12px;
        box-shadow: 2px 2px 10px #d5fffd;
    }

    /*登录框名称*/
    .login_title {
        margin: 25px 0;
        font-size: 32px;
        text-align: center;
    }

    /*登录框名称*/
    .titleTwo {
        margin: 25px 0;
        font-size: 18px;
        text-align: center;
    }

    /*登录按钮*/
    .btn_button {
        .el-button {
            float: right;
            margin-top: 25px;
            margin-right: 125px;
        }

        &after {
            content: '';
            clear: both;
        }
    }

    .btn_button::after{
    clear: both;
    }
    .el-input {
        margin: 0 20px;
        width: 300px;
    }


    .login_register .verificationImg {
        margin-right: 70px;
    }
</style>
