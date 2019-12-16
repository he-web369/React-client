/*
角色路由
 */
import React,{Component} from 'react'
import {Card, Button, Table, Modal, message} from 'antd'
import {PAGE_SIZE} from "../../utils/constants";
import {reqRoles, reqAddRole, reqUpdateRole} from "../../api";

import AddForm from "./add-form";
import AuthForm from './auth-form'
import memoryUtils from "../../utils/memoryUtils";
import {formateDate} from "../../utils/dateUtils";
import storageUtils from "../../utils/storageUtils";

export default class Role extends Component{

    state={
        roles:[],
        role:{},
        isShowAdd:false,
        isShowAuth:false
    }
    initColumns=()=>{
        this.columns=[
            {
                title:'角色名称',
                dataIndex:'name'
            },
            {
                title:'创建时间',
                dataIndex:'create_time',
                render:formateDate
            },
            {
                title:'授权时间',
                dataIndex:'auth_time',
                render:formateDate
            },
            {
                title:'授权人',
                dataIndex:'auth_name'
            },
        ]
    }
    onRow=(role)=>{
        return {
            onClick:(event)=>{
                this.setState({
                    role
                })
            }
        }
    }

    getRoles=async ()=>{
        const result=await reqRoles()
        if(result.status===0){
            const roles=result.data
            this.setState({
                roles
            })
        }
    }
    addRole= ()=>{
        this.form.validateFields(async (errors, values) => {
            if(!errors){
                this.setState({isShowAdd:false})
                const {roleName}=values
                this.form.resetFields()
                const result=await reqAddRole(roleName)
                if(result.status===0){
                    message.success('添加成功')
                    const role=result.data
                    this.setState({
                        roles:[...this.state.roles,role]
                    })
                }else{
                    message.error('添加失败')
                }
            }
        })
    }
    updateRole=async ()=>{
        this.setState({
            isShowAuth:false
        })
        const {role}=this.state
        const menus=this.af.current.getRoleMenus()
        role.menus=menus
        role.auth_name=memoryUtils.user.username
        role.auth_time=Date.now()
        const result=await reqUpdateRole(role)
        if(result.status===0){
            message.success('更新权限成功')
            if(role._id===memoryUtils.user.role_id){
                memoryUtils.user={}
                storageUtils.removeUser()
                this.props.history.replace('/login')
                message.success('当前用户权限更新成功，请重新登录')
            }else{
                this.setState({
                    roles:[...this.state.roles]
                })
            }
        }else{
            message.error('更新权限失败')
        }
    }
    handleCancle=()=>{
        this.setState({isShowAdd:false})
        this.form.resetFields()
    }
    constructor(props) {
        super(props);
        this.initColumns()
        this.af=React.createRef()
    }
    componentDidMount() {
        this.getRoles()
    }

    render(){
        const {roles,role,isShowAdd,isShowAuth}=this.state
        const title=(
            <span>
                <Button type='primary' onClick={()=>this.setState({isShowAdd: true})}>创建角色</Button>&nbsp;&nbsp;
                <Button
                    type='primary'
                    disabled={!role._id}
                    onClick={()=>this.setState({isShowAuth: true})}
                >设置角色权限</Button>
            </span>
        )
        return (
            <Card title={title}>
                <Table
                    bordered
                    rowKey='_id'
                    dataSource={roles}
                    columns={this.columns}
                    pagination={{defaultPageSize:PAGE_SIZE}}
                    rowSelection={{type:'radio',
                        selectedRowKeys:[role._id],
                        onSelect:(role)=>{
                            this.setState({role})
                        }
                    }}
                    onRow={this.onRow}
                />
                <Modal
                    title='添加角色'
                    visible={isShowAdd}
                    onOk={this.addRole}
                    onCancel={this.handleCancle}
                    okText='确定'
                    cancelText='取消'
                >
                    <AddForm
                        setForm={(form)=>this.form=form}
                        roles={roles}
                    />
                </Modal>
                <Modal
                    title='设置角色权限'
                    visible={isShowAuth}
                    onOk={this.updateRole}
                    onCancel={()=>this.setState({isShowAuth:false})}
                    okText='确定'
                    cancelText='取消'
                >
                    <AuthForm
                        ref={this.af}
                        role={role}
                    />
                </Modal>
            </Card>
        )
    }
}