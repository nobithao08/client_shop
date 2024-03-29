import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import UserAPI from '../API/UserAPI';
import { addSession } from '../Redux/Action/ActionSession';
import './Auth.css'
import queryString from 'query-string'
import CartAPI from '../API/CartAPI';

function SignIn(props) {

    const listCart = useSelector(state => state.Cart.listCart)

    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')
    const [errorEmail, setErrorEmail] = useState(false)
    const [emailRegex, setEmailRegex] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    const [checkPush, setCheckPush] = useState(false)
    const [errorLogin, setErrorLogin] = useState(false)

    const history = useHistory();

    const dispatch = useDispatch();

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const onSubmit = async () => {
        setErrorEmail(false);
        setErrorPassword(false);
        setEmailRegex(false);

        if (!email) {
            setErrorEmail(true);
        } else if (!validateEmail(email)) {
            setEmailRegex(true);
        } else if (!password) {
            setErrorPassword(true)
        } else if (email && validateEmail(email) && password) {
            const body = {
                email,
                password
            }
            const res = await UserAPI.postLogin(body);
            if (res._id) {
                sessionStorage.setItem('id_user', res._id)
                sessionStorage.setItem('name_user', res.fullname)
                const action = addSession(sessionStorage.getItem('id_user'))
                dispatch(action);
                setCheckPush(true);
            } else if (res === 'false') {
                setErrorLogin(true);
            }
        }
    }

    //Ham nay dung de dua het all carts vao API cua user
    useEffect(() => {
        const fetchData = async () => {
            if (checkPush === true) {
                for (let i = 0; i < listCart.length; i++){
                    //No se lay idUser, idProduct, count can them de gui len server
                    const params = {
                        idUser: sessionStorage.getItem('id_user'),
                        idProduct: listCart[i].idProduct,
                        count: listCart[i].count
                    }
                    const query = '?' + queryString.stringify(params)
                    const response = await CartAPI.postAddToCart(query)
                    console.log(response)
                }
                history.push('/');
            }
        }
        fetchData()
    }, [checkPush])


    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
                    <span className="login100-form-title p-b-33">
                        Đăng nhập
					</span>

                    <div className="d-flex justify-content-center pb-5">
                        {emailRegex && <span className="text-danger">* Định dạng email không chính xác</span>}
                        {errorEmail && <span className="text-danger">* Vui lòng kiểm tra email của bạn</span>}
                        {errorPassword && <span className="text-danger">* Vui lòng kiểm tra mật khẩu của bạn</span>}
                        {errorLogin && <span className="text-danger">* Vui lòng kiểm tra email hoặc mật khẩu của bạn</span>}
                    </div>


                    <div className="wrap-input100 validate-input" >
                        <input className="input100" type="text" placeholder="Email" value={email} onChange={onChangeEmail} />
                    </div>

                    <div className="wrap-input100 rs1 validate-input">
                        <input className="input100" type="password" placeholder="Password" value={password} onChange={onChangePassword} />
                    </div>

                    <div className="container-login100-form-btn m-t-20">
                        <button className="login100-form-btn" onClick={onSubmit}>
                            Đăng nhập
						</button>
                    </div>

                    <div className="text-center p-t-45 p-b-4">
                        <span className="txt1">Tạo một tài khoản?</span>
                        &nbsp;
                        <Link to="/signup" className="txt2 hov1">
                            Đăng ký
						</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;