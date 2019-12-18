import React,{PureComponent} from 'react'
import {Form,Input,Select} from 'antd'
import PropTypes from 'prop-types'

const Item=Form.Item
 class AddOrUpdateUser extends PureComponent{
    static propTypes={
        setForm:PropTypes.func.isRequired,
        roles:PropTypes.array,
        user:PropTypes.object
    }
     validatePs=(rule,value,callback)=>{
         if(value.length<4||value.length>12){
             callback('密码必须在4-12位之间')
         }else{
             callback()
         }
     }

     constructor(props) {
         super(props);
         this.props.setForm(this.props.form)
     }

     render(){
        const {getFieldDecorator} =this.props.form
         const {roles}=this.props
        const user=this.props.user||{}
        const formItemLayOut={
            labelCol:{span:4},
            wrapperCol:{span:12}
        }
        return (
              <Form {...formItemLayOut}>
                  <Item label='用户名'>
                      {
                          getFieldDecorator('username',{
                              initialValue:user.username,
                              rules:[
                                  {required:true,message:'用户名称必须输入'}
                              ]
                          })(
                              <Input placeholder='请输入用户名'/>
                          )
                      }
                  </Item>
                  {
                      user._id?null:(<Item label='密码'>
                          {
                              getFieldDecorator('password',{
                                  initialValue:user.password,
                                  rules:[
                                      {required:true,message:'密码必须输入'},
                                      {validator:this.validatePs}
                                  ]
                              })(
                                  <Input type='password' placeholder='请输入密码'/>
                              )
                          }
                      </Item>)
                  }
                  <Item label='手机号'>
                      {
                          getFieldDecorator('phone',{
                              initialValue:user.phone
                          })(
                              <Input placeholder='请输入手机号码'/>
                          )
                      }
                  </Item>
                  <Item label='邮箱'>
                      {
                          getFieldDecorator('email',{
                              initialValue:user.email
                          })(
                              <Input placeholder='请输入邮箱'/>
                          )
                      }
                  </Item>
                  <Item label='角色'>
                      {
                          getFieldDecorator('role_id',{
                              initialValue:user.role_id
                          })(
                              <Select  >
                                  {
                                      roles.map(item=>{
                                        return  <Select.Option value={item._id} key={item._id}>{item.name}</Select.Option>
                                      })
                                  }
                              </Select>
                          )
                      }
                  </Item>
              </Form>
        )
    }
}
export default Form.create()(AddOrUpdateUser)