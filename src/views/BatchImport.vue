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
            <button class="custom-button" @click="goBack()">返回首页</button>
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
<!--                    <button class="custom-button" @click="showDialog(item.accountName,item.token,item.userId)">挖矿</button>-->
                </td>
            </tr>
            </tbody>
        </table>
        <!-- 弹出框 -->
<!--        <el-dialog :visible.sync="dialogVisible" :title="title" >-->
<!--            <h2>管理的Club信息</h2>-->
<!--            <h4>使用说明和相关解释：</h4>-->
<!--            <h4>1、黄色的背景代表着是你拥有管理权限的CLub</h4>-->
<!--            <h4>2、自动化挖矿的是单个执行具体的某一个一直循环去挖矿、收矿、挖矿、没有能量也会自动去添加</h4>-->
<!--            <h4>3、温馨提示：自动化挖矿功能，如果关闭了页面，定时任务就会失效。就要重新执行了</h4>-->
<!--            <div style="margin: 10px">-->
<!--                <button class="custom-button" @click="oreButton()">一键收矿</button>-->
<!--                <button class="custom-button" @click="energyButton()">一键补充能量(CZ's UAE Airlift)</button>-->
<!--                <button class="white-button" @click="oneLevelTButton()">一键挖1级矿(SBF's Bahamas Buyout)</button>-->
<!--                <button class="white-button" @click="oneLevelButton()">一键挖1级矿(Sun's Club Million Bash)</button>-->
<!--                <button class="white-button" @click="twoLevelTButton()">一键挖2级矿(Exploit Arena SocialFi)</button>-->
<!--                <button class="white-button" @click="twoLevelButton()">一键挖2级矿(Bitlord Meme Coin Launch Dubai Break)</button>-->
<!--                <button class="white-button" @click="threeLevelTButton()">一键挖3级矿(Ape Fest Party with Machi)</button>-->
<!--                <button class="white-button" @click="threeLevelButton()">一键挖3级矿(SEC ETF Celebration with Gary)</button>-->
<!--                <button class="custom-button" @click="fourLevelButton()">一键挖4级矿(ZachXBT Scammer Hunt)</button>-->
<!--                <button class="custom-button" @click="fourLevelTButton()">一键挖4级矿(Caroline Date for SBF Info)</button>-->
<!--                <button class="custom-button" @click="fiveLevelTButton()">一键挖5级矿(Supercycle Study with Zhu Su)</button>-->
<!--                <button class="custom-button" @click="fiveLevelButton()">一键挖5级矿(Launch L2 Outdo Blast)</button>-->
<!--                <button class="custom-button" @click="sixLevelTButton()">一键挖6级矿(NYC Lambo Drift with Arthur)</button>-->
<!--                <button class="custom-button" @click="sixLevelButton()">一键挖6级矿(Cobie Stream Bag Dump)</button>-->
<!--                <button class="custom-button" @click="apeButton()">自动挖3级矿(Ape Fest Party with Machi)</button>-->
<!--            </div>-->
<!--            <table>-->
<!--                <tr>-->
<!--                    <th>序号</th>-->
<!--                    <th>名称</th>-->
<!--                    <th>购买钥匙ID</th>-->
<!--                    <th>管理者</th>-->
<!--                    <th>等级</th>-->
<!--                    <th>你持有key</th>-->
<!--                    <th>最高持有key</th>-->
<!--                    <th>单个钥匙购买价格/matic</th>-->
<!--                    <th>挖矿能量值</th>-->
<!--                    <th>挖矿状态</th>-->
<!--                    <th>挖矿开始时间</th>-->
<!--                    <th>挖矿结束时间</th>-->
<!--                    <th>恢复功能</th>-->
<!--                    <th>自动功能</th>-->
<!--                </tr>-->
<!--                <tbody>-->
<!--                <tr v-for="(item,index) in userList" :key="item.id"  v-if="userId === item.managerId">-->
<!--                    <td :style="{'background-color': userId === item.managerId ? '#FFF203' : ''}">{{ index+1 }}</td>-->
<!--                    <td><img src="../assets/img/king.jpg" alt='皇冠' class='icon'>{{ item.profile.displayName }}</td>-->
<!--                    <td>{{ item.profile.accountName }}</td>-->
<!--                    <td>{{ item.managerProfile.displayName}}</td>-->
<!--                    <td>-->
<!--                        <span v-if="item.tierId=== 1"><img src="../assets/img/1.jpg" alt='1级' class='icon'></span>-->
<!--                        <span v-else-if="item.tierId=== 2"><img src="../assets/img/2.jpg" alt='2级' class='icon'></span>-->
<!--                        <span v-else-if="item.tierId=== 3"><img src="../assets/img/3.jpg" alt='3级' class='icon'></span>-->
<!--                        <span v-else-if="item.tierId=== 4"><img src="../assets/img/4.jpg" alt='4级' class='icon'></span>-->
<!--                        <span v-else-if="item.tierId=== 5"><img src="../assets/img/5.jpg" alt='5级' class='icon'></span>-->
<!--                        <span v-else-if="item.tierId=== 6"><img src="../assets/img/6.jpg" alt='6级' class='icon'></span>-->
<!--                        <span v-else-if="item.tierId=== 7"><img src="../assets/img/7.jpg" alt='7级' class='icon'></span>-->
<!--                        <span v-else-if="item.tierId=== 8"><img src="../assets/img/8.jpg" alt='8级' class='icon'></span>-->
<!--                        <span v-else-if="item.tierId=== 9"><img src="../assets/img/9.jpg" alt='9级' class='icon'></span>-->
<!--                        <span v-else-if="item.tierId=== 10"><img src="../assets/img/10.jpg" alt='10级' class='icon'></span>-->
<!--                        <span v-else-if="item.tierId=== 11"><img src="../assets/img/11.jpg" alt='11级' class='icon'></span>-->
<!--                        <span v-else-if="item.tierId=== 12"><img src="../assets/img/12.jpg" alt='12级' class='icon'></span>-->
<!--                        <span v-else-if="item.tierId=== 13"><img src="../assets/img/13.jpg" alt='13级' class='icon'></span>-->
<!--                    </td>-->
<!--                    <td>{{ item.holdingNum }}</td>-->
<!--                    <td>{{ item.managerOwnKeyNum }}</td>-->
<!--                    <td><img src="../assets/img/matic.jpg" alt='马蹄' class='icon'>{{ item.buyPrice.substring(0, 7) }}</td>-->
<!--                    <td><img src="../assets/img/energy.jpg" alt='能量' class='icon'>{{ item.energy }}</td>-->
<!--                    <td v-if="userId === item.managerId">-->
<!--                        <span v-if="item.workId === 0 && item.selfWorkProfit === 0">待挖矿</span>-->
<!--                        <span v-else-if="item.workId === 0 && item.selfWorkProfit > 0">待领取币</span>-->
<!--                        <span v-else-if="item.workId === 2">恢复能量中...</span>-->
<!--                        <span v-else-if="item.workId === 1 || item.workId === 3">挖1级矿中...</span>-->
<!--                        <span v-else-if="item.workId === 4 || item.workId === 5">挖2级矿中...</span>-->
<!--                        <span v-else-if="item.workId === 6 || item.workId === 7">挖3级矿中...</span>-->
<!--                        <span v-else-if="item.workId === 8 || item.workId === 9">挖4级矿中...</span>-->
<!--                        <span v-else-if="item.workId === 10 || item.workId === 11">挖5级矿中...</span>-->
<!--                        <span v-else-if="item.workId === 12 || item.workId === 13">挖6级矿中...</span>-->
<!--                        <span v-else-if="item.workId === 14 || item.workId === 15">挖7级矿中...</span>-->
<!--                        <span v-else-if="item.workId === 16">挖8级矿中...</span>-->
<!--                        <span v-else-if="item.workId === 17">挖9级矿中...</span>-->
<!--                        <span v-else-if="item.workId === 18">挖10级矿中...</span>-->
<!--                        <span v-else-if="item.workId === 19">挖11级矿中...</span>-->
<!--                        <span v-else-if="item.workId === 20">挖12级矿中...</span>-->
<!--                        <span v-else>挖矿中...</span>-->
<!--                    </td>-->
<!--                    <td v-else></td>-->
<!--                    <td v-if="userId === item.managerId">-->
<!--                        {{formatTime(item.workStartTimestamp)}}-->
<!--                    </td>-->
<!--                    <td v-else></td>-->
<!--                    <td v-if="userId === item.managerId">-->
<!--                        {{formatTime(item.workEndTimestamp)}}-->
<!--                    </td>-->
<!--                    <td v-else></td>-->
<!--                    <td v-if="item.workStartTimestamp === 0 &&  userId === item.managerId">-->
<!--                        <button class="custom-button" @click="energyTButton(item)">补充能量</button>-->
<!--                    </td>-->
<!--                    <td v-else>-->
<!--                    </td>-->
<!--                    <td v-if="item.workStartTimestamp === 0 &&  userId === item.managerId" style="width: 370px">-->
<!--                        <button class="white-button" @click="automationOne(item)">自动挖1级</button>-->
<!--                        <button class="white-button" @click="automationTwo(item)">自动挖2级(EAS)</button>-->
<!--                        <button class="white-button" @click="automationTwoMint(item)">自动挖2级(BMC)</button>-->
<!--                        <button class="white-button" @click="automationThree(item)">自动挖3级(APE)</button>-->
<!--                        <button class="white-button" @click="automationThreeMint(item)">自动挖3级(SEC)</button>-->
<!--                        <button class="white-button" @click="automationFourMint(item)">自动挖4级(ZSH)</button>-->
<!--                    </td>-->
<!--                    <td v-else>-->
<!--                    </td>-->
<!--                </tr>-->
<!--                </tbody>-->
<!--            </table>-->
<!--        </el-dialog>-->
    </div>
</template>

<script>
    import token from '../assets/img/token.jpg';
    export default {
        name: "BatchImport",
        data() {
            return {
                url: token, //图片路径
                srcList: [token], //图片路径
                userList: [],
                userInfoList: [],
                userInfoArray: [],
                tokenList: [],
                inputValue: '',
                seconds: '',
                timeMap: new Map(),
                title: '',
                token: '',
                userId: '',
                dialogVisible: false,
                tableData: []
            }
        },
        created() {
            this.tokenList=[];
            this.userInfoList=[];
        },
        methods: {
            //获取个人信息
            handleInput() {
                this.tokenList=[];
                this.userInfoList=[];
                const outputArray = this.inputValue.split(';').map(item => item.trim()).filter(item => item !== '');
                this.tokenList = outputArray;
                this.userInfo();
            },
            //返回首页
            goBack(){
                //页面跳转
                this.$router.push({ path: '/lfgMint' });
            },
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

            //存储个人信息数组
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

            showDialog(e,token,userId){
                this.title=e+"的俱乐部";
                this.dialogVisible=true;
                this.token=token;
                this.userId=userId;
                this.getManagerClubInfo()
            },
            //获取管理的club信息
            getManagerClubInfo() {
                const token=this.token;
                const userId=this.userId;
                this.userIdArray=[];
                this.userList=[];
                fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/portfolio', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        token: token,
                    })
                }).then(response => response.json())
                    .then(res => {
                        this.userList=res.data.holding;
                        this.userList.forEach(e => {
                            if (userId === e.managerId) {
                                this.userIdArray.push({userId: e.userId});
                            }
                        })
                    });
            },

            // 自动收矿
            automationOreButton(userId){
                const token=this.token
                fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_takeworkcoin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        token: token,
                        employeeId: userId,
                    })
                }).then(response => response.json())
                    .then(res => {
                        this.getManagerClubInfo();
                        console.log("出圈社区Club🥇————收矿",res)
                    });
            },

            // 自动挖矿
            automationMint(userId,workId){
                const token=this.token;
                fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        emplyeeIds: [userId],
                        token: token,
                        workId: workId,
                    })
                }).then(response => response.json())
                    .then(res => {
                        console.log(res)
                    });
            },

            //自动挖1级
            automationOne(e){
                const token=this.token;
                //收矿
                this.automationOreButton(e.userId);
                //刷新管理club信息
                this.getManagerClubInfo();
                //补充能量
                setTimeout(
                    fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/portfolio', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            token: token,
                        })
                    }).then(response => response.json())
                        .then(res => {
                            res.data.holding.forEach(a => {
                                if (a.userId === e.userId) {
                                    if(a.energy<10 && e.workId!==2){
                                        this.automationMint(e.userId,2);
                                        //刷新管理club信息
                                        this.getManagerClubInfo();
                                    }
                                }
                            })
                        }), 1500);
                //挖矿
                fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        emplyeeIds: [e.userId],
                        token: token,
                        workId: 3,
                    })
                }).then(response => response.json())
                    .then(res => {
                        console.log(res,"挖1级成功")
                    });
                //挖矿
                setTimeout(this.automationMint(e.userId,3), 1500);
                setInterval(() => {
                    fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            emplyeeIds: [e.userId],
                            token: token,
                            workId: 3,
                        })
                    }).then(response => response.json())
                        .then(res => {
                            console.log(res,"挖1级成功")
                        });
                    // 循环任务
                    setTimeout(this.automationOne(e),1500);
                    setTimeout(this.getManagerClubInfo(),4000);
                },(18 * 60 * 1000)+3000);
            },

            //自动挖2级(EAS)
            automationTwo(e){
                const token=this.token;
                //收矿
                this.automationOreButton(e.userId);
                //刷新管理club信息
                this.getManagerClubInfo();
                //补充能量
                setTimeout(
                    fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/portfolio', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            token: token,
                        })
                    }).then(response => response.json())
                        .then(res => {
                            res.data.holding.forEach(a => {
                                if (a.userId === e.userId) {
                                    if(a.energy<12 && e.workId!==2){
                                        this.automationMint(e.userId,2);
                                        //刷新管理club信息
                                        this.getManagerClubInfo();
                                    }
                                }
                            })
                        }), 1500);
                //挖矿
                fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        emplyeeIds: [e.userId],
                        token: token,
                        workId: 4,
                    })
                }).then(response => response.json())
                    .then(res => {
                        console.log(res,"挖2级(EAS)成功")
                    });
                //挖矿
                setTimeout(this.automationMint(e.userId,4), 1500);
                setInterval(() => {
                    fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            emplyeeIds: [e.userId],
                            token: token,
                            workId: 4,
                        })
                    }).then(response => response.json())
                        .then(res => {
                            console.log(res,"挖2级(EAS)成功")
                        });
                    //循环任务
                    setTimeout(this.automationTwo(e),1500);
                    setTimeout(this.getManagerClubInfo(),4000);
                },(30 * 60 * 1000)+3000);
            },

            //自动挖2级(BMCL)
            automationTwoMint(e){
                const token=this.token;
                //收矿
                this.automationOreButton(e.userId);
                //刷新管理club信息
                this.getManagerClubInfo();
                //补充能量
                setTimeout(
                    fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/portfolio', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            token: token,
                        })
                    }).then(response => response.json())
                        .then(res => {
                            res.data.holding.forEach(a => {
                                if (a.userId === e.userId) {
                                    if(a.energy<15 && e.workId!==2){
                                        this.automationMint(e.userId,2);
                                        //刷新管理club信息
                                        this.getManagerClubInfo();
                                    }
                                }
                            })
                        }), 1500);
                //挖矿
                fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        emplyeeIds: [e.userId],
                        token: token,
                        workId: 5,
                    })
                }).then(response => response.json())
                    .then(res => {
                        console.log(res,"挖2级(BMCL)成功")
                    });
                //挖矿
                setTimeout(this.automationMint(e.userId,5), 1500);
                setInterval(() => {
                    fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            emplyeeIds: [e.userId],
                            token: token,
                            workId: 5,
                        })
                    }).then(response => response.json())
                        .then(res => {
                            console.log(res,"挖2级(BMCL)成功")
                        });
                    //循环任务
                    setTimeout(this.automationTwoMint(e),1500);
                    setTimeout(this.getManagerClubInfo(),4000);
                },(60 * 60 * 1000)+3000);
            },

            //自动挖3级(APE)
            automationThree(e){
                const token=this.token;
                //收矿
                this.automationOreButton(e.userId);
                //刷新管理club信息
                this.getManagerClubInfo();
                setTimeout(
                    //补充能量
                    fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/portfolio', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            token: token,
                        })
                    }).then(response => response.json())
                        .then(res => {
                            res.data.holding.forEach(a => {
                                if (a.userId === e.userId) {
                                    if(a.energy<20 && e.workId!==2){
                                        this.automationMint(e.userId,2);
                                        //刷新管理club信息
                                        this.getManagerClubInfo();
                                    }
                                }
                            })
                        }), 1500);
                //挖矿
                fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        emplyeeIds: [e.userId],
                        token: token,
                        workId: 6,
                    })
                }).then(response => response.json())
                    .then(res => {
                        console.log(res,"挖3级(APE)成功")
                    });
                //挖矿
                setTimeout(this.automationMint(e.userId,6), 1500);
                setInterval(() => {
                    fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            emplyeeIds: [e.userId],
                            token: token,
                            workId: 6,
                        })
                    }).then(response => response.json())
                        .then(res => {
                            console.log(res,"挖3级(APE)成功")
                        });
                    // 循环任务
                    setTimeout(this.automationThree(e),1500);
                    setTimeout(this.getManagerClubInfo(),4000);
                },(4 * 60 * 60 * 1000)+3000);
            },

            //自动挖3级(SEC)
            automationThreeMint(e){
                const token=this.token;
                //收矿
                this.automationOreButton(e.userId);
                //刷新管理club信息
                this.getManagerClubInfo();
                //补充能量
                setTimeout(
                    fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/portfolio', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            token: token,
                        })
                    }).then(response => response.json())
                        .then(res => {
                            res.data.holding.forEach(a => {
                                if (a.userId === e.userId) {
                                    if(a.energy<20 && e.workId!==2){
                                        this.automationMint(e.userId,2);
                                        //刷新管理club信息
                                        this.getManagerClubInfo();
                                    }
                                }
                            })
                        }),1500);
                //挖矿
                fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        emplyeeIds: [e.userId],
                        token: token,
                        workId: 7,
                    })
                }).then(response => response.json())
                    .then(res => {
                        console.log(res,"挖3级(SEC)成功")
                    });
                //挖矿
                setTimeout(this.automationMint(e.userId,7), 1500);
                setInterval(() => {
                    fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            emplyeeIds: [e.userId],
                            token: token,
                            workId: 7,
                        })
                    }).then(response => response.json())
                        .then(res => {
                            console.log(res,"挖3级(SEC)成功")
                        });
                    // 循环任务
                    setTimeout(this.automationThreeMint(e),1500);
                    setTimeout(this.getManagerClubInfo(),4000);
                },(4 * 60 * 60 * 1000)+3000);
            },

            //自动挖4级(SEC)
            automationFourMint(e){
                const token=this.token;
                //收矿
                this.automationOreButton(e.userId);
                //刷新管理club信息
                this.getManagerClubInfo();
                //补充能量
                setTimeout(
                    fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/portfolio', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            token: token,
                        })
                    }).then(response => response.json())
                        .then(res => {
                            res.data.holding.forEach(a => {
                                if (a.userId === e.userId) {
                                    if(a.energy<35 && e.workId!==2){
                                        this.automationMint(e.userId,2);
                                        //刷新管理club信息
                                        this.getManagerClubInfo();
                                    }
                                }
                            })
                        }), 1500);
                //挖矿
                fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        emplyeeIds: [e.userId],
                        token: token,
                        workId: 8,
                    })
                }).then(response => response.json())
                    .then(res => {
                        console.log(res,"挖4级(ZSH)成功")
                    });
                //挖矿
                setTimeout(this.automationMint(e.userId,8), 1500);
                setInterval(() => {
                    fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            emplyeeIds: [e.userId],
                            token: token,
                            workId: 8,
                        })
                    }).then(response => response.json())
                        .then(res => {
                            console.log(res,"挖4级(ZSH)成功")
                        });
                    // 循环任务
                    setTimeout(this.automationFourMint(e),1500);
                    setTimeout(this.getManagerClubInfo(),4000);
                },(6 * 60 * 60 * 1000)+3000);
            },

            // 一键收矿
            oreButton() {
                const token=this.token
                if (this.userIdArray != null) {
                    this.userIdArray.forEach(function (item, index, array) {
                        fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_takeworkcoin', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                token: token,
                                employeeId: item.userId,
                            })
                        }).then(response => response.json())
                            .then(res => {
                            });
                    })
                    alert("执行一键收矿成功");
                    this.getManagerClubInfo();
                }
            },

            // 一键补充能量
            energyButton() {
                const token=this.token
                let count = 0; // 计数器
                if (this.userIdArray != null) {
                    this.userIdArray.forEach(function (item, index, array) {
                        fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                workId: 2,
                                token: token,
                                emplyeeIds: [item.userId],
                            })
                        }).then(response => response.json())
                            .then(res => {
                                count++;
                            });
                    })
                    alert("执行一键补充能量成功");
                    this.getManagerClubInfo();
                }
            },

            // 一键挖1级矿
            oneLevelTButton() {
                const token=this.token
                if (this.userIdArray != null) {
                    this.userIdArray.forEach(item=> {
                        //收矿
                        fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_takeworkcoin', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                token: token,
                                employeeId: item.userId,
                            })
                        }).then(response => response.json())
                            .then(res => {
                                this.getManagerClubInfo();
                                console.log("出圈社区Club🥇————收矿",res)
                            });
                        fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                workId: 1,
                                token: token,
                                emplyeeIds: [item.userId],
                            })
                        }).then(response => response.json())
                            .then(res => {
                            });
                    })
                    alert("执行一键挖1级矿成功");
                    this.getManagerClubInfo();
                }
            },

            // 一键挖1级矿
            oneLevelButton() {
                const token=this.token
                if (this.userIdArray != null) {
                    this.userIdArray.forEach(item=> {
                        //收矿
                        fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_takeworkcoin', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                token: token,
                                employeeId: item.userId,
                            })
                        }).then(response => response.json())
                            .then(res => {
                                this.getManagerClubInfo();
                                console.log("出圈社区Club🥇————收矿",res)
                            });
                        fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                workId: 3,
                                token: token,
                                emplyeeIds: [item.userId],
                            })
                        }).then(response => response.json())
                            .then(res => {
                            });
                    });
                    alert("执行一键挖1级矿成功");
                    this.getManagerClubInfo();
                }
            },

            // 一键挖2级矿
            twoLevelTButton() {
                const token=this.token
                if (this.userIdArray != null) {
                    this.userIdArray.forEach(item=> {
                        //收矿
                        fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_takeworkcoin', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                token: token,
                                employeeId: item.userId,
                            })
                        }).then(response => response.json())
                            .then(res => {
                                this.getManagerClubInfo();
                                console.log("出圈社区Club🥇————收矿",res)
                            });
                        fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                workId: 4,
                                token: token,
                                emplyeeIds: [item.userId],
                            })
                        }).then(response => response.json())
                            .then(res => {
                            });
                    });
                    alert("执行一键挖2级矿成功");
                    this.getManagerClubInfo();
                }
            },

            // 一键挖2级矿
            twoLevelButton() {
                const token=this.token
                if (this.userIdArray != null) {
                    this.userIdArray.forEach(item=> {
                        //收矿
                        fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_takeworkcoin', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                token: token,
                                employeeId: item.userId,
                            })
                        }).then(response => response.json())
                            .then(res => {
                                this.getManagerClubInfo();
                                console.log("出圈社区Club🥇————收矿",res)
                            });
                        fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                workId: 5,
                                token: token,
                                emplyeeIds: [item.userId],
                            })
                        }).then(response => response.json())
                            .then(res => {
                            });
                    });
                    alert("执行一键挖2级矿成功");
                    this.getManagerClubInfo();
                }
            },

            // 一键挖3级矿
            threeLevelTButton() {
                const token=this.token
                if (this.userIdArray != null) {
                    this.userIdArray.forEach(item=> {
                        //收矿
                        fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_takeworkcoin', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                token: token,
                                employeeId: item.userId,
                            })
                        }).then(response => response.json())
                            .then(res => {
                                this.getManagerClubInfo();
                                console.log("出圈社区Club🥇————收矿",res)
                            });
                        fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                emplyeeIds: [item.userId],
                                token: token,
                                workId: 6,
                            })
                        }).then(response => response.json())
                            .then(res => {
                            });
                    });
                    alert("执行一键挖3级矿成功");
                    this.getManagerClubInfo();
                }
            },

            // 一键自动挖3级矿
            apeButton() {
                const token=this.token;
                if (this.userIdArray != null) {
                    this.userIdArray.forEach(item=> {
                        //收矿
                        fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_takeworkcoin', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                token: token,
                                employeeId: item.userId,
                            })
                        }).then(response => response.json())
                            .then(res => {
                                this.getManagerClubInfo();
                                console.log("出圈社区Club🥇————收矿",res)
                            });
                        fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                emplyeeIds: [item.userId],
                                token: token,
                                workId: 6,
                            })
                        }).then(response => response.json())
                            .then(res => {
                            });
                    });
                    this.getManagerClubInfo();
                }
                // 一键自动挖3级矿
                setInterval(async () => {
                    await this.apeButton();
                }, (60 * 60 * 1000)+3000); // 即每1小时执行一次
            },

            // 一键挖3级矿
            threeLevelButton() {
                const token=this.token
                if (this.userIdArray != null) {
                    this.userIdArray.forEach(item=> {
                        //收矿
                        fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_takeworkcoin', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                token: token,
                                employeeId: item.userId,
                            })
                        }).then(response => response.json())
                            .then(res => {
                                this.getManagerClubInfo();
                                console.log("出圈社区Club🥇————收矿",res)
                            });
                        fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                emplyeeIds: [item.userId],
                                token: token,
                                workId: 7,
                            })
                        }).then(response => response.json())
                            .then(res => {
                            });
                    });
                    alert("执行一键挖3级矿成功");
                    this.getManagerClubInfo();
                }
            },

            // 一键挖4级矿
            fourLevelButton() {
                const token=this.token
                if (this.userIdArray != null) {
                    this.userIdArray.forEach(item=> {
                        //收矿
                        fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_takeworkcoin', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                token: token,
                                employeeId: item.userId,
                            })
                        }).then(response => response.json())
                            .then(res => {
                                this.getManagerClubInfo();
                                console.log("出圈社区Club🥇————收矿",res)
                            });
                        fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                emplyeeIds: [item.userId],
                                workId: 8,
                                token: token,
                            })
                        }).then(response => response.json())
                            .then(res => {
                            });
                    });
                    alert("执行一键挖4级矿成功");
                    this.getManagerClubInfo();
                }
            },

            // 一键挖4级矿
            fourLevelTButton() {
                const token=this.token
                if (this.userIdArray != null) {
                    this.userIdArray.forEach(item=> {
                        //收矿
                        fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_takeworkcoin', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                token: token,
                                employeeId: item.userId,
                            })
                        }).then(response => response.json())
                            .then(res => {
                                this.getManagerClubInfo();
                                console.log("出圈社区Club🥇————收矿",res)
                            });
                        fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                emplyeeIds: [item.userId],
                                workId: 9,
                                token: token,
                            })
                        }).then(response => response.json())
                            .then(res => {
                            });
                    });
                    alert("执行一键挖4级矿成功");
                    this.getManagerClubInfo();
                }
            },

            // 一键挖5级矿
            fiveLevelTButton() {
                const token=this.token
                if (this.userIdArray != null) {
                    this.userIdArray.forEach(item=> {
                        //收矿
                        fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_takeworkcoin', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                token: token,
                                employeeId: item.userId,
                            })
                        }).then(response => response.json())
                            .then(res => {
                                this.getManagerClubInfo();
                                console.log("出圈社区Club🥇————收矿",res)
                            });
                        fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                emplyeeIds: [item.userId],
                                workId: 10,
                                token: token,
                            })
                        }).then(response => response.json())
                            .then(res => {
                            });
                    });
                    alert("执行一键挖5级矿成功");
                    this.getManagerClubInfo();
                }
            },

            // 一键挖5级矿
            fiveLevelButton() {
                const token=this.token
                if (this.userIdArray != null) {
                    this.userIdArray.forEach(item=> {
                        //收矿
                        fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_takeworkcoin', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                token: token,
                                employeeId: item.userId,
                            })
                        }).then(response => response.json())
                            .then(res => {
                                this.getManagerClubInfo();
                                console.log("出圈社区Club🥇————收矿",res)
                            });
                        fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                emplyeeIds: [item.userId],
                                workId: 11,
                                token: token,
                            })
                        }).then(response => response.json())
                            .then(res => {
                            });
                    });
                    alert("执行一键挖5级矿成功");
                    this.getManagerClubInfo();
                }
            },

            // 一键挖6级矿
            sixLevelTButton() {
                const token=this.token
                if (this.userIdArray != null) {
                    this.userIdArray.forEach(item=> {
                        //收矿
                        fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_takeworkcoin', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                token: token,
                                employeeId: item.userId,
                            })
                        }).then(response => response.json())
                            .then(res => {
                                this.getManagerClubInfo();
                                console.log("出圈社区Club🥇————收矿",res)
                            });
                        fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                emplyeeIds: [item.userId],
                                workId: 12,
                                token: token,
                            })
                        }).then(response => response.json())
                            .then(res => {
                            });
                    });
                    alert("执行一键挖6级矿成功");
                    this.getManagerClubInfo();
                }
            },

            // 一键挖6级矿
            sixLevelButton() {
                const token=this.token
                if (this.userIdArray != null) {
                    this.userIdArray.forEach(item=> {
                        //收矿
                        fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_takeworkcoin', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                token: token,
                                employeeId: item.userId,
                            })
                        }).then(response => response.json())
                            .then(res => {
                                this.getManagerClubInfo();
                                console.log("出圈社区Club🥇————收矿",res)
                            });
                        fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                emplyeeIds: [item.userId],
                                workId: 13,
                                token: token,
                            })
                        }).then(response => response.json())
                            .then(res => {
                            });
                    });
                    alert("执行一键挖6级矿成功");
                    this.getManagerClubInfo();
                }
            },

            //时间戳转换 格式化时分秒
            formatTime(timestamp) {
                if (timestamp <= 0) {
                    return "";
                }

                const date = new Date(timestamp * 1000);

                timestamp--;
                if (timestamp <= 0) {
                    return "";
                } else {
                    return `${String(date.getMonth() + 1).padStart(2, '0')}月${String(date.getDate()).padStart(2, '0')}日 ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
                }
            }
        }
    }
</script>

<style scoped>
    /deep/ .el-dialog{
        width: 90%!important;
    }
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