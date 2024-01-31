<template>
    <div>
        <h2 style="text-align: center;margin: 20px ">TURNUP</h2>
        <h2>个人信息</h2>
        <h4>使用说明和相关解释：</h4>
        <h4>1、输入自己的token，然后点击【个人信息】;【提矿池lfg币】按钮是直接把币提到lfg背包里面</h4>
        <h4>2、【一键挖矿】,看好自己的俱乐部的等级去点击对应的按钮</h4>
        <div class="input-container" style="margin: 10px">
            <input type="text" class="inputWidth" placeholder="你的token" v-model="token">
            <button class="custom-button" @click="userInfo()">个人信息</button>
            <button class="custom-button" @click="booster()">Booster翻倍卡使用————X{{multiplyCardNum}}</button>
            <button id="countdown" class="custom-button" @click="friendtrade_takecoin()" :disabled="countingDown">{{countdown}}</button>
            <button id="autoCountdown" class="custom-button" @click="auto_takecoin()">自动一键提币</button>
        </div>
        <div>
            <button class="custom-button" @click="batchTask()">批量挖矿功能</button>
            <button class="custom-button" @click="batchImport()">批量提币功能</button>
            <button class="custom-button" @click="startTaskExecution()">开始3级-5级任务自动执行</button>
            <button class="custom-button" @click="stopTaskExecution()">停止任务执行</button>
            <button class="custom-button" @click="fighting()">搜索打架</button>
            <button class="custom-button" @click="autoFighting()">自动打架</button>
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
            </tr>
            <tbody>
                <tr v-for="item in userInfoList" :key="item.id">
                    <td>
                        <span v-if="item.platformData.platformMap['1'] === undefined ">{{item.platformData.defaultName}}</span>
                        <span v-else>{{item.platformData.platformMap["1"].displayName}}</span>
                    </td>
                    <td>
                        <span v-if="item.platformData.platformMap['1'] === undefined ">{{item.platformData.defaultName}}</span>
                        <span v-else>{{item.platformData.platformMap["1"].accountName}}</span>
                    </td>
                    <td>
                        <span v-if="item.selfData.tierId=== 1"><img src="../assets/img/1.jpg" alt='1级' class='icon'></span>
                        <span v-else-if="item.selfData.tierId=== 2"><img src="../assets/img/2.jpg" alt='2级' class='icon'></span>
                        <span v-else-if="item.selfData.tierId=== 3"><img src="../assets/img/3.jpg" alt='3级' class='icon'></span>
                        <span v-else-if="item.selfData.tierId=== 4"><img src="../assets/img/4.jpg" alt='4级' class='icon'></span>
                        <span v-else-if="item.selfData.tierId=== 5"><img src="../assets/img/5.jpg" alt='5级' class='icon'></span>
                        <span v-else-if="item.selfData.tierId=== 6"><img src="../assets/img/6.jpg" alt='6级' class='icon'></span>
                        <span v-else-if="item.selfData.tierId=== 7"><img src="../assets/img/7.jpg" alt='7级' class='icon'></span>
                        <span v-else-if="item.selfData.tierId=== 8"><img src="../assets/img/8.jpg" alt='8级' class='icon'></span>
                        <span v-else-if="item.selfData.tierId=== 9"><img src="../assets/img/9.jpg" alt='9级' class='icon'></span>
                        <span v-else-if="item.selfData.tierId=== 10"><img src="../assets/img/10.jpg" alt='10级' class='icon'></span>
                        <span v-else-if="item.selfData.tierId=== 11"><img src="../assets/img/11.jpg" alt='11级' class='icon'></span>
                        <span v-else-if="item.selfData.tierId=== 12"><img src="../assets/img/12.jpg" alt='12级' class='icon'></span>
                        <span v-else-if="item.selfData.tierId=== 13"><img src="../assets/img/13.jpg" alt='13级' class='icon'></span>
                    </td>
                    <td>{{ item.selfData.power }}</td>
                    <td><img src="../assets/img/lfg.jpg" alt='lfg背包' class='icon'>{{ item.selfData.vCoin }}</td>
                    <td><img src="../assets/img/lfg.jpg" alt='lfg矿池' class='icon'>{{ item.selfData.claimCoin }}</td>
                    <td><img src="../assets/img/up.jpg" alt='up' class='icon'>{{ item.selfData.points }}</td>
                    <td><img src="../assets/img/matic.jpg" alt='马蹄' class='icon'>{{ item.selfData.balance.substring(0, 7) }}</td>
                </tr>
            </tbody>
        </table>
        <h2>管理的Club信息</h2>
        <h4>使用说明和相关解释：</h4>
        <h4>1、黄色的背景代表着是你拥有管理权限的CLub</h4>
        <h4>2、自动化挖矿的是单个执行具体的某一个一直循环去挖矿、收矿、挖矿、没有能量也会自动去添加</h4>
        <h4>3、温馨提示：自动化挖矿功能，如果关闭了页面，定时任务就会失效。就要重新执行了</h4>
        <div class="input-container" style="margin: 10px">
            <button class="custom-button" @click="oreButton()">一键收矿</button>
            <button class="custom-button" @click="energyButton()">一键补充能量(CZ's UAE Airlift)</button>
            <button class="white-button" @click="oneLevelTButton()">一键挖1级矿(SBF's Bahamas Buyout)</button>
            <button class="white-button" @click="oneLevelButton()">一键挖1级矿(Sun's Club Million Bash)</button>
            <button class="white-button" @click="twoLevelTButton()">一键挖2级矿(Exploit Arena SocialFi)</button>
            <button class="white-button" @click="twoLevelButton()">一键挖2级矿(Bitlord Meme Coin Launch Dubai Break)</button>
            <button class="white-button" @click="threeLevelTButton()">一键挖3级矿(Ape Fest Party with Machi)</button>
            <button class="white-button" @click="threeLevelButton()">一键挖3级矿(SEC ETF Celebration with Gary)</button>
            <button class="custom-button" @click="fourLevelButton()">一键挖4级矿(ZachXBT Scammer Hunt)</button>
            <button class="custom-button" @click="fourLevelTButton()">一键挖4级矿(Caroline Date for SBF Info)</button>
            <button class="custom-button" @click="fiveLevelTButton()">一键挖5级矿(Supercycle Study with Zhu Su)</button>
            <button class="custom-button" @click="fiveLevelButton()">一键挖5级矿(Launch L2 Outdo Blast)</button>
            <button class="custom-button" @click="sixLevelTButton()">一键挖6级矿(NYC Lambo Drift with Arthur)</button>
            <button class="custom-button" @click="sixLevelButton()">一键挖6级矿(Cobie Stream Bag Dump)</button>
            <button class="custom-button" @click="apeButton()">自动挖3级矿(Ape Fest Party with Machi)</button>
<!--            <button class="blue-button" @click="sevenLevelTButton()">一键挖7级矿(Swallow Do Kwon Wallet)</button>-->
<!--            <button class="blue-button" @click="sevenLevelButton()">一键挖7级矿(Opensea Insider Case Probe)</button>-->
<!--            <button class="blue-button" @click="eightLevelTButton()">一键挖8级矿(Inverse Cramer for Retirement)</button>-->
<!--            <button class="blue-button" @click="nineLevelButton()">一键挖9级矿(Saylor BTC Recovery Mission)</button>-->
<!--            <button class="purple-button" @click="tenLevelButton()">一键挖10级矿(Bukele Day Trade Growth)</button>-->
<!--            <button class="purple-button" @click="elevenLevelButton()">一键挖11级矿(Coinbase Cosmic Coin Quest)</button>-->
<!--            <button class="purple-button" @click="twelveLevelButton()">一键挖12级矿(Twitter x Solana Meme Protocol Madness)</button>-->
        </div>
        <div class="input-container" style="margin: 20px">
            <button class="custom-button" @click="userInfo()">刷新Club信息</button>
        </div>
        <table>
            <tr>
                <th>序号</th>
                <th>名称</th>
                <th>购买钥匙ID</th>
                <th>管理者</th>
                <th>等级</th>
                <th>你持有key</th>
                <th>最高持有key</th>
                <th>单个钥匙购买价格/matic</th>
                <th>挖矿能量值</th>
                <th>挖矿状态</th>
                <th>挖矿开始时间</th>
                <th>挖矿结束时间</th>
                <th>恢复功能</th>
                <th>自动功能</th>
            </tr>
            <tbody>
                <tr v-for="(item,index) in userList" :key="item.id">
                    <td :style="{'background-color': userId === item.managerId ? '#FFF203' : ''}">{{ index+1 }}</td>
                    <td><img src="../assets/img/king.jpg" alt='皇冠' class='icon'>{{ item.profile.displayName }}</td>
                    <td>{{ item.profile.accountName }}</td>
                    <td>{{ item.managerProfile.displayName}}</td>
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
                    <td>{{ item.holdingNum }}</td>
                    <td>{{ item.managerOwnKeyNum }}</td>
                    <td><img src="../assets/img/matic.jpg" alt='马蹄' class='icon'>{{ item.buyPrice.substring(0, 7) }}</td>
                    <td><img src="../assets/img/energy.jpg" alt='能量' class='icon'>{{ item.energy }}</td>
                    <td v-if="userId === item.managerId">
                        <span v-if="item.workId === 0 && item.selfWorkProfit === 0">待挖矿</span>
                        <span v-else-if="item.workId === 0 && item.selfWorkProfit > 0">待领取币</span>
                        <span v-else-if="item.workId === 2">恢复能量中...</span>
                        <span v-else-if="item.workId === 1 || item.workId === 3">挖1级矿中...</span>
                        <span v-else-if="item.workId === 4 || item.workId === 5">挖2级矿中...</span>
                        <span v-else-if="item.workId === 6 || item.workId === 7">挖3级矿中...</span>
                        <span v-else-if="item.workId === 8 || item.workId === 9">挖4级矿中...</span>
                        <span v-else-if="item.workId === 10 || item.workId === 11">挖5级矿中...</span>
                        <span v-else-if="item.workId === 12 || item.workId === 13">挖6级矿中...</span>
                        <span v-else-if="item.workId === 14 || item.workId === 15">挖7级矿中...</span>
                        <span v-else-if="item.workId === 16">挖8级矿中...</span>
                        <span v-else-if="item.workId === 17">挖9级矿中...</span>
                        <span v-else-if="item.workId === 18">挖10级矿中...</span>
                        <span v-else-if="item.workId === 19">挖11级矿中...</span>
                        <span v-else-if="item.workId === 20">挖12级矿中...</span>
                        <span v-else>挖矿中...</span>
                    </td>
                    <td v-else></td>
                    <td v-if="userId === item.managerId">
                        {{formatTime(item.workStartTimestamp)}}
                    </td>
                    <td v-else></td>
                    <td v-if="userId === item.managerId">
                       {{formatTime(item.workEndTimestamp)}}
                    </td>
                    <td v-else></td>
                    <td v-if="item.workStartTimestamp === 0 &&  userId === item.managerId">
                        <button class="custom-button" @click="energyTButton(item)">补充能量</button>
                    </td>
                    <td v-else>
                    </td>
                    <td v-if="item.workStartTimestamp === 0 &&  userId === item.managerId" style="width: 370px">
                        <button class="white-button" @click="automationOne(item)">自动挖1级</button>
                        <button class="white-button" @click="automationTwo(item)">自动挖2级(EAS)</button>
                        <button class="white-button" @click="automationTwoMint(item)">自动挖2级(BMC)</button>
                        <button class="white-button" @click="automationThree(item)">自动挖3级(APE)</button>
                        <button class="white-button" @click="automationThreeMint(item)">自动挖3级(SEC)</button>
                        <button class="white-button" @click="automationFourMint(item)">自动挖4级(ZSH)</button>
                    </td>
                    <td v-else>
                    </td>
                </tr>
            </tbody>
        </table>
        <h2>查看Club价格功能</h2>
        <div class="input-container" style="margin: 10px">
            club等级：<input type="text" class="input" placeholder="最低等级1" v-model="clubLevel">————
            <input type="text" class="input" placeholder="最高club等级" v-model="clubLevelHigh" >级
            <span  style="margin-left: 30px">马蹄价格：</span><input type="text" class="input" placeholder="最低价格0" disabled>————
            <input type="text" class="input" placeholder="最高价格" v-model="priceRangeHigh">
            <button class="custom-button" @click="getfriendtrade_hirelist()">查看最低价格的club</button>
        </div>
        <table>
            <tr>
                <th>头像</th>
                <th>名称</th>
                <th>购买钥匙的ID</th>
                <th>等级</th>
                <th>购买钥匙(单价/马蹄)</th>
                <th>管理club总需要key</th>
                <th>管理club总需要花费</th>
            </tr>
            <tbody>
            <tr v-for="item in hireList" :key="item.id">
                <td>
                    <img :src="item.profile.avatarUrl" alt='头像' style="width: 45px;height: 45px;">
                </td>
                <td>{{ item.profile.displayName }}</td>
                <td>{{ item.profile.accountName }}</td>
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
                <td>{{ item.buyPrice.substring(0, 7) }}</td>
                <td>{{ item.needBuyKeyNum }}</td>
                <td>{{ item.needBuyTotalPrice.substring(0, 7) }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'LfgMint',
    data() {
        return {
            token: '',
            cursor: 0,
            clubLevel: 1,
            clubLevelHigh: 15,
            priceRangeHigh: 0.1,
            seconds: '',
            interval: '',
            mintContent: '',
            multiplyCardNum: 0,
            curWorkingEmployeeNum: '',
            userId: '',
            textContentTip: '',
            userIdArray: [],
            userInfoList: [],
            userList: [],
            hireList: [],
            countdown: '提矿池lfg币',
            countingDown: false,
            numberArray: [],
            intervalId: null
        }
    },
    created() {
        setInterval(this.getManagerClubInfo(), 120000); // 每分钟执行一次任务
    },
    methods: {
        //搜索打架
        fighting(){
            //页面跳转
            this.$router.push({ path: '/fighting' });
        },
        //自动打架
        autoFighting(){
            //页面跳转
            this.$router.push({ path: '/autoFighting' });
        },
        // 获取个人信息
        async userInfo() {
            this.userIdArray = [];
            this.userInfoList = [];
            this.userList = [];
            this.countingDown = false;
            this.countdown = "提矿池lfg币";
            await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/userinfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: this.token,
                    userId: 0
                })
            }).then(response => response.json())
                .then(res => {
                    const userInfo = res.data;
                    this.multiplyCardNum = res.data.selfData.multiplyCardNum;
                    this.userInfoList.push(userInfo);
                    this.userId = userInfo.userId;

                    this.earnInfo(); //获取个人下次提币的时间
                    this.getManagerClubInfo();//获取管理的club信息
                });
        },

        //booster翻倍卡
        booster(){
            const token=this.token;
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

        //查看最低价格的club
        getfriendtrade_hirelist(){
            const token=this.token;
            const cursor=this.cursor;
            const clubLevel=Number(this.clubLevel);
            const clubLevelHigh=Number(this.clubLevelHigh);
            const priceRangeHigh=Number(this.priceRangeHigh);

            fetch('https://turnup-uw-test-apiv2.turnup.so/api/v2/friendtrade_hirelist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cursor: cursor,
                    holdersRange:[0, -1],
                    holdingRange:[0, -1],
                    twitterFollowerRange:[0, -1],
                    isAsc:true,
                    prioritizeIgnoreGuestUsers:true,
                    prioritizeIgnoreWishUsers:true,
                    prioritizeMyHolders:false,
                    prioritizeMyHolding:false,
                    sortType:1,
                    levelRange:[clubLevel,clubLevelHigh],
                    priceRange:[0,priceRangeHigh],
                    token: token,
                })
            }).then(response => response.json())
                .then(res => {
                    this.hireList=[]
                    if(res.code===1){
                        alert("未获取到信息")
                    }
                    res.data.usersData.forEach(e => {
                        this.hireList.push(e)
                    })
                });
        },

        //提取个人lfg代币
        friendtrade_takecoin() {
            const token=this.token;
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

        //自动提取个人lfg代币
        auto_takecoin() {
            const token=this.token;
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
            setInterval(async () => {
                await this.auto_takecoin();
            }, (60 * 60 * 1000)+3000); // 即每1小时执行一次
        },
        //批量功能
        batchTask() {
            //页面跳转
            this.$router.push({ path: '/batchTask' });
        },
        //批量功能
        batchImport() {
            //页面跳转
            this.$router.push({ path: '/batch' });
        },
        //获取管理的club信息
        async getManagerClubInfo() {
            const token=this.token;
            const userId=this.userId;
            this.userIdArray=[];
            this.userList=[];
            await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/portfolio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: token,
                })
            }).then(response => response.json())
                .then(res => {
                    res.data.holding.forEach(e => {
                        if (userId === e.managerId) {
                            this.userList.push(e);
                            this.userIdArray.push({userId: e.userId});
                        }
                        // 倒计时
                        // const currentTime = Math.floor(Date.now() / 1000);
                        // let timestamp = e.workEndTimestamp - currentTime;
                        // if (timestamp >0) {
                        //     let timer =  setInterval(() => {
                        //         // 计算小时、分钟、秒
                        //         let hours = Math.floor(timestamp / 3600);
                        //         let minutes = Math.floor((timestamp % 3600) / 60);
                        //         let remainingSeconds = timestamp % 60;
                        //
                        //         // 格式化时间显示，例如 1:3:5 而不是 01:03:05
                        //         hours = String(hours).padStart(2, '0');
                        //         minutes = String(minutes).padStart(2, '0');
                        //         remainingSeconds = String(remainingSeconds).padStart(2, '0');
                        //
                        //         if (timestamp > 0) {
                        //             timestamp--;
                        //             document.getElementById(e.userId).innerText= "挖矿结束倒计时: " + hours + ":" + minutes + ":" + remainingSeconds;
                        //         } else {
                        //             clearInterval(timer);
                        //         }
                        //     }, 1000);
                        // }
                    })
                });
        },
        //判断能量是否足够
        isEnergyLess(currentTask) {
            if(currentTask.energy<20 && currentTask.tierId===3){
                console.log(currentTask.energy,"任务3");
                return currentTask.energy < 20;
            }else if(currentTask.energy<35 && currentTask.tierId===4){
                console.log(currentTask.energy,"任务4");
                return currentTask.energy < 35;
            }else if(currentTask.energy<35 && currentTask.tierId===5){
                console.log(currentTask.energy,"任务5");
                return currentTask.energy < 35;
            }else if(currentTask.energy<35 && currentTask.tierId===6){
                console.log(currentTask.energy,"任务6");
                return currentTask.energy < 35;
            }else if(currentTask.energy<35 && currentTask.tierId===7){
                console.log(currentTask.energy,"任务7");
                return currentTask.energy < 35;
            }else if(currentTask.energy<35 && currentTask.tierId===8){
                console.log(currentTask.energy,"任务8");
                return currentTask.energy < 35;
            }
        },
        //开始执行任务
        startTaskExecution() {
            this.friendtrade_dispatch_detail();
            this.intervalId = setInterval(this.friendtrade_dispatch_detail, 600000); // 每分钟执行一次任务
        },
        // 停止定时任务执行
        stopTaskExecution() {
            clearInterval(this.intervalId); // 停止定时任务执行
        },
        //恢复能量
        async executeEnergyRecoveryTask(e) {
            const token=this.token;
            //收矿
            this.automationOreButton(e.userId);
            await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    workId: 2,
                    token: token,
                    emplyeeIds: [e.userId],
                })
            }).then(response => response.json())
                .then(res => {
                });
            // 执行能量回复任务的逻辑
            console.log(e.profile.accountName+'执行能量回复任务');
        },
        //执行挖矿
        async executeTask(user,workId) {
            const token=this.token;
            //收矿
            this.automationOreButton(user.userId);
            await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    emplyeeIds: [user.userId],
                    token: token,
                    workId: workId,
                })
            }).then(response => response.json())
                .then(res => {
                    // 执行具体的任务逻辑
                    console.log(user.profile.accountName+`执行任务：workId ${workId}`+res);
                });
        },
        //自动执行任务
        async autoExecuteTasks() {
            console.log(this.userList)
            for (let i = 0; i < this.userList.length; i++) {
                const currentTask = this.userList[i];
                //收矿
                this.automationOreButton(currentTask.userId);
                if (this.isEnergyLess(currentTask)) {
                    this.executeEnergyRecoveryTask(currentTask);
                } else {
                    if (currentTask.tierId >= 4 && this.tasks.find(task => task.workId === 101 && task.clubCount <= 1)) {
                        // 执行4级任务
                        this.executeTask(currentTask,101);
                        console.log(currentTask.profile.accountName+`workId为101的任务`);
                    }else if (currentTask.tierId >= 5 && this.tasks.find(task => task.workId === 12 && task.clubCount >= 10) || currentTask.tierId >= 5
                        && this.tasks.find(task => task.workId === 11 && task.clubCount <= 10)) {
                        // 执行5级任务
                        this.executeTask(currentTask,11);
                    }else if (currentTask.tierId >= 5 && this.tasks.find(task => task.workId === 11 && task.clubCount >= 10)|| currentTask.tierId >= 5
                        && this.tasks.find(task => task.workId === 10 && task.clubCount <= 10)) {
                        // 执行5级任务
                        this.executeTask(currentTask,10);
                    }else if (currentTask.tierId >= 4 && this.tasks.find(task => task.workId === 10 && task.clubCount >= 10)|| currentTask.tierId >= 4
                        && this.tasks.find(task => task.workId === 9 && task.clubCount <= 10)) {
                        // 执行4级任务
                        this.executeTask(currentTask,9);
                    }else if (currentTask.tierId >= 4 && this.tasks.find(task => task.workId === 9 && task.clubCount >= 10)|| currentTask.tierId >= 4
                        && this.tasks.find(task => task.workId === 8 && task.clubCount <= 10)) {
                        // 执行4级任务
                        this.executeTask(currentTask,8);
                        console.log(currentTask.profile.accountName+`workId为8的任务`);
                    }else if (currentTask.tierId >= 3 && this.tasks.find(task => task.workId === 8 && task.clubCount >= 10)|| currentTask.tierId >= 3
                        && this.tasks.find(task => task.workId === 7 && task.clubCount <= 10)) {
                        // 执行3级任务
                        this.executeTask(currentTask,7);
                        console.log(currentTask.profile.accountName+`workId为7的任务`);
                    } else if (currentTask.tierId >= 3 && this.tasks.find(task => task.workId === 7 && task.clubCount >= 10)|| currentTask.tierId >= 3
                        && this.tasks.find(task => task.workId === 6 && task.clubCount <= 10)) {
                        // 执行3级任务
                        this.executeTask(currentTask,6);
                        console.log(currentTask.profile.accountName+`workId为6的任务`);
                    } else if (currentTask.tierId >= 2 && this.tasks.find(task => task.workId === 6 && task.clubCount >= 10)|| currentTask.tierId >= 3
                        && this.tasks.find(task => task.workId === 5 && task.clubCount <= 10)) {
                        // 执行2级任务
                        this.executeTask(currentTask,5);
                        console.log(currentTask.profile.accountName+`workId为5的任务`);
                    } else if (currentTask.tierId >= 2 && this.tasks.find(task => task.workId === 5 && task.clubCount >= 10)|| currentTask.tierId >= 3
                        && this.tasks.find(task => task.workId === 4 && task.clubCount <= 10)) {
                        // 执行2级任务
                        this.executeTask(currentTask,4);
                        console.log(currentTask.profile.accountName+`workId为4的任务`);
                    } else if (currentTask.tierId >= 1 && this.tasks.find(task => task.workId === 4 && task.clubCount >= 10)|| currentTask.tierId >= 3
                        && this.tasks.find(task => task.workId === 3 && task.clubCount <= 10)) {
                        // 执行1级任务
                        this.executeTask(currentTask,3);
                        console.log(currentTask.profile.accountName+`workId为3的任务`);
                    } else if (currentTask.tierId >= 1 && this.tasks.find(task => task.workId === 3 && task.clubCount >= 10)|| currentTask.tierId >= 3
                        && this.tasks.find(task => task.workId === 1 && task.clubCount <= 10)) {
                        // 执行1级任务
                        this.executeTask(currentTask,1);
                        console.log(currentTask.profile.accountName+`workId为1的任务`);
                    } else {
                        console.log(currentTask.profile.accountName+`不能执行workId为${currentTask.workId}的任务`);
                    }
                }
            }
        },
        // 获取每个等级挖矿占用的club数量
        async friendtrade_dispatch_detail(userId) {
            this.tasks=[]
            const token=this.token;

            for(let workId=12;workId>0;workId--){
                await  fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_detail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        token: token,
                        emplyeeIds: [userId],
                        workId: workId,
                    })
                }).then(response => response.json())
                    .then(res => {
                        if (!res.data.isLocked && res.data.canUnlock) {
                            this.tasks.push({clubCount:res.data.curWorkingEmployeeNum,
                                workId:res.data.workId});
                        }
                    });
            }
            await  fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_detail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: token,
                    emplyeeIds: [userId],
                    workId: 101,
                })
            }).then(response => response.json())
                .then(res => {
                    if (!res.data.isLocked && res.data.canUnlock) {
                        this.tasks.push({clubCount:res.data.curWorkingEmployeeNum,
                            workId:res.data.workId})
                    }
                });
            console.log(this.tasks);
            //自动执行任务
            this.autoExecuteTasks();
            //刷新管理的club信息
            this.getManagerClubInfo();
        },
        //获取个人下次提币的时间
        startCountdown() {
            let second=this.seconds;
            if (!this.countingDown) {
                this.countingDown = true;
                let timer = setInterval(() => {
                    // 计算小时、分钟、秒
                    let hours = Math.floor(second / 3600);
                    let minutes = Math.floor((second % 3600) / 60);
                    let remainingSeconds = second % 60;

                    // 格式化时间显示，例如 1:3:5 而不是 01:03:05
                    hours = String(hours).padStart(2, '0');
                    minutes = String(minutes).padStart(2, '0');
                    remainingSeconds = String(remainingSeconds).padStart(2, '0');
                    if (second > 0) {
                        second--;
                        this.countdown = "提矿池lfg币倒计时: " + hours + ":" + minutes + ":" + remainingSeconds;
                    } else {
                        clearInterval(timer);
                        this.countingDown = false;
                        this.countdown = "提矿池lfg币";
                    }
                }, 1000);
            }
        },

        //获取个人下次提币的时间
        async earnInfo() {
            const token=this.token
            await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/earninfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: token,
                })
            }).then(response => response.json())
                .then(res => {
                    const userInfo = res.data;
                    this.seconds = userInfo.mintLeftSec;
                    this.startCountdown() //获取个人下次提币的时间
                });
        },

        // 一键收矿
         oreButton() {
            const token=this.token
            if (this.userIdArray != null) {
                this.userIdArray.forEach(async function (item, index, array) {
                    await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_takeworkcoin', {
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

        // 自动收矿
        async automationOreButton(userId){
            const token=this.token;
           await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_takeworkcoin', {
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
                    console.log("出圈社区Club🥇————收矿",res)
                });
        },

        // 自动挖矿
        async automationMint(userId,workId){
            const token=this.token;
            await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
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
        async automationOne(e){
            const token=this.token;
            //收矿
            this.automationOreButton(e.userId);
            //刷新管理club信息
            this.getManagerClubInfo();
            //补充能量
            setTimeout(
               await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/portfolio', {
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
            await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
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
            setInterval(async () => {
               await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
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
        async automationTwo(e){
            const token=this.token;
            //收矿
            this.automationOreButton(e.userId);
            //刷新管理club信息
            this.getManagerClubInfo();
            //补充能量
            setTimeout(
               await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/portfolio', {
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
           await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
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
            setInterval(async() => {
               await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
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
        async automationTwoMint(e){
            const token=this.token;
            //收矿
            this.automationOreButton(e.userId);
            //刷新管理club信息
            this.getManagerClubInfo();
            //补充能量
            setTimeout(
              await  fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/portfolio', {
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
            await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
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
            setInterval(async() => {
                await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
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
        async automationThree(e){
            const token=this.token;
            //收矿
            this.automationOreButton(e.userId);
            //刷新管理club信息
            this.getManagerClubInfo();
            setTimeout(
                //补充能量
              await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/portfolio', {
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
           await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
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
            setInterval(async() => {
               await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
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
        async automationThreeMint(e){
            const token=this.token;
            //收矿
            this.automationOreButton(e.userId);
            //刷新管理club信息
            this.getManagerClubInfo();
            //补充能量
            setTimeout(
               await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/portfolio', {
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
            await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
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
            setInterval(async() => {
              await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
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
        async automationFourMint(e){
            const token=this.token;
            //收矿
            this.automationOreButton(e.userId);
            //刷新管理club信息
            this.getManagerClubInfo();
            //补充能量
            setTimeout(
               await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/portfolio', {
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
                                    debugger
                                    this.automationMint(e.userId,2);
                                    //刷新管理club信息
                                    this.getManagerClubInfo();
                                }
                            }
                        })
                    }), 1500);
            //挖矿
            await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
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
            setInterval(async() => {
               await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
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

        // 单个补充能量
        async energyTButton(e) {
            const token=this.token
           await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    workId: 2,
                    token: token,
                    emplyeeIds: [e.userId],
                })
            }).then(response => response.json())
                .then(res => {
                });
            alert(e.profile.accountName+"Club执行补充能量成功");
            this.getManagerClubInfo();
        },

        // 一键补充能量
        energyButton() {
            const token=this.token
            let count = 0; // 计数器
            if (this.userIdArray != null) {
                this.userIdArray.forEach(async function (item, index, array) {
                  await  fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
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
                this.userIdArray.forEach(async item=> {
                    //收矿
                  await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_takeworkcoin', {
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
                  await  fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
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
                this.userIdArray.forEach(async item=> {
                    //收矿
                   await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_takeworkcoin', {
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
                    await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
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
                this.userIdArray.forEach(async item=> {
                    //收矿
                    await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_takeworkcoin', {
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
                    await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
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
                this.userIdArray.forEach(async item=> {
                    //收矿
                   await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_takeworkcoin', {
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
                   await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
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
                this.userIdArray.forEach(async item=> {
                    //收矿
                   await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_takeworkcoin', {
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
                   await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
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
                this.userIdArray.forEach(async item=> {
                    //收矿
                   await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_takeworkcoin', {
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
                  await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
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
                this.userIdArray.forEach(async item=> {
                    //收矿
                   await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_takeworkcoin', {
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
                   await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
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
                this.userIdArray.forEach(async item=> {
                    //收矿
                  await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_takeworkcoin', {
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
                  await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
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
                this.userIdArray.forEach(async item=> {
                    //收矿
                   await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_takeworkcoin', {
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
                   await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
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
                this.userIdArray.forEach(async item=> {
                    //收矿
                   await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_takeworkcoin', {
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
                   await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
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
                this.userIdArray.forEach(async item=> {
                    //收矿
                   await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_takeworkcoin', {
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
                   await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
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
                this.userIdArray.forEach(async item=> {
                    //收矿
                   await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_takeworkcoin', {
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
                   await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
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
                this.userIdArray.forEach(async item=> {
                    //收矿
                   await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_takeworkcoin', {
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
                  await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_emplyees', {
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

        // 一键挖7级矿
        sevenLevelTButton() {
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
                            workId: 14,
                            token: token,
                        })
                    }).then(response => response.json())
                        .then(res => {
                        });
                });
                alert("执行一键挖7级矿成功");
                this.getManagerClubInfo();
            }
        },

        // 一键挖7级矿
        sevenLevelButton() {
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
                            workId: 15,
                            token: token,
                        })
                    }).then(response => response.json())
                        .then(res => {
                        });
                });
                alert("执行一键挖7级矿成功");
                this.getManagerClubInfo();
            }
        },

        // 一键挖8级矿
        eightLevelTButton() {
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
                            workId: 16,
                            token: token,
                        })
                    }).then(response => response.json())
                        .then(res => {
                        });
                });
                alert("执行一键挖8级矿成功");
                this.getManagerClubInfo();
            }
        },

        // 一键挖9级矿
        nineLevelButton() {
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
                            workId: 17,
                            token: token,
                        })
                    }).then(response => response.json())
                        .then(res => {
                        });
                });
                alert("执行一键挖9级矿成功");
                this.getManagerClubInfo();
            }
        },

        // 一键挖10级矿
        tenLevelButton() {
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
                            workId: 18,
                            token: token,
                        })
                    }).then(response => response.json())
                        .then(res => {
                        });
                });
                alert("执行一键挖10级矿成功");
                this.getManagerClubInfo();
            }
        },

        // 一键挖11级矿
        elevenLevelButton() {
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
                            workId: 19,
                            token: token,
                        })
                    }).then(response => response.json())
                        .then(res => {
                        });
                });
                alert("执行一键挖11级矿成功");
                this.getManagerClubInfo();
            }
        },

        // 一键挖12级矿
        twelveLevelButton() {
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
                            workId: 20,
                            token: token,
                        })
                    }).then(response => response.json())
                        .then(res => {
                        });
                });
                alert("执行一键挖12级矿成功");
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
    },
    beforeDestroy() {
        clearInterval(this.intervalId); // 销毁组件前清除定时器
    }
}
</script>

<style lang="less">

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
</style>
