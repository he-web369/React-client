/*
用户路由
 */
import React,{Component} from 'react'
import {Card, Table, Button, Modal, message,Icon} from 'antd'
import {PAGE_SIZE} from "../../utils/constants";
import LinkButton from "../../components/link-button/linkButton";

import {reqUsers, reqDeleteUser, reqAddOrUpdateUser} from '../../api/index'
import {formateDate} from "../../utils/dateUtils";
import AddOrUpdateUser from "./add-update-user";

export default class User extends Component{
    state={
        users:[],
        roles:[],
        isShow:false
    }
    initColumns=()=>{
        this.columns=[
            {
                title:'用户名',
                dataIndex:'username'
            },
            {
                title:'邮箱',
                dataIndex: 'email'
            },
            {
                title:'电话',
                dataIndex:'phone'
            },
            {
                title:'注册时间',
                dataIndex:'create_time',
                render:formateDate
            },
            {
                title:'所属角色',
                dataIndex:'role_id',
                render:(role_id)=>this.roleNames[role_id]
            },
            {
                title:'操作',
                render:(user)=>(
                    <span>
                        <LinkButton onClick={()=>this.showUpdate(user)}>修改</LinkButton>
                        <LinkButton onClick={()=>this.deleteUser(user)}>删除</LinkButton>
                    </span>
                )
            }
        ]
    }
    showAdd=()=>{
        this.user=null
        this.setState({isShow:true})
    }
    //显示修改界面
    showUpdate=(user)=>{
        this.user=user
        this.setState({isShow:true})
    }
    //删除用户
    deleteUser=(user)=>{
        Modal.confirm({
            title:`确认删除用户${user.username}吗？`,
            onOk:async ()=>{
                const result=await reqDeleteUser(user._id)
                if(result.status===0){
                    message.success('删除用户成功')
                    this.getUsers()
                }else{
                    message.error('删除用户失败')
                }
            },
            okText:'确定',
            cancelText:'取消'
        })
    }
    //根据roles的数组 生成 {_id:name}的对象
    initRoleNames=(roles)=>{
        const roleNames= roles.reduce((pre,item)=>{
            pre[item._id]=item.name
           return pre
        },{})
        this.roleNames=roleNames
    }
    getUsers=async ()=>{
        const result=await reqUsers()
        if(result.status===0){
            const {users,roles}=result.data
            this.initRoleNames(roles)
            this.setState({users,roles})
        }else{
            message.error('获取用户列表失败')
        }
    }
    //添加或更新用户
    addOrUpdateUser=()=>{
        this.form.validateFields(async (errors, values) => {
            if(!errors){
                this.form.resetFields()
                this.setState({isShow:false})
                if(this.user){
                    values._id=this.user._id
                }
                const result=await reqAddOrUpdateUser(values)
                if(result.status===0){
                    message.success(`${values._id?'更新':'添加'}用户成功`)
                    this.getUsers()
                }
            }
        })
    }
    handleCancle=()=>{
        this.setState({isShow:false})
        this.form.resetFields()
    }
    constructor(props) {
        super(props);
        this.initColumns()
    }
    componentDidMount() {
        this.getUsers()
    }

    render(){
        const {users,isShow,roles}=this.state
        const user=this.user||{}
        const title=(
            <Button  type='primary' onClick={this.showAdd}>{<Icon type='plus'/>}添加用户</Button>
        )
        return (
            <Card title={title}>
                <Table
                    bordered
                    rowKey='_id'
                    dataSource={users}
                    columns={this.columns}
                    pagination={{defaultPageSize:PAGE_SIZE}}
                />
                <Modal
                    title={user._id?'修改用户':'添加用户'}
                    visible={isShow}
                    onOk={this.addOrUpdateUser}
                    onCancel={this.handleCancle}
                    okText='确定'
                    cancelText='取消'
                >
                    <AddOrUpdateUser
                        setForm={(form)=>this.form=form}
                        roles={roles}
                        user={user}
                    />
                </Modal>
            </Card>
        )
    }
}