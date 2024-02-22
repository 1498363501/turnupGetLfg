<template>
    <div>
        <h2 style="text-align: center;margin: 20px ">导入token搜索要攻击的club信息和自动打架功能</h2>
        <div class="input-container" style="margin: 10px">
            <input type="text" class="inputWidth" placeholder="你的token" v-model="token">
<!--            <button class="custom-button" @click="selectFight()">查看拥有的club等级信息</button>-->
            <button class="custom-button" @click="lootLogInfo">查看攻击记录</button>
            <button class="custom-button" @click="goBack()">返回首页</button>
        </div>
        <!--日志弹出框-->
        <el-dialog :visible.sync="showLogInfo" title="打架记录">
            <h2>攻击的Club信息</h2>
            <table>
                <tr>
                    <th>序号</th>
                    <th>攻击对象名称</th>
                    <th>攻击对象购买钥匙ID</th>
                    <th>攻击对象userId</th>
                    <th>攻击对象power</th>
                    <th>攻击是否成功</th>
                    <th>掠夺币的总数量</th>
                    <th>我获取到的数量</th>
                    <th>我目前总的攻击积分</th>
                </tr>
                <tbody>
                <tr v-for="(item,index) in lootLogList" :key="item.id">
                    <td>{{ index+1 }}</td>
                    <td>{{ item.tarProfile.accountName }}</td>
                    <td>{{ item.tarProfile.displayName }}</td>
                    <td>{{ item.tarUserId }}</td>
                    <td>{{ item.tarPower }}</td>
                    <td v-if="item.succ===true">
                        掠夺成功
                    </td>
                    <td v-else>
                        掠夺失败
                    </td>
                    <td><img src="../assets/img/coin.jpg" alt='硬币' class='icon'>{{ item.lootCoin }}</td>
                    <td><img src="../assets/img/coin.jpg" alt='硬币' class='icon'>{{ item.selfTakeCoin }}</td>
                    <td><img src="../assets/img/battle.jpg" alt='攻击积分' class='icon'>{{ item.battlePoint }}</td>
                </tr>
                </tbody>
            </table>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "AutoFighting",
        data() {
            return {
                token: '',
                showLogInfo: false,
                lootLogList: [],
            }
        },
        created() {
        },
        methods: {
            //返回首页
            goBack(){
                //页面跳转
                this.$router.push({ path: '/lfgMint' });
            },
            //打架日志
            async lootLogInfo(){
                this.showLogInfo=true;
                const data = sessionStorage.getItem('lootLogList');
                if (data) {
                    this.lootLogList = JSON.parse(data);
                }
            },
        }
    }
</script>

<style scoped>
    /deep/ .el-dialog{
        width: 90%!important;
    }
    table {
        font-family: Arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }

    th, td {
        border: 1px solid #dddddd!important;
        text-align: left!important;
        padding: 8px!important;
        background-color: #f2f2f2;
    }

    /* 重置默认样式 */
    .input {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        width: 70px;
    }

    /* 重置默认样式 */
    .inputWidth {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        width: 500px;
    }

    /* 鼠标悬停样式 */
    input[type="text"]:hover {
        border-color: #aaa;
    }

    /* 获取焦点样式 */
    input[type="text"]:focus {
        outline: none;
        border-color: #66bfff;
        box-shadow: 0 0 5px rgba(102, 191, 255, 0.5);
    }

    /* 按钮的基本样式 */
    .custom-button {
        padding: 10px 20px;
        font-size: 16px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin: 10px;
    }

    /* 按钮的悬停样式 */
    .custom-button:hover {
        background-color: #45a049;
    }

    /* 按钮的基本样式 */
    .white-button {
        padding: 10px 20px;
        font-size: 16px;
        background-color: #ff5356;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin: 10px;
    }

    /* 按钮的悬停样式 */
    .white-button:hover {
        background-color: #ff5356;
    }

    /* 按钮的基本样式 */
    .blue-button {
        padding: 10px 20px;
        font-size: 16px;
        background-color: #00b5ff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin: 10px;
    }

    /* 按钮的悬停样式 */
    .blue-button:hover {
        background-color: #00b5ff;
    }

    /* 按钮的基本样式 */
    .purple-button {
        padding: 10px 20px;
        font-size: 16px;
        background-color: #72348d;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin: 10px;
    }

    /* 按钮的悬停样式 */
    .purple-button:hover {
        background-color: #72348d;
    }

    /* 禁用按钮的样式 */
    button:disabled {
        background-color: #cccccc; /* 灰色背景 */
        color: #666666; /* 深灰色文本 */
        cursor: not-allowed; /* 非法操作鼠标样式 */
    }

    /* 样式化图片 */
    .icon {
        width: 30px;
        height: 30px;
        vertical-align: middle; /* 让图片和文本垂直居中对齐 */
        margin-right: 5px; /* 调整文本和图片之间的间距 */
    }

    /* 重置默认样式 */
    .lootInputWidth {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        width: 500px;
    }
</style>
