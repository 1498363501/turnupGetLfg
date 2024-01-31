<template>
    <div>
        <h2 style="text-align: center;margin: 20px ">批量导入token获取管理club信息和挖矿功能</h2>
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
            <button @click="auto_takecoin" class="custom-button">自动提币</button>
            <button @click="oreBooster" class="custom-button">一键使用Booster翻倍卡</button>
            <button @click="oreAutoBooster" class="custom-button">一键自动使用Booster翻倍卡</button>
            <button class="custom-button" @click="startTaskExecution()">开始任务执行</button>
            <button class="custom-button" @click="stopTaskExecution()">停止任务执行</button>
        </div>
        <h2>管理的Club信息</h2>
        <h4>使用说明和相关解释：</h4>
        <h4>1、黄色的背景代表着你管理的CLub处于待挖矿、待领取币状态</h4>
        <h4>2、温馨提示：自动化挖矿功能，如果关闭了页面，定时任务就会失效。就要重新执行了</h4>
        <div class="button-container" >
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
            </tr>
            <tbody>
            <tr v-for="(item,index) in userList" :key="item.id" v-if="item.holdingNum === item.managerOwnKeyNum">
                <td :style="{'background-color': item.workId === 0 ? '#FFF203' : ''}">{{ index+1 }}</td>
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
                <td>
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
                <td>
                    {{formatTime(item.workStartTimestamp)}}
                </td>
                <td>
                    {{formatTime(item.workEndTimestamp)}}
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import token from '../assets/img/token.jpg';
    export default {
        name: "BatchTask",
        data() {
            return {
                url: token, //图片路径
                srcList: [token], //图片路径
                userList: [],
                userInfoList: [],
                userInfoArray: [],
                tokenList: [],
                userIdArray: [],
                inputValue: '',
                seconds: '',
                timeMap: new Map(),
                title: '',
                token: '',
                userId: '',
                dialogVisible: false,
                intervalId: null,
                tableData: [],
                userMap: new Map(),
                userIdList: []
            }
        },
        created() {
            setInterval(this.handleInput(), 120000); // 每分钟执行一次任务
        },
        methods: {
            //获取个人信息
            async handleInput() {
                this.tokenList=[];
                this.userInfoList=[];
                this.userIdList=[];
                this.userList=[];
                const outputArray = this.inputValue.split(';').map(item => item.trim()).filter(item => item !== '');
                this.tokenList = outputArray;
                const promises= this.tokenList.map(async token=>{
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
                                this.userMap.set(token,e.userId)
                                this.userIdList.push({userId: e.userId})
                            })
                        });
                });
                await Promise.all(promises);
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
                this.userIdArray=[];
                this.userList=[];
                this.tokenList.forEach(async token=>{
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
                                if (this.userIdList.some(user => user.userId  === e.managerId) && e.holdingNum === e.managerOwnKeyNum ) {
                                    this.userIdArray.push({userId: e.userId});
                                    this.userList.push(e);
                                }
                            })
                        });
                });
                console.log("管理club的信息",this.userList)
            },
            //开始执行任务
            startTaskExecution() {
                this.friendtrade_dispatch_detail();
                this.intervalId = setInterval(this.friendtrade_dispatch_detail, 3600000); // 每分钟执行一次任务
            },
            // 停止定时任务执行
            stopTaskExecution() {
                clearInterval(this.intervalId); // 停止定时任务执行
            },
            //判断能量是否足够
            isEnergyLess(currentTask) {
                console.log("能量",currentTask.userId)
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
            // 自动收矿
            async automationOreButton(token,userId){
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
            //恢复能量
            async executeEnergyRecoveryTask(token,e) {
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
            async executeTask(token,user,workId) {
                //收矿
                this.automationOreButton(token,user.userId);
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
            autoExecuteTasks(token) {
                for (let i = 0; i < this.userList.length; i++) {
                    const currentTask = this.userList[i];
                    //收矿
                    this.automationOreButton(token,currentTask.userId);
                    if (this.isEnergyLess(currentTask)) {
                        this.executeEnergyRecoveryTask(token,currentTask);
                    } else {
                        if (currentTask.tierId >= 4 && this.tasks.find(task => task.workId === 101 && task.clubCount <= 1  && task.token === token )) {
                            // 执行4级任务
                            this.executeTask(token,currentTask,101);
                            console.log(currentTask.profile.accountName+`workId为101的任务`);
                        }else if (currentTask.tierId >= 5 && this.tasks.find(task => task.workId === 12 && task.clubCount >= 10  && task.token === token ) || currentTask.tierId >= 5
                            && this.tasks.find(task => task.workId === 11 && task.clubCount <= 10  && task.token === token )) {
                            // 执行5级任务
                            this.executeTask(token,currentTask,11);
                        }else if (currentTask.tierId >= 5 && this.tasks.find(task => task.workId === 11 && task.clubCount >= 10  && task.token === token )|| currentTask.tierId >= 5
                            && this.tasks.find(task => task.workId === 10 && task.clubCount <= 10  && task.token === token )) {
                            // 执行5级任务，前提是5级任务已经占满了10个club
                            this.executeTask(token,currentTask,10);
                        }else if (currentTask.tierId >= 4 && this.tasks.find(task => task.workId === 10 && task.clubCount >= 10  && task.token === token )|| currentTask.tierId >= 4
                            && this.tasks.find(task => task.workId === 9 && task.clubCount <= 10  && task.token === token )) {
                            // 执行4级任务，前提是5级任务已经占满了10个club
                            this.executeTask(token,currentTask,9);
                        }else if (currentTask.tierId >= 4 && this.tasks.find(task => task.workId === 9 && task.clubCount >= 10  && task.token === token )|| currentTask.tierId >= 4
                            && this.tasks.find(task => task.workId === 8 && task.clubCount <= 10  && task.token === token )) {
                            // 执行4级任务，前提是4级任务已经占满了10个club
                            this.executeTask(token,currentTask,8);
                            console.log(currentTask.profile.accountName+`workId为8的任务`);
                        }else if (currentTask.tierId >= 3 && this.tasks.find(task => task.workId === 8 && task.clubCount >= 10  && task.token === token )|| currentTask.tierId >= 3
                            && this.tasks.find(task => task.workId === 7 && task.clubCount <= 10  && task.token === token )) {
                            // 执行3级任务，前提是4级任务已经占满了10个club
                            this.executeTask(token,currentTask,7);
                            console.log(currentTask.profile.accountName+`workId为7的任务`);
                        } else if (currentTask.tierId >= 3 && this.tasks.find(task => task.workId === 7 && task.clubCount >= 10  && task.token === token) || currentTask.tierId >= 3
                            && this.tasks.find(task => task.workId === 6 && task.clubCount <= 10  && task.token === token)) {
                            // 执行3级任务，前提是3级任务已经占满了10个club
                            this.executeTask(token,currentTask,6);
                            console.log(currentTask.profile.accountName+`workId为6的任务`);
                        } else if (currentTask.tierId >= 2 && this.tasks.find(task => task.workId === 6 && task.clubCount >= 10  && task.token === token) || currentTask.tierId >= 3
                            && this.tasks.find(task => task.workId === 5 && task.clubCount <= 10  && task.token === token)) {
                            // 执行2级任务，前提是3级任务已经占满了10个club
                            this.executeTask(token,currentTask,5);
                            console.log(currentTask.profile.accountName+`workId为5的任务`);
                        } else if (currentTask.tierId >= 2 && this.tasks.find(task => task.workId === 5 && task.clubCount >= 10  && task.token === token) || currentTask.tierId >= 3
                            && this.tasks.find(task => task.workId === 4 && task.clubCount <= 10  && task.token === token)) {
                            // 执行2级任务，前提是2级任务已经占满了10个club
                            this.executeTask(token,currentTask,4);
                            console.log(currentTask.profile.accountName+`workId为4的任务`);
                        } else if (currentTask.tierId >= 1 && this.tasks.find(task => task.workId === 4 && task.clubCount >= 10  && task.token === token) || currentTask.tierId >= 3
                            && this.tasks.find(task => task.workId === 3 && task.clubCount <= 10  && task.token === token)) {
                            // 执行1级任务，前提是2级任务已经占满了10个club
                            this.executeTask(token,currentTask,3);
                            console.log(currentTask.profile.accountName+`workId为3的任务`);
                        } else if (currentTask.tierId >= 1 && this.tasks.find(task => task.workId === 3 && task.clubCount >= 10  && task.token === token) || currentTask.tierId >= 3
                            && this.tasks.find(task => task.workId === 1 && task.clubCount <= 10  && task.token === token)) {
                            // 执行1级任务，前提是2级任务已经占满了10个club
                            this.executeTask(token,currentTask,1);
                            console.log(currentTask.profile.accountName+`workId为1的任务`);
                        } else {
                            console.log(currentTask.profile.accountName+`不能执行workId为${currentTask.workId}的任务`);
                        }
                    }
                }
            },
            // 获取每个等级挖矿占用的club数量
            friendtrade_dispatch_detail() {
                this.tasks=[];
                this.userMap.forEach(async (userId, token) => {
                    for(let workId=12;workId>0;workId--){
                        await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_detail', {
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
                                    this.tasks.push({token:token,clubCount:res.data.curWorkingEmployeeNum,
                                        workId:res.data.workId});
                                }
                            });
                    }
                    await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_dispatch_detail', {
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
                                this.tasks.push({token:token,clubCount:res.data.curWorkingEmployeeNum,
                                    workId:res.data.workId});
                            }
                        });
                    console.log(token,this.tasks)
                    //自动执行任务
                    this.autoExecuteTasks(token);
                });
                //刷新管理的club信息
                this.handleInput();
            },
            //一键使用Booster翻倍卡
            oreBooster() {
                this.tokenList.forEach(async token=>{
                    await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_boost_claimcoin', {
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
                    this.tokenList.forEach(async token=>{
                        await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_takecoin', {
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
            //一键提取个人lfg代币
            oreFriendtrade_takecoin() {
                this.tokenList.forEach(async token=>{
                  await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_takecoin', {
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
                    this.tokenList.forEach(async token=>{
                      await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_takecoin', {
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