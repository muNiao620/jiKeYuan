import {Card ,Form, Input, Button, Checkbox} from 'antd'
import logo from '../../assets/logo.png'
import './index.scss'
import { useStore } from '../../store'
function Login(){
  const { loginStore } = useStore()
  const onFinish = (values) => {
    console.log('Success:', values);
    loginStore.getToken({
      mobile:values.username,
      code:values.password
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className='login'>
      <Card className='login-container'>
        <img className='login-logo' src={logo} alt=''/>
        {/* 子项用到的触发事件，需要在Form中声明 */}
        <Form 
          initialValues={{ remember: true,password: 123456 }} 
          validateTrigger={['onBlur','onChange']}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            // label="phone"
            name="username"
            rules={[
              { required: true, message: '请输入手机号' },
              {pattern:/^1[3-9]\d{9}$/,message:'请输入正确手机号',validateTrigger:'onBlur'}
            ]}
          >
            <Input size='large' placeholder='请输入手机号' />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              {len:6 , message:'请输入6位密码',validateTrigger:'onBlur'}
            ]}
          >
            <Input size='large' placeholder='请输入密码' />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className='login-checkbox-label'>
              我已阅读并同意[用户协议]和[隐私条款]
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' size='large' block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
export default Login