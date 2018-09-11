<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统{{auser}}</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" ></el-input>
                </el-form-item>
                <el-form-item prop="yanzheng">
                	<el-input placeholder="验证码" v-model="ruleForm.yanzheng">
					    <template slot="append"><img class="user-logo" :src="yanZimg"></template>
					</el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;color:#999;">请输入你的用户名和密码</p>
            </el-form>
        </div>
    </div>
</template>

<script>
	import ser from '../../server/server';
	import {mapGetters} from 'vuex';
	
    export default {
        data: function(){
            return {
            	yanZimg:ser.serAdd()+'admin/code/code_math.php?' + Math.random(),
                ruleForm: {
                    username: 'adminLeo',
                    password: '123',
                    yanzheng:　''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        computed:{
			...mapGetters([
				'auser'
			])
		},
        methods: {
            submitForm(formName) {
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                    	self.ruleForm.sessfun = self.sessfun;
                    	self.$store.dispatch('loginFun',self.ruleForm);
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            sessfun(mbool){
            	if(mbool){
            		this.$router.push('/readme');
            	}else{
            		this.$message.error('登录失败');
            	}
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:220px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
    .user-logo{
    	display: block;
    }
</style>