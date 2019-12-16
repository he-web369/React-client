/*
添加角色组件
 */
import React,{Component} from 'react'
import {Form,Input} from 'antd'
import PropTypes from 'prop-types'

const Item=Form.Item
class AddForm extends Component{

    static propTypes={
        setForm:PropTypes.func.isRequired,
        roles:PropTypes.array.isRequired
    }
    validateValue=(rule,value,callback)=>{
        const repeateName=this.props.roles.find(item=>item.name===value)
        if(repeateName){
            callback('角色名称重复，请重新输入')
        }else{
            callback()
        }
    }
    constructor(props) {
        super(props);
        this.props.setForm(this.props.form)
    }

    render(){
        const {getFieldDecorator}=this.props.form
        return (
            <Form>
                <Item label='角色名称：'  labelCol={{span:4}} wrapperCol={{span:12}}>
                    {
                        getFieldDecorator('roleName',{
                            initialValue:'',
                            rules:[{required:true,message:'角色名称必须输入'},
                            {validator:this.validateValue}
                        ]
                        })(
                            <Input placeholder='请输入角色名称'/>
                        )
                    }
                </Item>
            </Form>
        )
    }
}
export default Form.create()(AddForm)