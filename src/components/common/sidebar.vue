<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" background-color="#324158" text-color="#c8d7ee" unique-opened router>
            <el-menu-item index="/readme">
                <i class="el-icon-tickets"></i>自述
            </el-menu-item>
            <el-submenu index="5">
                <template slot="title"><i class="el-icon-menu"></i>平台用户</template>
                <el-menu-item index="/usertable" v-if="alist">用户列表</el-menu-item>
            </el-submenu>
            <el-submenu index="6">
                <template slot="title"><i class="el-icon-setting"></i>管理操作</template>
                <el-menu-item index="/admuser">修改密码</el-menu-item>
                <el-menu-item v-if="admin" index="/admadd">添加管理员</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
	import {mapState,mapGetters} from 'vuex';
    export default {
        computed:{
        	...mapGetters(['alist','admin']),
            onRoutes(){
            	let mRou = this.$route.path.replace('/','');
                return '/'+mRou;
            }
        }
    }
</script>
<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
    i{
    	color: #c8d7ee;
    }
</style>
