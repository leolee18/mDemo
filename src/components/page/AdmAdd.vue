<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i>　管理操作</el-breadcrumb-item>
                <el-breadcrumb-item>添加管理员</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="用户名">
                    <el-input v-model="form.mname" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="form.mnick" placeholder="请输入昵称"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="form.mmima" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="权限">
                    <el-select v-model="purArr" multiple placeholder="请选择权限">
                    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">添加</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="tAdminList" border style="width: 100%;background-color:#fefefe;">
            <el-table-column prop="date" label="日期" sortable width="150">
            </el-table-column>
            <el-table-column prop="admin" label="用户名" width="200">
            </el-table-column>
            <el-table-column prop="purview" label="权限"　width="250">
            </el-table-column>
            <el-table-column prop="nick" label="昵称"　>
            </el-table-column>
            <el-table-column label="操作" width="130">
                <template slot-scope="scope">
                	<el-button :disabled="scope.row.mbool" size="small" type="warning" @click="removeAdm(scope.row)"><i class="el-icon-delete"></i> 删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
	import {mapGetters} from 'vuex';
    export default {
        data: function(){
            return {
                form: {
                    mname: '',
                    mnick: '',
                    mmima: ''
                },
                options: [{
		          value: 'ulist',
		          label: '用户列表'
		        }, {
		          value: 'addv',
		          label: '添加视频'
		        }],
                purArr:[]
            }
        },
        computed:{
			...mapGetters([
				'adminlist',
			]),
			tAdminList(){
				var self = this;
				self.adminlist.forEach(function(val,ind){
					if(val.purview.indexOf('admin') != -1){
						val.mbool = true;
					}else{
						val.mbool = false;
					}
		    	});
				return self.adminlist;
			}
		},
        mounted(){
		    var self = this;
        	self.$store.dispatch('adminList');
		},
        methods: {
            onSubmit() {
            	const self = this;
            	if(self.form.mname == ""){
					this.$message.error('请输入您的用户名！');
					return false;
				}
				if(self.form.mnick == ""){
					this.$message.error('请输入您的昵称！');
					return false;
				}
				if(self.form.mmima == ""){
					this.$message.error('请再次输入您的密码！');
					return false;
				}
				if(self.purArr.length <= 0){
					this.$message.error('请选择一个权限！');
					return false;
				}
				var sendObj = {
					action:'add',
					mname:self.form.mname,
					mnick:self.form.mnick,
					mmima:self.form.mmima,
					mpur:self.purArr.join(','),
					sessfun:self.sessfun
				}
                self.$store.dispatch('addAdmin',sendObj);
           	},
           	sessfun(mbool){
            	if(mbool){
            		this.form.mname = '';
		  			this.form.mnick = '';
		  			this.form.mmima = '';
		  			this.purArr = [];
		  			this.$message.success('添加成功！');
		  			this.$store.dispatch('adminList');
            	}else{
            		this.$message.error('添加失败！');
            	}
            },
            removeAdm(row){
            	const self = this;
            	let sendObj = {
					action:'remove',
					aId:row.a_id,
					sessfun:self.sessRemfun
				}
            	self.$store.dispatch('removeAdmin',sendObj);
            },
            sessRemfun(mbool,mStr=''){
            	if(mbool){
		  			this.$message.success('删除成功！');
		  			this.$store.dispatch('adminList');
            	}else{
            		this.$message.error('删除失败！'+mStr);
            	}
            }
        }
    }
</script>

<style scoped>
	.table{
		width: 1000px;
	}
	
</style>
