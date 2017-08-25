# WuValidate

        <div class="validate-box">
            email<input class="validate-item" validateType="email,required" /><br/>
            Idcard<input class="validate-item" validateType="Idcard"/><br/>
            required<input class="validate-item" validateType="required"/><br/>
            无<input  /><br/>
            password<input class="validate-item" validateType="password"/><br/>
            required<input class="validate-item" validateType="required"/><br/>
        </div>
        使用说明 
         被校验标签仅支持input 
         被检验标签加validate-item，外部标签加validate-box ,具体验证内容写入validateType
         目前验证项有 password ，required ，Idcard ，email , 多项用英文逗号隔开
