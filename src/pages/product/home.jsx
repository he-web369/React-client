/*
Product的默认子路由组件
 */
import React,{Component} from 'react'
import {Card, Select, Input, Button, Icon, Table, message} from 'antd'
import LinkButton from "../../components/link-button/linkButton";

import {reqProducts,reqSearchProducts,reqUpdateStatus} from '../../api/index'
import {PAGE_SIZE} from '../../utils/constants'

const Option=Select.Option
export default class ProductHome extends Component{
    state={
        products:[],
        total:0,
        loading:false,
        searchName:'',
        searchType:'productName'
    }
    initColumns=()=>{
        this.columns=[
            {
                title:'商品名称',
                dataIndex:'name'
            },
            {
                title: '商品描述',
                dataIndex: 'desc'
            },
            {
                title: '价格',
                dataIndex: 'price',
                width:70,
                render:(price)=>'￥'+price
            },
            {
                title: '状态',
                width:90,
                render:(product)=>{
                    const {status,_id}=product
                    return (<span>
                        <Button
                            type='primary'
                            onClick={()=>this.updateStatus(_id,status===1?2:1)}
                        >{status===1?'下架':'上架'}</Button>
                        <span>{status===1?'在售':'已下架'}</span>
                    </span>)
                }
            },
            {
                title:'操作',
                width:80,
                render:(product)=>{
                    return (
                        <span>
                            <LinkButton onClick={()=>this.props.history.push('/product/detail',product)}>详情</LinkButton>
                            <LinkButton>修改</LinkButton>
                        </span>
                    )
                }
            }
        ]
    }
    //更新指定商品的状态
    updateStatus=async (productId,status)=>{
        const result=await reqUpdateStatus({productId,status})
        if(result.status===0){
            message.success('更新商品成功')
            this.getProducts(this.pageNum)
        }else{
            message.error('更新商品失败')
        }
    }
    //获得商品列表
    getProducts=async (pageNum)=>{
        this.pageNum=pageNum //保存最新的pageNum
        this.setState({loading:true})
        const {searchName,searchType}=this.state
        let result={}
        if(searchName){//进行搜索分页
            result=await reqSearchProducts({pageNum,pageSize:PAGE_SIZE,searchName,searchType})
        }else{
            result=await reqProducts(pageNum,PAGE_SIZE)
        }
        this.setState({loading:false})
        if(result.status===0){
            const {total,list}=result.data
            this.setState({total,products:list})
        }
    }
    constructor(props) {
        super(props);
        this.initColumns()
    }
    componentDidMount() {
        this.getProducts(1)
    }

    render(){
        const {products,total,loading,searchType}=this.state
        const title=(<span>
            <Select value={searchType} style={{width:130}} onChange={value => this.setState({searchType: value})}>
                <Option value='productName'>按名称搜索</Option>
                <Option value='productDesc'>按描述搜索</Option>
            </Select>
            <Input placeholder='关键字'
                   style={{width:160,margin:'0 15px'}}
                   onChange={(event)=>this.setState({searchName: event.target.value})}
            />
            <Button type='primary' onClick={()=>this.getProducts(1)}>搜索</Button>
        </span>)
        const extra=(<Button type='primary'><Icon type='plus'/>添加商品</Button>)
        return (
            <Card title={title} extra={extra}>
                <Table dataSource={products}
                        columns={this.columns}
                       rowKey='_id'
                       bordered
                       loading={loading}
                       pagination={{
                           total,
                           defaultPageSize:PAGE_SIZE,
                           showQuickJumper:true,
                           onChange:this.getProducts
                       }}
                >
                </Table>
            </Card>
        )
    }
}