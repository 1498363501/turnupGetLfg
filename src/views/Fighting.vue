<template>
    <div>
        <h2 style="text-align: center;margin: 20px ">导入token搜索要攻击的club信息和打架功能</h2>
        <h3>提示：</h3>
        <h3>1：每3分钟自动刷新【查看可攻击Club等级功能】</h3>
        <h3>2：自动一键提币【每一个小时自动提币】</h3>
        <div class="input-container" style="margin: 10px">
            <input type="text" class="inputWidth" placeholder="你的token" v-model="token">
            <button class="custom-button" @click="getUserInfo()">个人信息</button>
            <button class="custom-button" @click="getUserInfo()">查看可攻击的club信息</button>
            <button class="custom-button" @click="lootLogInfo">查看攻击记录</button>
            <button class="custom-button" @click="restoreEnergyClub">恢复俱乐部能量</button>
            <button class="custom-button" @click="booster()">Booster翻倍卡使用——X{{multiplyCardNum}}</button>
            <button id="countdown" class="custom-button" @click="friendtrade_takecoin()" :disabled="countingDown">{{countdown}}</button>
            <button id="autoCountdown" class="custom-button" @click="auto_takecoin()">自动一键提币</button>
            <button class="custom-button" @click="goBack()">返回首页</button>
        </div>
        <h2>个人信息</h2>
        <table>
            <tr>
                <th>名称</th>
                <th>购买钥匙ID</th>
                <th>等级</th>
                <th>Power</th>
                <th>战斗积分</th>
                <th>战斗等级</th>
                <th>锁定LFG代币数量</th>
                <th>可索赔LFG解锁代币数量</th>
                <th>每日解锁LFG代币数量</th>
                <th>背包LFG代币数量</th>
                <th>矿池LFG代币数量</th>
                <th>UP数量</th>
                <th>马蹄数量</th>
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
                    <td><img src="../assets/img/battlePoint_icon.jpg" alt='战斗积分' class='icon'>{{ item.battlePoints }}</td>
                    <td>{{ item.battlePointLevel }}</td>
                    <td><img src="../assets/img/lfg.jpg" alt='锁定lfg' class='icon'>{{ item.virtualLFG }}</td>
                    <td><img src="../assets/img/lfg.jpg" alt='可索赔lfg' class='icon'>{{ item.withDrawableLfg }}</td>
                    <td><img src="../assets/img/lfg.jpg" alt='每日解锁lfg' class='icon'>{{ item.releaseLfgPerDay }}</td>
                    <td><img src="../assets/img/lfg.jpg" alt='lfg背包' class='icon'>{{ item.lfgBalance }}</td>
                    <td><img src="../assets/img/lfg.jpg" alt='lfg矿池' class='icon'>{{ item.claimCoin }}</td>
                    <td><img src="../assets/img/up.jpg" alt='up' class='icon'>{{ item.points }}</td>
                    <td><img src="../assets/img/matic.jpg" alt='马蹄' class='icon'>{{ item.balance }}</td>
                </tr>
            </tbody>
        </table>
        <h2>指定攻击对象功能</h2>
        <div class="button-container" style="margin: 10px">
            填入攻击club的名称或者购买钥匙id：<input type="text" class="lootInputWidth" placeholder="攻击club的名称" v-model="lootName">
            <button class="custom-button" @click="selectFightDesignation()">查看指定攻击的club信息</button>
        </div>
        <table>
            <tr>
                <th>头像</th>
                <th>名称</th>
                <th>购买钥匙ID</th>
                <th>userId</th>
                <th>等级</th>
                <th>攻击目标战斗力</th>
                <th>该俱乐部当前矿池总的lfg</th>
                <th>攻击目标状态</th>
                <th>攻击功能</th>
            </tr>
            <tbody>
            <tr v-for="item in fightDesignationList" :key="item.id">
                <td>
                    <img :src="item.avatarUrl" alt='头像' style="width: 45px;height: 45px;">
                </td>
                <td>{{ item.displayName }}</td>
                <td>{{ item.accountName }}</td>
                <td>{{ item.userId }}</td>
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
                    <span v-else>等级信息获取不到</span>
                </td>
                <td>{{ item.tarPower }}</td>
                <td>{{ item.claimCoin }}</td>
                <td>{{ item.protectCD }}</td>
                <td v-if="item.code===0"><button class="custom-button" @click="showDialog(item.displayName,item.userId)">选择自己club</button></td>
                <td v-else>该{{item.displayName}}俱乐部处于冷却状态,攻击不了</td>
            </tr>
            </tbody>
        </table>
        <h2>查看可攻击Club等级功能</h2>
        <div class="button-container" style="margin: 10px">
            club等级：<input type="text" class="input" placeholder="最低等级1" v-model="clubLevel">————
            <input type="text" class="input" placeholder="最高club等级" v-model="clubLevelHigh" >级
            <button class="custom-button" @click="getUserInfo()">查看可攻击的club等级信息</button>
        </div>
        <table>
            <tr>
                <th>头像</th>
                <th>攻击目标名称</th>
                <th>攻击目标购买钥匙ID</th>
                <th>攻击目标userId</th>
                <th>攻击目标等级</th>
                <th>攻击目标战斗力</th>
                <th>该俱乐部当前矿池总的lfg</th>
                <th>该俱乐部冷却时间</th>
                <th>攻击功能</th>
            </tr>
            <tbody>
                <tr v-for="item in fightList" :key="item.id">
                <td>
                    <img :src="item.avatarUrl" alt='头像' style="width: 45px;height: 45px;">
                </td>
                <td>{{ item.displayName }}</td>
                <td>{{ item.accountName }}</td>
                <td>{{ item.userId }}</td>
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
                <td>{{ item.tarPower }}</td>
                <td><img src="../assets/img/lfg.jpg" alt='lfg矿池' class='icon'>{{ item.claimCoin }}</td>
                <td>{{ formatTime(item.protectCD)}}</td>
                <td v-if="item.protectCD<=0"><button class="custom-button" @click="showDialog(item.displayName,item.userId)">选择自己club</button></td>
                <td v-else></td>
            </tr>
            </tbody>
        </table>
         <!--弹出框-->
        <el-dialog :visible.sync="dialogVisible" :title="title" >
            <h2>选择用来攻击的Club信息</h2>
            <table>
                <tr>
                    <th>序号</th>
                    <th>名称</th>
                    <th>购买钥匙ID</th>
                    <th>用户id</th>
                    <th>战斗力</th>
                    <th>能量</th>
                    <th>攻击冷却时间</th>
                    <th>攻击功能</th>
                </tr>
                <tbody>
                <tr v-for="(item,index) in userList" :key="item.id">
                    <td :style="{'background-color': item.energy>=5 ? '#FFF203' : ''}">{{ index+1 }}</td>
                    <td><img src="../assets/img/king.jpg" alt='皇冠' class='icon'>{{ item.profile.displayName }}</td>
                    <td>{{ item.profile.accountName }}</td>
                    <td>{{ item.userId}}</td>
                    <td>{{ item.power }}</td>
                    <td><img src="../assets/img/energy.jpg" alt='能量' class='icon'>{{ item.energy }}</td>
                    <td>{{ formatTime(item.attackCD) }}</td>
                    <td v-if="item.energy>=5"><button class="custom-button" @click="loot_info(item.userId)">用该俱乐部攻击</button></td>
                    <td v-else></td>
                </tr>
                </tbody>
            </table>
        </el-dialog>
         <!--第二个弹出框-->
        <el-dialog :visible.sync="showInfo" :title="'BATTLE——'+title">
            <table>
                <tr>
                    <th>我的等级</th>
                    <th>我的战斗力</th>
                    <th>攻击对象名称</th>
                    <th>攻击对象购买钥匙ID</th>
                    <th>攻击对象等级</th>
                    <th>攻击对象战斗力</th>
                    <th>最低胜率</th>
                    <th>最低消耗lfg</th>
                    <th>我能赚取lfg数量</th>
                    <th>攻击功能</th>
                </tr>
                <tbody>
                <tr>
                    <td>
                        <span v-if="employeeLevel=== 1"><img src="../assets/img/1.jpg" alt='1级' class='icon'></span>
                        <span v-else-if="employeeLevel=== 2"><img src="../assets/img/2.jpg" alt='2级' class='icon'></span>
                        <span v-else-if="employeeLevel=== 3"><img src="../assets/img/3.jpg" alt='3级' class='icon'></span>
                        <span v-else-if="employeeLevel=== 4"><img src="../assets/img/4.jpg" alt='4级' class='icon'></span>
                        <span v-else-if="employeeLevel=== 5"><img src="../assets/img/5.jpg" alt='5级' class='icon'></span>
                        <span v-else-if="employeeLevel=== 6"><img src="../assets/img/6.jpg" alt='6级' class='icon'></span>
                        <span v-else-if="employeeLevel=== 7"><img src="../assets/img/7.jpg" alt='7级' class='icon'></span>
                        <span v-else-if="employeeLevel=== 8"><img src="../assets/img/8.jpg" alt='8级' class='icon'></span>
                        <span v-else-if="employeeLevel=== 9"><img src="../assets/img/9.jpg" alt='9级' class='icon'></span>
                        <span v-else-if="employeeLevel=== 10"><img src="../assets/img/10.jpg" alt='10级' class='icon'></span>
                        <span v-else-if="employeeLevel=== 11"><img src="../assets/img/11.jpg" alt='11级' class='icon'></span>
                        <span v-else-if="employeeLevel=== 12"><img src="../assets/img/12.jpg" alt='12级' class='icon'></span>
                        <span v-else-if="employeeLevel=== 13"><img src="../assets/img/13.jpg" alt='13级' class='icon'></span>
                    </td>
                    <td>{{ employeePower }}</td>
                    <td>{{ displayName }}</td>
                    <td>{{ accountName }}</td>
                    <td>
                        <span v-if="tarLevel=== 1"><img src="../assets/img/1.jpg" alt='1级' class='icon'></span>
                        <span v-else-if="tarLevel=== 2"><img src="../assets/img/2.jpg" alt='2级' class='icon'></span>
                        <span v-else-if="tarLevel=== 3"><img src="../assets/img/3.jpg" alt='3级' class='icon'></span>
                        <span v-else-if="tarLevel=== 4"><img src="../assets/img/4.jpg" alt='4级' class='icon'></span>
                        <span v-else-if="tarLevel=== 5"><img src="../assets/img/5.jpg" alt='5级' class='icon'></span>
                        <span v-else-if="tarLevel=== 6"><img src="../assets/img/6.jpg" alt='6级' class='icon'></span>
                        <span v-else-if="tarLevel=== 7"><img src="../assets/img/7.jpg" alt='7级' class='icon'></span>
                        <span v-else-if="tarLevel=== 8"><img src="../assets/img/8.jpg" alt='8级' class='icon'></span>
                        <span v-else-if="tarLevel=== 9"><img src="../assets/img/9.jpg" alt='9级' class='icon'></span>
                        <span v-else-if="tarLevel=== 10"><img src="../assets/img/10.jpg" alt='10级' class='icon'></span>
                        <span v-else-if="tarLevel=== 11"><img src="../assets/img/11.jpg" alt='11级' class='icon'></span>
                        <span v-else-if="tarLevel=== 12"><img src="../assets/img/12.jpg" alt='12级' class='icon'></span>
                        <span v-else-if="tarLevel=== 13"><img src="../assets/img/13.jpg" alt='13级' class='icon'></span>
                    </td>
                    <td>{{ tarPower }}</td>
                    <td>
                        最低胜率：{{succRatio}}
                    </td>
                    <td>
                        最低消耗lfg：{{minValue}}<el-input-number v-model="stepValue" :min="minNum" :step="minValue" step-strictly></el-input-number>
                    </td>
                    <td>
                        <span>我能赚取lfg数量：{{crackSelfCoin}}</span>
                    </td>
                    <td>
                        <button class="custom-button" @click="loot()">攻击</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </el-dialog>
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
        <!--恢复能量弹出框-->
        <el-dialog :visible.sync="showEnergyClub" title="恢复俱乐部能量" >
            <table>
                <tr>
                    <th>序号</th>
                    <th>名称</th>
                    <th>购买钥匙ID</th>
                    <th>等级</th>
                    <th>你持有key</th>
                    <th>最高持有key</th>
                    <th>单个钥匙购买价格/matic</th>
                    <th>挖矿能量值</th>
                    <th>挖矿状态</th>
                    <th>回复功能</th>
                </tr>
                <tbody>
                <tr v-for="(item,index) in userEnergyClubList" :key="item.id" v-if="item.holdingNum === item.managerOwnKeyNum">
                    <td :style="{'background-color': item.workId === 0 ? '#FFF203' : ''}">{{ index+1 }}</td>
                    <td><img src="../assets/img/king.jpg" alt='皇冠' class='icon'>{{ item.profile.displayName }}</td>
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
                    <td v-if="item.workId ===0 "><button class="custom-button" @click="energyClub(item)">恢复能量</button></td>
                    <td v-else></td>
                </tr>
                </tbody>
            </table>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Fighting",
        data() {
            return {
                inputValue: '',
                displayName: '',
                accountName: '',
                tarLevel: '',
                tarPower: '',
                employeePower: '',
                employeeLevel: '',
                title: '',
                showTitle: '',
                lootName: '',
                userList: [],
                userInfoList: [],
                userEnergyClubList: [],
                fightDesignationList: [],
                fightList: [],
                lootLog: [],
                lootLogList: [],
                clubLevel: 1,
                clubLevelHigh: 5,
                token: '',
                userId: '',
                employeeId: '',
                orderId: '',
                succRatio: '',
                crackSelfCoin: '',
                inputData: '',
                countingDown: false,
                dialogVisible: false,
                showLogInfo: false,
                showEnergyClub: false,
                showInfo: false,
                countdown: '提矿池lfg币',
                multiplyCardNum: 0,
                minNum: 20,
                minValue: 0,
                stepValue: 0,
                num: 0,
                userIdMap: new Map(),
            }
        },
        created() {
            setInterval(this.getUserInfo(), 180000); // 每2分钟执行一次任务
        },
        methods: {
            // 获取个人信息
            async getUserInfo() {
                const token=this.token;
                this.userInfoList = [];
                this.countingDown = false;
                this.userIdMap = new Map();
                this.lootName='';
                this.countdown = "提矿池lfg币";
                await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/userinfo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        token: token,
                        userId: 0
                    })
                }).then(response => response.json())
                    .then(res => {
                        const userInfo = res.data;
                        this.multiplyCardNum = res.data.selfData.multiplyCardNum;
                        this.updateUserInfoList(userInfo, token);
                        this.userId = userInfo.userId;

                        this.earnInfo(); //获取个人下次提币的时间
                    });
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
                            if(e.energy>=5){
                                this.userIdMap.set(token,e.userId);
                                return;
                            }
                        })
                    });
                this.selectFight();
            },
            //获取背包代币信息
            async friendtrade_virtual_lfg(userInfo, token) {
                await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_virtual_lfg', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        token: token
                    })
                })
                    .then(response => response.json())
                    .then(res => {
                        console.log(res)
                        if(res.data.virtualLFG>0 && res.data.lfgUnlockStatus===1){
                            this.updateUserInfoList(userInfo, token,res.data.virtualLFG);
                        }else {
                            this.userInfoList.push({
                                withDrawableLfg: 0,
                                releaseLfgPerDay: 0,
                                virtualLFG: 0,
                                userId: userInfo.userId,
                                token: token,
                                multiplyCardNum: userInfo.selfData.multiplyCardNum,
                                displayName: userInfo.platformData.defaultName,
                                accountName: userInfo.platformData.defaultName,
                                tierId: userInfo.selfData.tierId,
                                power: userInfo.selfData.power,
                                lfgBalance: userInfo.selfData.lfgBalance,
                                claimCoin: userInfo.selfData.claimCoin,
                                points: userInfo.selfData.points,
                                battlePoints: userInfo.selfData.battlePoints,
                                battlePointLevel: userInfo.selfData.battlePointLevel,
                                balance: userInfo.selfData.balance.substring(0, 7),
                            });
                        }
                    });
            },
            //存储个人信息数组
            async updateUserInfoList(userInfo, token,virtualLFG) {
                if (userInfo.platformData.platformMap[1] === undefined) {
                    await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_virtual_lfg', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            token: token
                        })
                    })
                        .then(response => response.json())
                        .then(res => {
                            console.log(res)
                            if(res.data.virtualLFG>0){
                                this.userInfoList.push({
                                    withDrawableLfg: res.data.withDrawableLfg,
                                    releaseLfgPerDay: res.data.releaseLfgPerDay,
                                    virtualLFG: virtualLFG,
                                    userId: userInfo.userId,
                                    token: token,
                                    multiplyCardNum: userInfo.selfData.multiplyCardNum,
                                    displayName: userInfo.platformData.defaultName,
                                    accountName: userInfo.platformData.defaultName,
                                    tierId: userInfo.selfData.tierId,
                                    power: userInfo.selfData.power,
                                    lfgBalance: userInfo.selfData.lfgBalance,
                                    claimCoin: userInfo.selfData.claimCoin,
                                    points: userInfo.selfData.points,
                                    battlePoints: userInfo.selfData.battlePoints,
                                    battlePointLevel: userInfo.selfData.battlePointLevel,
                                    balance: userInfo.selfData.balance.substring(0, 7),
                                });
                            }
                        });
                } else {
                    await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_virtual_lfg', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            token: token
                        })
                    })
                        .then(response => response.json())
                        .then(res => {
                            console.log(res)
                            if(res.data.virtualLFG>0){
                                this.userInfoList.push({
                                    withDrawableLfg: res.data.withDrawableLfg,
                                    releaseLfgPerDay: res.data.releaseLfgPerDay,
                                    virtualLFG: virtualLFG,
                                    userId: userInfo.userId,
                                    token: token,
                                    multiplyCardNum: userInfo.selfData.multiplyCardNum,
                                    displayName: userInfo.platformData.platformMap[1].displayName,
                                    accountName: userInfo.platformData.platformMap[1].accountName,
                                    tierId: userInfo.selfData.tierId,
                                    power: userInfo.selfData.power,
                                    lfgBalance: userInfo.selfData.lfgBalance,
                                    claimCoin: userInfo.selfData.claimCoin,
                                    points: userInfo.selfData.points,
                                    battlePoints: userInfo.selfData.battlePoints,
                                    battlePointLevel: userInfo.selfData.battlePointLevel,
                                    balance: userInfo.selfData.balance.substring(0, 7),
                                });
                            }
                        });
                }
                console.log("个人集合信息", this.userInfoList);
            },
            //查看指定攻击的club等级信息
            async selectFightDesignation(){
                const token=this.token;
                const lootName=this.lootName;
                const userIdMap=this.userIdMap;
                const designationList=[];
                this.fightDesignationList=[];

                if(this.lootName===''){
                    alert("请输入要攻击对象的key或者名称");
                    return
                }

                await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/searchuser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        cursor: 0,
                        searchKey: lootName,
                        token: token,
                    })
                }).then(response => response.json())
                    .then(res => {
                        res.data.userlist.forEach(e=>{
                            designationList.push(e)
                        })
                    });
                //获取等级、战斗力等信息
                const promises= designationList.map(async e=>{
                    fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_loot_info', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            token: token,
                            employeeId: userIdMap.get(token),
                            tarUserId: e.userId,
                        })
                    }).then(response => response.json())
                        .then(res => {
                            if(res.code!==0){
                                this.fightDesignationList.push({
                                    avatarUrl: e.profile.avatarUrl,
                                    displayName: e.profile.displayName,
                                    accountName: e.profile.accountName,
                                    userId: e.userId,
                                    tierId: e.profile.displayName+"俱乐部处于冷却状态,等级获取不到",
                                    claimCoin: e.profile.displayName+"俱乐部处于冷却状态,矿池总的lfg获取不到",
                                    protectCD: e.profile.displayName+"俱乐部处于冷却状态,目标攻击状态获取不到",
                                    tarPower: "获取不到信息,接口调用报错：报错代码"+res.code,
                                    code:1
                                })
                            }else {
                                this.fightDesignationList.push({
                                    avatarUrl: e.profile.avatarUrl,
                                    displayName: e.profile.displayName,
                                    accountName: e.profile.accountName,
                                    userId: e.userId,
                                    tierId: res.data.tarLevel,
                                    claimCoin: res.data.tarClaimCoin,
                                    protectCD: "可攻击它",
                                    tarPower: res.data.tarPower,
                                    code:0
                                })
                            }
                        });
                });
                await Promise.all(promises);
            },
            //查看可攻击的club等级信息
            async selectFight(){
                const token=this.token;
                const fightArray=[];
                const userIdMap=this.userIdMap;
                this.fightList=[];
                const clubLevel=Number(this.clubLevel);
                const clubLevelHigh=Number(this.clubLevelHigh);

                await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v2/friendtrade_rank_claim', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        cursor: "SRDBYjjHKLzpaQV3MJqwyh",
                        levelRange: [clubLevel,clubLevelHigh],
                        token: token,
                        type: 1,
                    })
                }).then(response => response.json())
                    .then(res => {
                        res.data.unitDatas.forEach(e => {
                            fightArray.push(e)
                        })
                    });
                //获取等级、战斗力等信息
                const promises= fightArray.map(async e=>{
                    fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_loot_info', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            token: token,
                            employeeId: userIdMap.get(token),
                            tarUserId: e.userId,
                        })
                    }).then(response => response.json())
                        .then(res => {
                            if(res.code!==0){
                                this.fightList.push({
                                    avatarUrl: e.profile.avatarUrl,
                                    displayName: e.profile.displayName,
                                    accountName: e.profile.accountName,
                                    userId: e.userId,
                                    tierId: e.tierId,
                                    claimCoin: e.claimCoin,
                                    protectCD: e.protectCD,
                                    tarPower: "获取不到信息,接口调用报错：报错代码"+res.code,
                                })
                            }else {
                                this.fightList.push({
                                    avatarUrl: e.profile.avatarUrl,
                                    displayName: e.profile.displayName,
                                    accountName: e.profile.accountName,
                                    userId: e.userId,
                                    tierId: e.tierId,
                                    claimCoin: e.claimCoin,
                                    protectCD: e.protectCD,
                                    tarPower: res.data.tarPower,
                                })
                            }
                        });
                });
                await Promise.all(promises);
            },
            //查看打架胜率
            async loot_info(employeeId){
                this.showInfo=true;
                const title =this.title;
                const token =this.token;
                const userId =this.userId;
                this.employeeId=employeeId;
                await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_loot_info', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        token: token,
                        employeeId: employeeId,
                        tarUserId: userId,
                    })
                }).then(response => response.json())
                    .then(res => {
                        console.log(res)
                        if(res.code!==0){
                            alert("该"+title+"俱乐部处于冷却状态，换个俱乐部攻打");
                            this.showInfo=false;
                            this.dialogVisible=false;
                            return
                        }else {
                            this.minValue=res.data.defaultPutCoin; //最低消耗lfg
                            this.displayName=res.data.tarProfile.displayName; //攻击对象名称
                            this.accountName=res.data.tarProfile.accountName; //攻击对象购买钥匙ID
                            this.tarLevel=res.data.tarLevel; //等级
                            this.tarPower=res.data.tarPower; //战斗力
                            this.employeePower=res.data.employeePower; //我的战斗力
                            this.employeeLevel=res.data.employeeLevel; //我的等级
                            this.stepValue=res.data.defaultPutCoin; //最低消耗lfg
                            this.succRatio=((res.data.succRatio)*100)+"%"; // 最低胜率
                            this.crackSelfCoin=res.data.crackSelfCoin; //我能赚取lfg数量
                            console.log("打架需要最低消耗lfg",res.data.defaultPutCoin)
                            console.log("成功率",((res.data.succRatio)*100)+"%")
                            console.log("我能赚取",res.data.crackSelfCoin)
                        }
                    });
            },
            //打架
            async loot(){
                const token =this.token;
                const putCoin =this.stepValue;
                const userId =this.userId;
                const employeeId =this.employeeId;
                await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_chain_lootcrack', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        amount: putCoin,
                        costType: 1,
                        token: token,
                        employeeId: employeeId,
                        tarUserId: userId,
                    })
                }).then(response => response.json())
                    .then(res => {
                        const orderId=res.data.orderId;
                        console.log(orderId);
                        // if(res.code!==0){
                        //     alert(this.title+"攻击未执行"+"接口出现错误:错误码"+res.code);
                        // }else {
                        //     if(res.data.succ){
                        //         alert("攻击"+this.title+"成功");
                        //     }else {
                        //         alert("攻击"+this.title+",打输了");
                        //     }
                        //     this.succ=res.data.succ;
                        //     this.battlePoint=res.data.battlePoint;
                        //     this.lootCoin=res.data.lootCoin;
                        //     this.selfTakeCoin=res.data.selfTakeCoin;
                        //     this.lootLog.push(res.data);
                        //     sessionStorage.setItem('lootLogList', JSON.stringify(this.lootLog));
                        // }
                    });
                this.showInfo=false;
                this.dialogVisible=false;
                this.getUserInfo();
            },
            //打架结果
            async friendTrade_Result(orderId){
                const token =this.token;
                await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_chain_orderresult', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        orderId: orderId,
                        token: token,
                    })
                }).then(response => response.json())
                    .then(res => {
                        console.log(res.data)
                    });
            },
            //打架日志
            async lootLogInfo(){
                this.showLogInfo=true;
                const data = sessionStorage.getItem('lootLogList');
                if (data) {
                    this.lootLogList = JSON.parse(data);
                }
            },
            //显示弹窗
            showDialog(e,userId){
                this.title=e+"的俱乐部";
                this.dialogVisible=true;
                this.userId=userId;
                this.userInfo()
            },
            //获取Club的信息
            async userInfo() {
                const token=this.token;
                this.userList=[];
                await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v2/friendtrade_loot_employeelist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        token: token,
                    })
                }).then(response => response.json())
                    .then(res => {
                        res.data.employees.forEach(e => {
                            this.userList.push(e);
                        })
                    });
            },
            //查看需要恢复能量俱乐部
            async restoreEnergyClub(){
                this.showEnergyClub = true;
                const token=this.token;
                this.userEnergyClubList=[];
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
                            this.userEnergyClubList.push(e)
                        })
                    });
            },
            //提取个人lfg代币
            async friendtrade_takecoin() {
                const token=this.token;
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
                this.getUserInfo() // 提币完成更新个人信息
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
            //自动提取个人lfg代币
            async auto_takecoin() {
                const token=this.token;
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
                        this.getUserInfo() // 提币完成更新个人信息
                    });
                setInterval(async () => {
                    await this.auto_takecoin();
                }, (60 * 60 * 1000)+3000); // 即每1小时执行一次
            },
            //booster翻倍卡
            async booster(){
                const token=this.token;
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
                        this.getUserInfo() // booster翻倍卡完成更新个人信息
                    });
            },
            //恢复能量
            async energyClub(e){
                const token=this.token
                //收矿
                await fetch('https://turnup-uw-test-apiv2.turnup.so/api/v1/friendtrade_takeworkcoin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        token: token,
                        employeeId: e.userId,
                    })
                }).then(response => response.json())
                    .then(res => {
                        console.log("收矿",res)
                    });
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
                this.showEnergyClub = false;
                this.restoreEnergyClub();
            },
            //返回首页
            goBack(){
                //页面跳转
                this.$router.push({ path: '/lfgMint' });
            },
            //时间戳转换 格式化时分秒
            formatTime(timestamp) {
                if(timestamp>0){
                    const minutes = Math.floor(timestamp / 60);
                    const seconds = timestamp % 60;
                    return `${minutes} 分 ${seconds} 秒`;
                }else {
                    return ""
                }
            },
            //id 42
            async eth_chainId() {
                await fetch('https://polygon-mainnet.infura.io/v3/4df5e2316331463a9130964bd6078dfa', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: 42,
                        params: [],
                        jsonrpc: "2.0",
                        method: "eth_chainId",
                    })
                }).then(response => response.json())
                    .then(res => {
                        console.log(res.result,"0x89")
                    });
            },
            //id 43
            async eth_getTransactionCount() {
                await fetch('https://polygon-mainnet.infura.io/v3/4df5e2316331463a9130964bd6078dfa', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: 43,
                        params:["0x065c9ff35fdd84bb1e713372e575009d8a34260e", "pending"],
                        jsonrpc: "2.0",
                        method: "eth_getTransactionCount",
                    })
                }).then(response => response.json())
                    .then(res => {
                        console.log(res.result,"0x178")
                    });
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
