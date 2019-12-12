import ajax from "./ajax"
import jsonp from 'jsonp'
import {message} from "antd";

//登录
export const reqLogin=({username,password})=>ajax('/login',{username,password},'POST')
//添加用户
export const reqAddUser=(user)=>ajax('/manage/user/add',user,'POST')
//jsonp请求的接口请求函数
export const reqWeather=(city)=>{
    return new Promise((resolve,reject)=>{
        const url= `http://v.juhe.cn/weather/index?key=8c5466c073390de3af11578e8c9c3777&cityname=${city}`
        jsonp(url,{timeout:2000},(err,data)=>{
            if(!err&&data.resultcode==='200'){
                const temperature=data.result.today.temperature
                const weather=data.result.today.weather
                resolve({temperature,weather})
            }else{
                message.error('获取天气信息失败')
            }
        })
    })
}
//获取一级/二级分类列表
export const reqCategoryList=(parentId)=>ajax('/manage/category/list',{parentId})
//更新分类名称
export const reqUpdateCategory=({categoryId,categoryName})=>ajax('/manage/category/update',{categoryId,categoryName},'POST')
//添加分类
export const reqAddCategory=({categoryName,parentId})=>ajax('/manage/category/add',{categoryName,parentId},'POST')
//删除分类
export const reqRemoveCategory=({categoryName,parentId})=>ajax('/manage/category/remove',{categoryName,parentId},'POST')
//获取商品分页列表
export const reqProducts=(pageNum,pageSize)=>ajax('/manage/product/list',{pageNum,pageSize})
//搜索商品分页列表
export const reqSearchProducts=({pageNum,pageSize,searchName,searchType})=>ajax('/manage/product/search',{
    pageNum,
    pageSize,
    [searchType]:searchName
})
//获取一个分类
export const reqCategory=(categoryId)=>ajax('/manage/category/info',{categoryId})
//更新商品状态
export const reqUpdateStatus=({productId,status})=>ajax('/manage/product/updateStatus',{productId,status},'POST')