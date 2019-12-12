import React,{Component} from 'react'
import {Input, Form, Icon, Button, message} from 'antd'
import {reqLogin} from '../../api/index'
import {Redirect} from 'react-router-dom'

import './login.less'
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";

const Item=Form.Item
class Login extends Component{

    handleSubmit=(event)=>{
        event.preventDefault()
        const {form}=this.props
        form.validateFields((err,values)=>{
            if(!err){
                reqLogin(values).then( res =>{
                    if(res.status===0){
                        const user=res.data
                        memoryUtils.user=user
                        storageUtils.saveUser(user)
                        message.success('登录成功')
                       this.props.history.replace('/')
                    }else{
                        message.error(res.msg)
                    }
                },err =>{
                    if(err)console.log(err)
                })
            }
        })
    }
    validatePwd=(rule,value,callback)=>{
        if(!value){
            callback('密码必须输入')
        }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
            callback('密码必须是英文、字母和下划线组成')
        }else if(value.length<4||value.length>12){
            callback('密码必须在4-12位之间')
        }else{
            callback()
        }
    }
    render(){
        //判断用户是否登录
        if(memoryUtils.user._id){
           return <Redirect to='/'/>
        }
        const form=this.props.form
        const {getFieldDecorator}=form
        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={require(`../../assets/images/logo.png`)} alt="logo"/>
                    <h1>React项目：后台管理项目</h1>
                </header>
                <section className='login-content'>
                    <h2>用户登录</h2>
                    <Form className='login-form' onSubmit={this.handleSubmit}>
                        <Item>
                        {getFieldDecorator('username',{
                            rules:[{required:true,whitespace:true,message:'用户名必须输入'},
                                {max:12,message: '用户名最多12位'},{min:4,message:'用户名最少4位'},
                                {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名必须是英文、字母和下划线组成'}
                            ]
                        })(
                                <Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }}/>}
                                       placeholder='请输入用户名'/>
                        )}
                        </Item>
                        <Item>
                        {getFieldDecorator('password',{
                            rules:[{validator:this.validatePwd}]
                        })(
                                <Input prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }}/>}
                                       type='password'
                                       placeholder='请输入密码'/>
                        )}
                        </Item>
                        <Item>
                            <Button className='login-button' type='primary' htmlType='submit'>点击登录</Button>
                        </Item>
                    </Form>
                </section>
            </div>
        )
    }
}
export default Form.create()(Login)