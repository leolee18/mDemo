<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i>　管理操作</el-breadcrumb-item>
                <el-breadcrumb-item>修改密码</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="旧密码">
                    <el-input type="password" v-model="form.mimal" placeholder="请输入旧密码"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input type="password" v-model="form.miman" placeholder="请输入新密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input type="password" v-model="form.mimaq" placeholder="请输再输入一次"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                form: {
                    mimal: '',
                    miman: '',
                    mimaq: ''
                }
            }
        },
        methods: {
            onSubmit() {
            	const self = this;
            	if(self.form.mimal == ""){
					this.$message.error('请输入您的旧密码！');
					return false;
				}
				if(self.form.miman == ""){
					this.$message.error('请输入您的新密码！');
					return false;
				}
				if(self.form.mimaq == ""){
					this.$message.error('请再次输入您的新密码！');
					return false;
				}
				if(self.form.miman != self.form.mimaq){
					this.$message.error('两次输入密码不一致！');
					return false;
				}
				var sendObj = {
					oldPassw:self.form.mimal,
					newPassw:self.form.miman,
					sessfun:self.sessfun
				}
                self.$store.dispatch('upPassFun',sendObj);
           	},
           	sessfun(mbool){
            	if(mbool){
            		this.form.mimal = '';
		  			this.form.miman = '';
		  			this.form.mimaq = '';
		  			this.$message.success('修改成功！');
            	}else{
            		this.$message.error('修改失败！');
            	}
            }
        }
    }
</script>