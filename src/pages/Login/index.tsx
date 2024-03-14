import { IUserInfo, useUserInfo } from '@/hooks/useUserInfo.ts'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import './index.scss'

const Index = () => {
    const location = useLocation()
    const navigator = useNavigate()
    const [form] = Form.useForm<IUserInfo>()
    const to = location.state?.from?.pathname || '/'
    const { setUserInfo } = useUserInfo()

    const login = () => {
        setUserInfo(form.getFieldsValue())
        navigator(to, { replace: true })
    }

    return (
        <div className="login__container vertical-center wh100p">
            <div className="login__content flex">
                <div className="login__content-left login__content-box"></div>
                <div className="login__content-right flex-1 login__content-box vertical-center">
                    <div className="login__box">
                        <p className="login__title">Welcome Back</p>
                        <p className="login__desc">请输入您的用户名/密码进行登录</p>

                        <Form className="login__form" form={ form } layout="vertical" autoComplete="off" variant="filled">
                            <Form.Item label="用户名" className="form-user-name" name="userName">
                                <Input suffix={ <UserOutlined /> } allowClear placeholder="请输入用户名" />
                            </Form.Item>
                            <Form.Item label="密码" className="form-user-password" name="password">
                                <Input suffix={ <LockOutlined /> } type="password" allowClear placeholder="请输入密码" />
                            </Form.Item>
                            <div className="login__remember flex-between">
                                <Checkbox>记住我</Checkbox>
                                <span>忘记密码？</span>
                            </div>
                            <div className="login__footer">
                                <Button type="primary" onClick={ login }>登录</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index
