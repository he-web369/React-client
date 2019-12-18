/*
折线图路由
 */
import React,{Component} from 'react'
import {Button, Card} from "antd";
import ReactEcharts from "echarts-for-react";

export default class Line extends Component{
    state={
        sales:[1,2,32,5,4,1],
        stores:[10,30,20,5,12,14]
    }
    update=()=>{
        this.setState(state=>({
            sales:state.sales.map(item=>item+1),
            stores:state.stores.reduce((pre,item)=>{
                pre.push(item-1)
                return pre
            },[])
        }))
    }
    getOptions=(sales,stores)=>{
        return {
            title:{text:'test'},
            tooltip:{},
            legend:{
                data:['库存','销量']
            },
            xAxis:{
                data:['上衣','裤装','夹克','衬衫','短袖','内衣']
            },
            yAxis:{},
            series:[
                {
                    name:'销量',
                    type:'line',
                    data:sales
                },
                {
                    name:'库存',
                    type:'line',
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
                <Card title='折线图'>
                    <ReactEcharts option={this.getOptions(sales,stores)}/>
                </Card>
            </div>
        )
    }
}