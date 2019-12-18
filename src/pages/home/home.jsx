/*
首页路由
 */
import React,{Component} from 'react'
import {Icon,Card,Statistic,DatePicker,Timeline} from 'antd'
import moment from "moment";

import './home.less'
import Bar from './bar'
import Line from './line'
const dateFormat='YYYY/MM/DD'
const {RangePicker}=DatePicker
export default class Home extends Component{
    state={
        isVisited:true
    }

    render(){
        const {isVisited}=this.state
        return (
            <div className='home'>
                <Card
                    className='home-card'
                    title='商品总量'
                    extra={<Icon style={{color:'rgba(0,0,0,.45'}} type='quection-circle'/>}
                    style={{width:250}}
                    headStyle={{color:'rgba(0,0,0,.45'}}
                >
                    <Statistic
                        value={2211014}
                        suffix='个'
                        style={{fontWeight:'bolder'}}
                    />
                    <Statistic
                        value={15}
                        valueStyle={{fontSize:15}}
                        prefix={'周同比'}
                        suffix={<div>%<Icon style={{color:'red',marginLeft:10}} type='arrow-down'/></div>}
                    />
                    <Statistic
                        value={10}
                        valueStyle={{fontSize:15}}
                        prefix={'日同比'}
                        suffix={<div>%<Icon style={{color:'#3f8600',marginLeft:10}} type='arrow-up'/></div>}
                    />
                </Card>
                <Line />
                <Card
                    className='home-content'
                    title={<div className='home-menu'>
                        <span className={isVisited?'home-menu-active home-menu-visited':'home-menu-visited'}
                                onClick={()=>this.setState({isVisited: true})}
                        >访问量</span><span className={isVisited ? "" : 'home-menu-active'} onClick={()=>this.setState({isVisited: false})}>销售量</span>
                    </div>}
                    extra={<RangePicker
                            defaultValue={[moment('2020/01/01',dateFormat),moment('2020/06/01',dateFormat)]}
                            format={dateFormat}
                        />}
                >
                    <Card
                        className="home-table-left" title={isVisited ? '访问趋势' : '销售趋势'} bodyStyle={{padding: 0, height: 275}} extra={<Icon type="reload"/>}
                    >
                        <Bar/>
                    </Card>
                    <Card title='任务' extra={<Icon type="reload"/>} className="home-table-right">
                        <Timeline>
                            <Timeline.Item color='orange'>xxxxx</Timeline.Item>
                            <Timeline.Item color='orange'>yyyyyyyyyy</Timeline.Item>
                            <Timeline.Item color='red'>
                                <p>联调接口</p>
                                <p>功能验收</p>
                            </Timeline.Item>
                            <Timeline.Item >
                                <p>xxxx</p>
                                <p>wwwww</p>
                                <p>aaaaa</p>
                            </Timeline.Item>
                        </Timeline>
                    </Card>
                </Card>
            </div>
        )
    }

}