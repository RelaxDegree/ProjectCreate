<template>
    <div class="header-container">
        <div class="l-content">
            <el-button style="margin-right: 20px;" @click="handleMenu" icon="el-icon-menu" size="mini"></el-button>
            <!-- 面包屑 -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{ item.label }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown>
                <span class="el-dropdown-link">
                    头像
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>

</template>
<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {}
    },
    methods: {
        handleMenu() {
            this.$store.commit('CollapseMenu')
        }
    },
    computed: {
        ...mapState({
            tags: state => state.tab.tablist
        })
    }
}
</script>
<style lang="less" scoped>
.header-container {
    padding: 20px;
    background-color: #333;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .text {
        color :aliceblue;
        font-size: 14px;
        margin-left: 10px;
    }
    .r-content {
        .use {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
    .l-content {
        display: flex;
        align-items: center;
        /deep/.el-breadcrumb__item {
            .el-breadcrumb__inner {
                font-weight: normal;
                &.is-link {
                    color: #666;
                }
            }
        }
    }
}
</style>