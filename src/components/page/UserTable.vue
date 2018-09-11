<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 平台用户</el-breadcrumb-item>
                <el-breadcrumb-item>用户列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        
        <div class="form-box">
			<el-form ref="form" :model="form" label-width="80px">
				<el-input :placeholder="inppla" v-model="form.name" class="input-with-select">
					<template slot="prepend">关键信息</template>
				    <el-button slot="append" @click="onSubmit"><i class="el-icon-search"></i></el-button>
				</el-input>
	        </el-form>
        </div>
        
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="日期" sortable width="150"></el-table-column>
            <el-table-column prop="nickName" label="昵称" ></el-table-column>
            <el-table-column prop="avatarUrl" label="头像" >
            	<template slot-scope="scope" >
            		<el-button type="text" @click="pvImg(scope.$index, scope.row.avatarUrl)">查看</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="province" label="城市"　width="300" :formatter="formatterCity">
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="mPageNo"
                :page-size="20"
                layout="prev,pager,next"
                :total="totalNum">
            </el-pagination>
        </div>
        
    </div>
</template>

<script>
	import {mapGetters} from 'vuex';
	
    export default {
        data() {
            return {
            	form: {
                    name: ''
              	},
              	inppla:'手机号 / 用户昵称',
              	dvalue:'',
              	dshow:false,
              	mPageNo:1
            }
        },
        computed:{
			...mapGetters([
				'totalNum',
				'tableData',
				'pageNo'
			])
		},
        mounted(){
		    this.init();
		},
        methods: {
        	init(){
        		var self = this;
        		self.$store.dispatch('userTotal');
		        self.$store.dispatch('userList');
		    },
            handleCurrentChange(val){
            	this.$store.dispatch('pageNo',(parseInt(val)-1));
			},
            onSubmit() {
            	var self = this;
            	if(self.form.name != ''){
            		self.$store.dispatch('userLike',self.form);
            	}else{
            		this.$message.error('请输入搜索内容！');
            		this.init();
            	}
            },
            formatterCity: function(row, column, cellValue) {
            	var mStr = row.province;
            	if(mStr && mStr != ''){
            		if(row.city && row.city != ''){
            			mStr = mStr+','+row.city;
            		}
            	}
		        return mStr;
		    },
		    pvImg(index, imgUrl){
            	this.$alert('<img src="'+imgUrl+'" width="300px"></img>', '显示', {showConfirmButton:false,dangerouslyUseHTMLString: true,callback:function(){}});
            }
        }
    }
</script>
<style type="text/css" scoped>
	.form-box{
		position: relative;
		width: 500px;
		height: 50px;
	}
	.table{
		width: 900px;
	}
	.el-select{
	    width: 110px;
	}
	.mdate .el-input__inner{
		border-width: 0;
		height: 30px;
	}
</style>