// 闲言碎语配置文件
export const gossipConfig = {
    // 设置
    settings: {
        /*
         * 外传（别人是否可以拉取我的内容）
         *
         * 0 - 任何人都可以拉取我的内容
         * 1 - 只有我关联的人可以拉取我的内容
         * */
        public: 0,
        /*
         * 内显（是否展示别人的内容）
         *
         * 0 - 可以展示所有人的内容
         * 1 - 只能展示关联我的人的内容
         * */
        internalDisplay: 0
    },
    // 关联链接（开头需带 https:// 结尾不带 /）
    links: [
        'https://www.xxxxxx.top',
        'https://www.xxxxxx.top',
    ]
}