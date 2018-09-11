<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import {mapState,mapGetters} from 'vuex';
    export default {
        components:{
            vHead, vSidebar
        },
        computed: {
	        ...mapGetters(['abool'])
	     },
        mounted(){
        	const self = this;
        	if(!self.abool){
        		self.$store.dispatch('sessFun',self.sessfun);
        	}
		},
		methods: {
            sessfun(mbool){
            	if(!mbool){
            		this.$router.push('/');
            	}
            }
        }
    }
</script>
