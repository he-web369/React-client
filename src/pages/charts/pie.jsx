/*
饼状图路由
 */
import React,{Component} from 'react'
import {Button, Card} from "antd";
import ReactEcharts from "echarts-for-react";

export default class Pie extends Component{
    state={
        sales:[
            {value:1,name:'上衣'},
            {value:2,name:'裤装'},
            {value:32,name:'夹克'},
            {value:5,name:'衬衫'},
            {value:4,name:'短袖'},
            {value:1,name:'内衣'}
        ],
        stores:[
            {value:10,name:'上衣'},
            {value:20,name:'裤装'},
            {value:32,name:'夹克'},
            {value:10,name:'衬衫'},
            {value:40,name:'短袖'},
            {value:15,name:'内衣'}]
    }
    update=()=>{
        this.setState(state=>({
            sales:state.sales.map(item=>{
                item.value++
                return item
            }),
            stores:state.stores.map(item=>{
                item.value--
                return item
            })
        }))
    }
    getOptions=(sales,stores)=>{
        return {
            title:{text:'test'},
            tooltip:{},
            legend:{
                data:['库存','销量']
            },

            series:[
                {
                    name:'销量',
                    type:'pie',
                    data:sales
                },
                {
                    name:'库存',
                    type:'pie',
                    data:stores
                }
            ]
        }
    }
    render(){
        const {sales,stores}=this.state
        return (
            <div>
                <Card>
                    <Button type='primary' onClick={this.update}>更新</Button>
                </Card>
                <Card title='饼图'>
                    <ReactEcharts option={this.getOptions(sales,stores)}/>
                </Card>
            </div>
        )
    }
}