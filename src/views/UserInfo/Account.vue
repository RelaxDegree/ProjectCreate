<template>
    <el-form>
        <el-form-item label="Name">
            <el-input v-model.trim="user.name" />
        </el-form-item>
        <el-form-item label="OtherInfo">
            <el-input v-model.trim="user.otherInfo" />
        </el-form-item>
        <el-form-item label="Password">
            <el-input placeholder="请输入密码" v-model.trim="user.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit">Update</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    props: {
        user: {
            type: Object,
            default: () => {
                return {
                    name: '',
                    email: '',
                    otherInfo: '',
                    password
                }
            }
        }
    },
    methods: {
        submit() {
            this.$message({
                message: 'User information has been updated successfully',
                type: 'success',
                duration: 5 * 1000
            })
        }
    }
}
</script>
