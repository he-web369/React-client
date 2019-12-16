/*
品类路由
 */
import React,{Component} from 'react'
import {Card, Table, Button, Icon, message,Modal} from 'antd'
import LinkButton from "../../components/link-button/linkButton";

import {reqAddCategory, reqCategoryList, reqUpdateCategory,reqRemoveCategory} from '../../api/index'
import AddForm from "./add-form";
import UpdateForm from "./update-form";

export default class Category extends Component{
    state={
        categorys:[],
        loading:false,
        parentId:'0',
        parentName:'',
        subCategorys:[],
        showStatus:0
    }
    //初始化Table所有列的数组
    initColumns=()=>{
        this.columns=[
            {
                title:'分类名称',
                dataIndex:'name',
            },
            {
                title:'操作',
                width:300,
                render:(category)=>(
                    <span>
                        <LinkButton onClick={()=>this.showUpdate(category)}>修改分类</LinkButton>
                        <LinkButton onClick={()=>this.showRemove(category)}>删除分类</LinkButton>
                        {this.state.parentId==='0'?<LinkButton onClick={()=>this.showSubCategorys(category)}>查看子分类</LinkButton>:null}
                    </span>
                )
            }
        ]
    }
    //显示二级分类列表
    showSubCategorys=(category)=>{
        this.setState({
            parentId:category._id,
            parentName:category.name
        },()=>{
            this.getCategory()
        })
    }
    //显示一级分类列表
    showCategorys=()=>{
        this.setState({
            parentId:'0',
            parentName:'',
            subCategorys:[]
        })
    }
    //响应点击取消
    handleCancer=()=>{
        this.form.resetFields()
        this.setState({
            showStatus:0
        })
    }
    //显示添加的对话框
    showAdd=()=>{
        this.setState({
            showStatus:1
        })
    }
    //添加分类
    addCategory= ()=>{
        this.form.validateFields(async(err,values)=> {
            if(!err){
                this.setState({showStatus: 0})
                const {categoryName, parentId} = values
                this.form.resetFields()
                const result = await reqAddCategory({categoryName, parentId})
                if (result.status === 0) {
                    if (parentId === this.state.parentId) {
                        this.getCategory()
                    } else if (parentId === '0') {
                        this.getCategory('0')
                    }
                }else{
                    message.error(result.msg)
                }
            }
        })
    }
    //显示更新分类的确认框
    showUpdate=(category)=>{
        this.category=category
        this.setState({
            showStatus:2
        })
    }
    //更新分类
    updateCategory= ()=>{
        this.form.validateFields(async(err,values)=>{
            if(!err){
                this.setState({
                    showStatus:0
                })
                const categoryId=this.category._id
                const {categoryName}=values
                //清除输入数据
                this.form.resetFields()
                const result=await reqUpdateCategory({categoryId,categoryName})
                if(result.status===0){
                    this.getCategory()
                }else{
                    message.error(result.msg)
                }
            }
        })
    }
    showRemove=(category)=>{
        this.category=category
        this.setState({
            showStatus:3
        })
    }
    //删除分类
    removeCategory=async ()=>{
        this.setState({
            showStatus:0
        })
        const {parentId}=this.category
        const categoryId=this.category._id
        const categoryName=this.category.name
        //清除输入数据
        const result=await reqRemoveCategory({parentId,categoryName,categoryId})
        if(result.status===0){
            if (parentId === this.state.parentId) {
                this.getCategory()
            } else if (parentId === '0') {
                this.getCategory('0')
            }
        }else{
            message.error(result.msg)
        }
    }
    constructor(props) {
        super(props);
        this.initColumns()
    }
    //发异步ajax请求
    componentDidMount() {
        this.getCategory()
    }
    getCategory= async (parentId)=>{
        this.setState({loading:true})
        parentId=parentId||this.state.parentId
        const result= await reqCategoryList(parentId)
        this.setState({loading:false})
        if(result.status===0){
            const categorys=result.data
            if(parentId==='0'){
                this.setState({
                    categorys
                })
            }else{
                this.setState({
                    subCategorys:categorys
                })
            }
        }else{
            message.error('获取用户列表失败')
        }
    }


    render(){
        const {categorys,loading,parentId,parentName,subCategorys,showStatus}=this.state
        const category=this.category||{}
        const title=parentId==='0'?'一级分类列表':(
            <span>
                <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
                <Icon type='arrow-right'/>&nbsp;
                <span>{parentName}</span>
            </span>
        )
        const extra=(
                <Button type='primary' onClick={this.showAdd} ><Icon type='plus'/>添加</Button>
            )
        return (
            <Card title={title} extra={extra} >
                <Table bordered
                    dataSource={parentId=== "0" ? categorys : subCategorys}
                    columns={this.columns}
                       loading={loading}
                       rowKey='_id'
                       pagination={{defaultPageSize:5,showQuickJumper:true}}
                />
                <Modal
                    title='添加分类'
                    visible={showStatus===1}
                    onOk={this.addCategory}
                    onCancel={this.handleCancer}
                    okText='确定'
                    cancelText='取消'
                >
                    <AddForm categorys={categorys}
                             parentId={parentId}
                             setForm={form=>this.form=form}
                    />
                </Modal>
                <Modal
                    title='删除分类'
                    visible={showStatus===3}
                    onOk={this.removeCategory}
                    onCancel={()=>{
                        this.setState({showStatus:0})
                    }
                    }
                    okText='确定'
                    cancelText='取消'
                >
                    <p>确定删除吗？</p>
                </Modal>
                <Modal
                    title='修改分类'
                    visible={showStatus===2}
                    onOk={this.updateCategory}
                    onCancel={this.handleCancer}
                    okText='确定'
                    cancelText='取消'
                >
                    <UpdateForm
                        categoryName={category.name}
                        setForm={(form)=>this.form=form}
                    />
                </Modal>
            </Card>
        )
    }
}