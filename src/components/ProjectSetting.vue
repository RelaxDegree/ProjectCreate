<template>

        <!-- 默认打开的阶段栏 -->
    <el-container style="height: 535px;">
      <el-header>
        <p>项目配置</p>
      </el-header>

      <el-main>
        <el-menu @open="handleOpen"> 
          <el-submenu index="abcd" style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
            <template slot="title"><i class="el-icon-menu"></i>项目基本信息</template>
            <div style="margin: 20px 0;">
              <el-form label-width="70px"  :model="projectMessage">
                <el-form-item label="项目名称">
                  <el-input v-model="projectMessage.projectName"></el-input>
                </el-form-item>
                <el-form-item label="负责人">
                  <el-input v-model="projectMessage.projectDesigner"></el-input>
                </el-form-item>
                
                <div class="block">
                  <el-date-picker
                    v-model="projectMessage.projectTime"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="发布日期"
                    end-placeholder="结束日期"
                    align="right">
                  </el-date-picker>
                </div>
                <div><p></p></div>
                <el-form-item label="项目描述">
                  <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入内容"
                  v-model="projectMessage.projectDetail">
                </el-input>
                </el-form-item>
                
              </el-form>
            </div>
          </el-submenu>

          <project-stage
                  v-for="(s,index) of this.$store.state.stage"
                  :key="(index+1).toString()"
                  :stageNum="(index+1).toString()"
                  :thisStage="s"
                  @deleteStage="deleteStage"
          ></project-stage>
        </el-menu>
      </el-main>



      <el-footer>
        <p height="10px"></p>
        <el-row>
          <el-col :span="2" :offset="0">
            <div>
              <el-avatar icon="el-icon-user-solid" ></el-avatar>
            </div>
          </el-col>
          <el-col :span="16" :offset="6">
            <div>
              <el-button plain @click="openForm" style="margin-right: 10px">+</el-button>

              <el-dialog title="阶段创建" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="阶段名称" :label-width="formLabelWidth">
                        <el-col :span="11">
                            <el-input v-model="form.name" style="width : 400px"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="阶段起止时间" :label-width="formLabelWidth">
                        <el-col :span="11">
                        <div class="block" style="width : 100%">
                            <el-date-picker
                              v-model="form.time"
                              type="datetimerange"
                              range-separator="至"
                              start-placeholder="发布日期"
                              end-placeholder="结束日期"
                              align="right">
                            </el-date-picker>
                        </div>
                    </el-col>
                    </el-form-item>
                    <el-form-item label="阶段描述" :label-width="formLabelWidth">
                        <el-input
                          type="textarea"
                          :autosize="{ minRows: 2, maxRows: 4}"
                          placeholder="请输入内容"
                          v-model="form.detail">
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click.stop="closeForm">取 消</el-button>
                    <el-button type="primary" @click.stop="getFormInfo">确 定</el-button>
                </div>
            </el-dialog>

              <el-button type="primary" @click="save">保存项目</el-button>
              <el-button type="success" @click="push">发布项目</el-button>
            </div>
          </el-col>
        </el-row>
          
      </el-footer>

    </el-container>
  
  
</template>

<script>
import ProjectStage from './ProjectStage.vue';
import store from '../store/index';
export default {
    store,
    name : "proj-set",
    data(){
      return {
        dialogFormVisible: false,
        formLabelWidth: '120px',

        stage:[],
        task:[],
        projectMessage: {
          projectID: "56",
          projectDesignerName: '朱晓东',
          projectName: "吉林大学业务流程系统软件项目",
          projectDesignerID: 450000197704085570,
          projectCreateTime: "1977-01-14 13:19:52",
          projectEmitTime: "2022-11-21 21:00:45",
          projectDetail:'2020级软件工程课程大作业',
          projectSaveTime: "2022-11-21 21:00:45",
          projectIsdone: false,
        },
        form :{
          time: '',
          name: '',
          detail: '',
        },
      }
    },
    components : {ProjectStage},
    methods : {
        /*阶段表收集并传入Create*/
        getFormInfo(){
            const oneStage = {  stageName:this.form.name,
                                stageDetail:this.form.detail,
                                stageIsdone:false,
                                stageTime:this.form.time,}
            // this.stage.push(oneStage)
            this.$store.commit('ADDSTAGE',oneStage);
            /*this.$emit('addStage',oneStage)*/
            this.closeForm()
        },
        /*关闭dialog*/
        closeForm(){
            this.form ={time: '',name: '',detail:''}
            this.dialogFormVisible = false;
        },
        /*打开dialog*/
        openForm(){
            if (!this.dialogFormVisible)
                this.dialogFormVisible = true;
        },
        /*删除某一个阶段*/
        deleteStage(value){
            this.stage = this.stage.filter((p)=>{
                return p !== value
            })
        },
        handleOpen(key, keyPath) {
            this.$store.commit('SETNOWSTAGE', key)
        },


        save(){
            this.$message({
            type: 'success',
            message: '项目保存成功!'
          });
        },
        push(){
            this.$message({
            type: 'success',
            message: '项目发布成功!'
          });
        },
    }

}
</script>

<style>

</style>