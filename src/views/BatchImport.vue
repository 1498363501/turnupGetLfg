<template>
    <div>
        <h2 style="text-align: center;margin: 20px ">批量导入token获取个人信息和提币功能</h2>
        <div class="demo-image__preview">
            <h4>使用说明和相关解释：1.按照下图的格式输入的;下面图片可以点击图片放大</h4>
            <div class="image-container">
                <el-image
                    style="width: 400px; height: 240px;align-items: center"
                    class="centered-image"
                    :src="url"
                    :preview-src-list="srcList">
                </el-image>
            </div>
        </div>
        <div class="input-container">
            <textarea
                    v-model="inputValue"
                    placeholder="在这里输入多行token数值，使用分号;分隔"
                    class="custom-textarea"
            ></textarea>
        </div>
        <div class="button-container">
            <button @click="handleInput" class="custom-button">获取个人信息</button>
            <button @click="oreFriendtrade_takecoin" class="custom-button">一键提币</button>
            <button @click="oreFriendtrade_takecoin" class="custom-button">自动提币</button>
            <button @click="oreBooster" class="custom-button">一键使用Booster翻倍卡</button>
            <button @click="oreAutoBooster" class="custom-button">一键自动使用Booster翻倍卡</button>
        </div>
        <table>
            <tr>
                <th>名称</th>
                <th>购买钥匙ID</th>
                <th>等级</th>
                <th>Power</th>
                <th>LFG代币数量</th>
                <th>矿池LFG代币数量</th>
                <th>UP数量</th>
                <th>马蹄数量</th>
                <th>操作功能</th>
            </tr>
            <tbody>
            <tr v-for="item in userInfoList" :key="item.id">
                <td>{{item.displayName}}</td>
                <td>{{item.accountName}}</td>
                <td>
                    <span v-if="item.tierId=== 1"><img src="../assets/img/1.jpg" alt='1级' class='icon'></span>
                    <span v-else-if="item.tierId=== 2"><img src="../assets/img/2.jpg" alt='2级' class='icon'></span>
                    <span v-else-if="item.tierId=== 3"><img src="../assets/img/3.jpg" alt='3级' class='icon'></span>
                    <span v-else-if="item.tierId=== 4"><img src="../assets/img/4.jpg" alt='4级' class='icon'></span>
                    <span v-else-if="item.tierId=== 5"><img src="../assets/img/5.jpg" alt='5级' class='icon'></span>
                    <span v-else-if="item.tierId=== 6"><img src="../assets/img/6.jpg" alt='6级' class='icon'></span>
                    <span v-else-if="item.tierId=== 7"><img src="../assets/img/7.jpg" alt='7级' class='icon'></span>
                    <span v-else-if="item.tierId=== 8"><img src="../assets/img/8.jpg" alt='8级' class='icon'></span>
                    <span v-else-if="item.tierId=== 9"><img src="../assets/img/9.jpg" alt='9级' class='icon'></span>
                    <span v-else-if="item.tierId=== 10"><img src="../assets/img/10.jpg" alt='10级' class='icon'></span>
                    <span v-else-if="item.tierId=== 11"><img src="../assets/img/11.jpg" alt='11级' class='icon'></span>
                    <span v-else-if="item.tierId=== 12"><img src="../assets/img/12.jpg" alt='12级' class='icon'></span>
                    <span v-else-if="item.tierId=== 13"><img src="../assets/img/13.jpg" alt='13级' class='icon'></span>
                </td>
                <td>{{ item.power }}</td>
                <td><img src="../assets/img/lfg.jpg" alt='lfg背包' class='icon'>{{ item.vCoin }}</td>
                <td><img src="../assets/img/lfg.jpg" alt='lfg矿池' class='icon'>{{ item.claimCoin }}</td>
                <td><img src="../assets/img/up.jpg" alt='up' class='icon'>{{ item.points }}</td>
                <td><img src="../assets/img/matic.jpg" alt='马蹄' class='icon'>{{ item.balance }}</td>
                <td>
                    <button class="custom-button" @click="booster(item.token)">Booster翻倍卡使用—X{{item.multiplyCardNum}}</button>
                    <button class="custom-button" @click="autoBooster(item.token)">Booster翻倍卡自动使用—X{{item.multiplyCardNum}}</button>
                    <button class="custom-button" @click="friendtrade_takecoin(item.token)">提币</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import token from '../assets/img/token.jpg';
    export default {
        name: "BatchImport",
        data() {
            return {
                url: token,
                srcList: [
                    token
                ],
                userInfoList: [],
                userInfoArray: [],
                tokenList: [],
                inputValue: '',
                seconds: '',
                timeMap: new Map()
            }
        },
        created() {
            this.tokenList=[];
            this.userInfoList=[];
        },
        methods: {
            //获取个人信息
            userInfo() {
                this.userInfoList=[];
                this.tokenList.forEach(token=>{
                    fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/userinfo', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            token: token,
                            userId: 0
                        })
                    })
                        .then(response => response.json())
                        .then(res => {
                            const userInfo = res.data;
                            this.updateUserInfoList(userInfo, token);
                        });
                });
            },
            updateUserInfoList(userInfo, token) {
                if (userInfo.platformData.platformMap[1] === undefined) {
                    this.userInfoList.push({
                        userId: userInfo.userId,
                        token: token,
                        multiplyCardNum: userInfo.selfData.multiplyCardNum,
                        displayName: userInfo.platformData.defaultName,
                        accountName: userInfo.platformData.defaultName,
                        tierId: userInfo.selfData.tierId,
                        power: userInfo.selfData.power,
                        vCoin: userInfo.selfData.vCoin,
                        claimCoin: userInfo.selfData.claimCoin,
                        points: userInfo.selfData.points,
                        balance: userInfo.selfData.balance.substring(0, 7),
                    });
                } else {
                    this.userInfoList.push({
                        userId: userInfo.userId,
                        token: token,
                        multiplyCardNum: userInfo.selfData.multiplyCardNum,
                        displayName: userInfo.platformData.platformMap[1].displayName,
                        accountName: userInfo.platformData.platformMap[1].accountName,
                        tierId: userInfo.selfData.tierId,
                        power: userInfo.selfData.power,
                        vCoin: userInfo.selfData.vCoin,
                        claimCoin: userInfo.selfData.claimCoin,
                        points: userInfo.selfData.points,
                        balance: userInfo.selfData.balance.substring(0, 7),
                    });
                }
                console.log("个人集合信息", this.userInfoList);
            },
            //booster翻倍卡
            booster(token){
                fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_boost_claimcoin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        token: token,
                    })
                }).then(response => response.json())
                    .then(data => {
                        this.userInfo() // booster翻倍卡完成更新个人信息
                    });
            },
            //自动使用booster翻倍卡
            autoBooster(token){
                fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_boost_claimcoin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        token: token,
                    })
                }).then(response => response.json())
                    .then(data => {
                        this.userInfo() // booster翻倍卡完成更新个人信息
                    });
                setInterval(() => {
                    fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_boost_claimcoin', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            token: token,
                        })
                    }).then(response => response.json())
                        .then(data => {
                            this.userInfo() // booster翻倍卡完成更新个人信息
                        });
                },(8*60 * 60 * 1000)+2000);
            },
            //一键提取个人lfg代币
            oreFriendtrade_takecoin() {
                this.tokenList.forEach(token=>{
                    fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_takecoin', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            token: token,
                        })
                    }).then(response => response.json())
                        .then(data => {
                        });
                })
                setTimeout(this.userInfo(),4000) // 提币完成更新个人信息
            },
            //自动提取个人lfg代币
            auto_takecoin() {
                //一键提取个人lfg代币
                this.oreFriendtrade_takecoin();
                setInterval(() => {
                    this.tokenList.forEach(token=>{
                        fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_takecoin', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                token: token,
                            })
                        }).then(response => response.json())
                            .then(data => {
                            });
                    })
                    setTimeout(this.userInfo(),4000) // 提币完成更新个人信息
                },(60 * 60 * 1000)+2000);
            },
            //一键使用Booster翻倍卡
            oreBooster() {
                this.tokenList.forEach(token=>{
                    fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_boost_claimcoin', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            token: token,
                        })
                    }).then(response => response.json())
                        .then(data => {
                        });
                })
                setTimeout(this.userInfo(),4000) // 提币完成更新个人信息
            },
            //一键自动使用Booster翻倍卡
            oreAutoBooster() {
                this.oreBooster();
                setInterval(() => {
                    this.tokenList.forEach(token=>{
                        fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_takecoin', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                token: token,
                            })
                        }).then(response => response.json())
                            .then(data => {
                            });
                    })
                    setTimeout(this.userInfo(),4000) // 提币完成更新个人信息
                },(8 * 60 * 60 * 1000)+2000);
            },
            //提取个人lfg代币
            friendtrade_takecoin(token) {
                fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_takecoin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        token: token,
                    })
                }).then(response => response.json())
                    .then(data => {
                        this.userInfo() // 提币完成更新个人信息
                    });
            },
            handleInput() {
                this.tokenList=[];
                this.userInfoList=[];
                const outputArray = this.inputValue.split(';').map(item => item.trim()).filter(item => item !== '');
                this.tokenList = outputArray;
                this.userInfo();
            }
        }
    }
</script>

<style scoped>
    .input-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #f4f4f4;
    }
    .button-container {
        flex-direction: column;
        text-align: center;
        background-color: #f4f4f4;
        padding: 20px;
        border-bottom: 1px solid #ccc;
        border-radius: 5px;
    }
    .image-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 20vh; /* 可视区域的高度 */
        margin: 10px;
    }

    .centered-image {
        max-width: 100%; /* 图像最大宽度为容器宽度 */
        max-height: 100%; /* 图像最大高度为容器高度 */
        object-fit: contain; /* 图像适应容器，并保持其原始纵横比 */
    }

    .custom-textarea {
        width: 1200px;
        height: 150px;
        margin-bottom: 10px;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #999;
        border-radius: 5px;
        resize: none;
    }

    .custom-button {
        padding: 10px 20px;
        font-size: 16px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        background-color: #007bff;
        color: #fff;
        transition: background-color 0.3s;
    }

    .custom-button:hover {
        background-color: #0056b3;
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
</style>
