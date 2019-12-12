/*
详情页
 */
import React,{Component} from 'react'
import {Card,Icon,List} from 'antd'
import LinkButton from "../../components/link-button/linkButton";

import {BASE_IMG_URL} from '../../utils/constants'
import {reqCategory} from '../../api/index'

const Item=List.Item
export default class ProductDetail extends Component{
    state={
        cName1:'',
        cName2:''
    }
    async componentDidMount() {
        const {pCategoryId,categoryId}=this.props.location.state||{}
        if(pCategoryId==='0'){
          const result= await reqCategory(categoryId)
          const cName=result.data.name
          this.setState({cName1:cName})
        }else{
            // const result1= await reqCategory(pCategoryId)
            // const result2= await reqCategory(pCategoryId)
            // const cName1=result1.data.name
            // const cName2=result2.data.name
            const results= await Promise.all([reqCategory(pCategoryId),reqCategory(pCategoryId)])
            const {cName1}=results[0].data
            const {cName2}=results[1].data
            this.setState({cName1,cName2})
        }
    }

    render(){
        const {name,desc,price,detail,imgs}=this.props.location.state||{}
        const {cName1,cName2}=this.state
        const title=(
            <span >
                <LinkButton>
                    <Icon
                        type='arrow-left'
                        style={{marginRight:10,fontSize:18}}
                        onClick={()=>this.props.history.goBack()}
                    />
                </LinkButton>
                <span>商品详情</span>
            </span>)
        return (
            <Card title={title} className='product-detail'>
                <List>
                    <Item>
                        <span className='left'>商品名称：</span>
                        <span>{name}</span>
                    </Item>
                    <Item>
                        <span className='left'>商品描述：</span>
                        <span>{desc}</span>
                    </Item>
                    <Item>
                        <span className='left'>商品价格：</span>
                        <span>{price}</span>
                    </Item>
                    <Item>
                        <span className='left'>所属分类：</span>
                        <span>{cName1} {cName2?'-->'+cName2:''}</span>
                    </Item>
                    <Item>
                        <span className='left'>商品图片：</span>
                        <span>
                            {
                                imgs.map(img=>(
                                    <img
                                        key={img}
                                        className='product-img'
                                        src={BASE_IMG_URL+img}
                                        alt={img}/>
                                ))
                            }
                            <img className='product-img' src={require('../../assets/images/404.png')} alt="图片1"/>
                            <img className='product-img' src={require('../../assets/images/logo.png')} alt="图片2"/>
                        </span>
                    </Item>
                    <Item>
                        <span className='left'>商品详情：</span>
                        <span dangerouslySetInnerHTML={{__html:detail}}></span>
                    </Item>
                </List>
            </Card>
        )
    }
}