
    var WuValidate = function(){

        
        //获取验证元素盒子
        //绑定事件
        document.getElementsByClassName("validate-box")[0].addEventListener("keyup",function(ev){
            var ev = ev || window.event;
            var target = ev.target || ev.srcElement;
            if(target.className == 'validate-item'){
                //非input元素处理
                if(target.nodeName.toLocaleLowerCase() != 'input'){
                    console.error("当前标签为："+target.nodeName+"标签，请使用input标签进行校验！");
                    return;
                }else{
                    var type = target.getAttribute("validateType");
                    if(typeof type != "string"){
                        console.error('校验类型只支持String');
                        return;
                    }
                    type=type.toLocaleLowerCase().split(",");
                    for(let i = 0; i<type.length;i++){
                        switch(type[i]){
                            case 'email' :
                                console.log('邮箱');
                                WuValidate.prototype.chkFun(WuValidate.prototype.chkStrategy.chkMail,target);
                                break;
                            case 'password' :
                                console.log('密码');
                                WuValidate.prototype.chkFun(WuValidate.prototype.chkStrategy.chkPassword,target);
                                break;
                            case 'idcard' :
                                console.log('身份证');
                                WuValidate.prototype.chkFun(WuValidate.prototype.chkStrategy.chkIDCard,target);
                                break;
                            case 'required' :
                                console.log('必填');
                                WuValidate.prototype.chkFun(WuValidate.prototype.chkStrategy.chkRequired,target);
                                break;
                            default:
                                //未定义类型提示
                                console.error('未被支持的校验类型');
                        }
                    }
                }
            }
        });
    }
    //验证策略
    WuValidate.prototype.chkReg = {
        //邮箱正则
        email_reg : /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        //密码正则 纯数字
        password_reg1 : /^(?=.*[0-9]).*$/,
        //密码正则 字母加数字
        password_reg2 : /^(?=.*[0-9])(?=.*[a-zA-Z]).*$/,
        //密码正则 大小写数字
        password_reg3 : /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/,
        //身份证正则
        IDcard_reg : /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    }
    //验证方法
    WuValidate.prototype.chkFun = function(strategy,target){
        var res = strategy(target.value);
        var obj = JSON.parse(target.getAttribute("validateResult"))||{};
        obj[strategy.name] = res;
        WuValidate.prototype.arrangeRes(obj,target);
    }
    //整理校验结果
    WuValidate.prototype.arrangeRes = function(obj,target){
        target.setAttribute("validateResult",JSON.stringify(obj));
    }
    //验证策略
    WuValidate.prototype.chkStrategy={
        //邮箱验证
         chkMail : function(szMail){ 
            var bChk=WuValidate.prototype.chkReg.email_reg.test(szMail); 
            return bChk; 
        }, 
        //身份证验证
         chkIDCard : function(szIDcard){ 
            var bChk=WuValidate.prototype.chkReg.IDcard_reg.test(szIDcard); 
            return bChk; 
        }, 
        //必填校验
         chkRequired : function(szRequired){ 
            return szRequired.length!=0; 
        }, 
        //密码验证
         chkPassword : function(szPassword){ 
            var res =0;
            if(WuValidate.prototype.chkReg.password_reg1.test(szPassword)){
                res+=1;
            }
            if(WuValidate.prototype.chkReg.password_reg2.test(szPassword)){
                res+=1;
            }
            if(WuValidate.prototype.chkReg.password_reg3.test(szPassword)){
                res+=1;
            }
            return res==3;
        } 
    }
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = WuValidate;  
    }