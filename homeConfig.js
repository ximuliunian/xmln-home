// 配置项
export default {
    // 背景图片 - 可以是链接或者相对路径
    backImage: [
        "https://img.ximuliunian.top/壁纸/6/10.png",
        "https://img.ximuliunian.top/壁纸/6/11.png",
        "https://img.ximuliunian.top/壁纸/6/12.png",
        "https://img.ximuliunian.top/壁纸/7/1.png",
        "https://img.ximuliunian.top/壁纸/7/3.png",
        "https://img.ximuliunian.top/壁纸/7/4.png",
        "https://img.ximuliunian.top/壁纸/7/5.png",
        "https://img.ximuliunian.top/壁纸/7/7.png",
        "https://img.ximuliunian.top/壁纸/7/8.png",
        "https://img.ximuliunian.top/壁纸/7/9.png",
        "https://img.ximuliunian.top/壁纸/7/10.png",
        "https://img.ximuliunian.top/壁纸/7/11.png",
        "https://img.ximuliunian.top/壁纸/7/12.png"
    ],

    // 左半屏内容
    left: {
        // 昵称
        name: '曦暮流年',
        // 头像
        avatar: 'https://www.ximuliunian.top/images/icon/logo.png',
        // 简介
        description: '这是一个简介 : 这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介',

        // 社交链接
        socials: {
            enable: true,
            // 链接内容 - 最多8个
            info: [
                {
                    name: 'BiliBili1',
                    url: 'https://space.bilibili.com/1304924540',
                    icon: 'icon-bilibili'
                }, {
                    name: 'BiliBili2',
                    url: 'https://space.bilibili.com/1304924540',
                    icon: 'icon-bilibili'
                }, {
                    name: 'BiliBili3',
                    url: 'https://space.bilibili.com/1304924540',
                    icon: 'icon-bilibili'
                }, {
                    name: 'BiliBili4',
                    url: 'https://space.bilibili.com/1304924540',
                    icon: 'icon-bilibili'
                }, {
                    name: 'BiliBili5',
                    url: 'https://space.bilibili.com/1304924540',
                    icon: 'icon-bilibili'
                }, {
                    name: 'BiliBili6',
                    url: 'https://space.bilibili.com/1304924540',
                    icon: 'icon-bilibili'
                }, {
                    name: 'BiliBili7',
                    url: 'https://space.bilibili.com/1304924540',
                    icon: 'icon-bilibili'
                }, {
                    name: 'BiliBili8',
                    url: 'https://space.bilibili.com/1304924540',
                    icon: 'icon-bilibili'
                }
            ]
        },
        // 是否开启项目列表
        projectEnable: true,
        // 是否开启关于
        aboutEnable: true,
    },

    // 建站时间
    buildTime: '2022-01-21',

    // 备案信息
    ICP: {
        enable: true,
        // 备案号
        info: '豫ICP备2024053500号'
    },

    // 右半屏内容
    right: {
        // 主页
        homeInfo: {
            // 轮播图
            banner: {
                enable: true,
                // 最多5个
                info: [
                    "https://img.ximuliunian.top/壁纸/6/10.png",
                    "https://img.ximuliunian.top/壁纸/6/11.png",
                    "https://img.ximuliunian.top/壁纸/6/12.png",
                    "https://img.ximuliunian.top/壁纸/7/1.png",
                    "https://img.ximuliunian.top/壁纸/7/3.png"
                ]
            },
            // 站点导航
            siteNavs: {
                enable: true,
                info: [
                    {
                        name: 'bilibili',
                        url: 'https://space.bilibili.com/1304924540',
                        icon: 'icon-bilibili'
                    }, {
                        name: 'bilibili',
                        url: 'https://space.bilibili.com/1304924540',
                        icon: 'icon-bilibili'
                    }, {
                        name: 'bilibili',
                        url: 'https://space.bilibili.com/1304924540',
                        icon: 'icon-bilibili'
                    }, {
                        name: 'bilibili',
                        url: 'https://space.bilibili.com/1304924540',
                        icon: 'icon-bilibili'
                    }
                ]
            },
            // 简介
            selfInfo: {
                enable: true,
                info: [
                    "h1:这是一个标题",
                    "h2:这是一个标题",
                    "h3:这是一个标题",
                    "p:这是一个内容,所以这里需要换行看了大家会看到哈克联合反恐老师看了返回看了看还能发克里斯蒂和罚款了事老客户收到付款了ask厉害阿斯蒂芬库里和卡戴珊反馈按时灯笼裤的时刻分手快乐和但是风口浪尖",
                    "p:这是一个内容",
                    "p:这是一个内容",
                    "p:这是一个内容",
                    "p:这是一个内容",
                    "img:https://img.ximuliunian.top/壁纸/6/10.png",
                ]
            }
        },

        // 项目 - 想要成果展示需要在 left.projectEnable 中开启
        projectInfo: [
            {
                name: '',
                description: '',
                url: '',
                icon: ''
            }
        ],

        // 关于 - 想要成果展示需要在 left.aboutEnable 中开启
        aboutInfo: [
            "p:这是一个关于信息",
            "img:https://cdn.jsdelivr.net/gh/ximuliunian/home@main/public/img/avatar.jpg"
        ]
    }
}
