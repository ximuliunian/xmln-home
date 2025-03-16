import {gossipConfig} from "../../config/GossipConfiguration.js";
import {getGossipMain, getGossipMainByUrl, getMainByUrl} from "@/api/rootAPI.js";
import {reactive} from "vue";
import commonlyFunctions from "@/composition/commonlyFunctions.js";
import localStorage from "@/composition/localStorage.js";
// 初始化访问数据
const initQueryData = async () => {
    // 清空外传缓存
    localStorage.setContent(localStorage.menu.GOSSIP_PUBLIC_BOOL, {})

    const rawData = reactive({}); // 原始数据

    let flag = false;   // 判断域主的闲言碎语主文件是否请求下来了

    // 请求域主的主文件
    getGossipMain().then(resp => {
        if (typeof resp !== 'object') return
        rawData[location.host] = resp
        flag = true;
        handleGossipContentListData(rawData)
    })

    // 请求域主关联的人的主文件
    gossipConfig.links.forEach(link => getGossipMainByUrl(link).then(resp => {
        if (typeof resp !== 'object') return
        rawData[new URL(link).host] = resp
        // 主文件没请求下来不需要处理数据
        if (flag) handleGossipContentListData(rawData)
    }))

}

// 处理闲言碎语内容数据
function handleGossipContentListData(data) {
    // 渲染数据
    const contentList = localStorage.getContent(localStorage.menu.GOSSIP_CONTENT_LIST) || [];   // 闲言碎语内容列表
    let gossipPublic = localStorage.getContent(localStorage.menu.GOSSIP_PUBLIC_BOOL) || {}; // 外传开关

    // 过滤出渲染数据
    for (const key in data) {
        const d = data[key];

        // 如果条件成立，则需要去人家的关联人列表中看看自己是否存在
        if (d.settings.public == 1 || gossipConfig.settings.internalDisplay == 1) {

            // 看看有没有缓存
            if (gossipPublic && gossipPublic[key]) {
                // 如果缓存的开关是 false，则代表 “我” 不在人家的关联人列表中
                if (!gossipPublic[key].flag) continue
            } else {

                let flag = true;
                for (let link in d.links) {
                    if (new URL(link).host === location.host) {
                        flag = false;
                        break
                    }
                }

                // 如果循环下来开关还是 true 则代表 “我” 不在请求人的关联人列表中
                if (flag) {
                    gossipPublic[key] = {flag: false}
                    continue
                } else gossipPublic[key] = {flag: true}
            }
        } else {
            // 不是 1 的话那么就是 0,表示所有人都可以拉取
            gossipPublic[key] = {flag: true}
        }

        // 保存缓存
        localStorage.setContent(localStorage.menu.GOSSIP_PUBLIC_BOOL, gossipPublic)

        // 添加数据
        d.list.forEach(item => {
            const searchElement = `${item}-${key}`;
            // 对于已存在的数据不在重复添加
            if (contentList.includes(searchElement)) return
            contentList.push(searchElement)
        })
    }

    // 排序并保存到本地
    commonlyFunctions.sort(contentList)
    localStorage.setContent(localStorage.menu.GOSSIP_CONTENT_LIST, contentList)
}

// 初始化用户信息
const initUserInfoData = () => {
    let userInfo = localStorage.getContent(localStorage.menu.GOSSIP_USER_LIST) || {};

    // 请求域主关联的人的主文件
    gossipConfig.links.forEach(link => getMainByUrl(link).then(resp => {
        if (typeof resp !== 'object') return
        resp.avatar = `${link}/${resp.avatar}`
        userInfo[new URL(link).host] = resp
        localStorage.setContent(localStorage.menu.GOSSIP_USER_LIST, userInfo)
    }))
}

// 导出
export default {
    initQueryData,
    initUserInfoData
}