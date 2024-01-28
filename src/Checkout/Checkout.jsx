import React, { useEffect, useState } from 'react';
import queryString from 'query-string'
import CartAPI from '../API/CartAPI';
import CheckoutAPI from '../API/CheckoutAPI';
import './Checkout.css'

function Checkout(props) {

    const [carts, setCarts] = useState([])

    const [total, setTotal] = useState(0)

    const [fullname, setFullname] = useState('')
    const [fullnameError, setFullnameError] = useState(false)

    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)

    const [emailRegex, setEmailRegex] = useState(false)

    const [phone, setPhone] = useState('')
    const [phoneError, setPhoneError] = useState(false)

    const [address, setAddress] = useState('')
    const [addressError, setAddressError] = useState(false)

    const [success, setSuccess] = useState(false)

    const [load, setLoad] = useState(false)


    //Ham de goi API va render so spham
    useEffect(() => {

        if (sessionStorage.getItem('id_user')) {

            const fetchData = async () => {

                const params = {
                    idUser: sessionStorage.getItem('id_user')
                }

                const query = '?' + queryString.stringify(params)

                const response = await CartAPI.getCarts(query)

                console.log(response)

                setCarts(response)

                getTotal(response)

                if (response.length === 0) {
                    window.location.replace("/cart");
                }

            }

            fetchData()

        }

    }, [])

    //Ham tinh tong tien carts
    function getTotal(carts) {
        let sub_total = 0

        const sum_total = carts.map(value => {
            return sub_total += parseInt(value.priceProduct) * parseInt(value.count)
        })

        setTotal(sub_total)
    }


    //Kiem tra xac thuc
    const handlerSubmit = () => {
        if (!fullname) {
            setFullnameError(true)
            setEmailError(false)
            setPhoneError(false)
            setAddressError(false)
            return
        } else {
            if (!email) {
                setFullnameError(false)
                setEmailError(true)
                setPhoneError(false)
                setAddressError(false)
                return
            } else {

                setPhoneError(false)
                setAddressError(false)
                setFullnameError(false)

                if (!validateEmail(email)) {
                    setEmailRegex(true)
                    setFullnameError(false)
                    setEmailError(false)
                    setPhoneError(false)
                    setAddressError(false)
                    return
                } else {
                    setEmailRegex(false)

                    if (!phone) {
                        setFullnameError(false)
                        setEmailError(false)
                        setPhoneError(true)
                        setAddressError(false)
                        return
                    } else {

                        setFullnameError(false)
                        setEmailError(false)
                        setPhoneError(false)
                        setAddressError(false)

                        if (!address) {
                            setFullnameError(false)
                            setEmailError(false)
                            setPhoneError(false)
                            setAddressError(true)
                        } else {
                            console.log("Thanh Cong")

                            setLoad(!load)
                        }
                    }

                }

            }
        }
    }

    //Ham gui email, xac nhan don
    useEffect(() => {

        if (load) {

            const sendMail = async () => {

                const params = {
                    to: email,
                    fullname: fullname,
                    phone: phone,
                    address: address,
                    idUser: sessionStorage.getItem('id_user')
                }

                const query = '?' + queryString.stringify(params)

                const response = await CheckoutAPI.postEmail(query)

                console.log(response)

            }

            sendMail()

            //setTimeout delay 3, sau 4s no se th/hien
            setTimeout(() => {
                setSuccess(!success)
                setLoad(!load)
            }, 4000);

        }

    }, [load])

    const onChangeName = (e) => {
        setFullname(e.target.value)
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangePhone = (e) => {
        setPhone(e.target.value)
    }

    const onChangeAddress = (e) => {
        setAddress(e.target.value)
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    return (
        <div>
            {
                load && (
                    <div className="wrapper_loader">
                        <div className="loader"></div>
                    </div>
                )
            }

            <div className="container">
                <section className="py-5 bg-light">
                    <div className="container">
                        <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
                            <div className="col-lg-6">
                                <h1 className="h2 text-uppercase mb-0">Thanh toán</h1>
                            </div>
                            <div className="col-lg-6 text-lg-right">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb justify-content-lg-end mb-0 px-0">
                                        <li className="breadcrumb-item"><a href="index.html">Trang chủ</a></li>
                                        <li className="breadcrumb-item"><a href="cart.html">Giỏ hàng</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Thanh toán</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>

                {!success && (<section className="py-5">
                    <h2 className="h5 text-uppercase mb-4">Chi tiết thanh toán</h2>
                    <div className="row">
                        <div className="col-lg-8">
                            <form>
                                <div className="row">
                                    <div className="col-lg-12 form-group">
                                        <label className="text-small text-uppercase" htmlFor="Fullname">Họ và tên:</label>
                                        <input className="form-control form-control-lg" value={fullname} onChange={onChangeName} type="text" placeholder="Nhập tên đầy đủ của bạn vào đây!" />
                                        {fullnameError && <span className="text-danger">* Vui lòng kiểm tra tên đầy đủ của bạn!</span>}
                                    </div>
                                    <div className="col-lg-12 form-group">
                                        <label className="text-small text-uppercase" htmlFor="Email">Email: </label>
                                        <input className="form-control form-control-lg" value={email} onChange={onChangeEmail} type="text" placeholder="Nhập địa chỉ email của bạn vào đây!" />
                                        {emailError && <span className="text-danger">* Vui lòng kiểm tra email của bạn!</span>}
                                        {emailRegex && <span className="text-danger">* Định dạng email không chính xác</span>}
                                    </div>
                                    <div className="col-lg-12 form-group">
                                        <label className="text-small text-uppercase" htmlFor="Phone">Số điện thoại: </label>
                                        <input className="form-control form-control-lg" value={phone} onChange={onChangePhone} type="text" placeholder="Nhập số điện thoại của bạn vào đây!" />
                                        {phoneError && <span className="text-danger">*  Vui lòng kiểm tra số điện thoại của bạn!</span>}
                                    </div>
                                    <div className="col-lg-12 form-group">
                                        <label className="text-small text-uppercase" htmlFor="Address">Địa chỉ: </label>
                                        <input className="form-control form-control-lg" value={address} onChange={onChangeAddress} type="text" placeholder="Nhập địa chỉ của bạn vào đây!" />
                                        {addressError && <span className="text-danger">* Vui lòng kiểm tra địa chỉ của bạn!</span>}
                                    </div>
                                    <div className="col-lg-12 form-group">
                                        <a className="btn btn-dark" style={{ color: 'white' }} type="submit" onClick={handlerSubmit}>Đặt hàng</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-4">
                            <div className="card border-0 rounded-0 p-lg-4 bg-light">
                                <div className="card-body">
                                    <h5 className="text-uppercase mb-4">Đơn hàng của bạn</h5>
                                    <ul className="list-unstyled mb-0">
                                        {
                                            carts && carts.map(value => (
                                                <div key={value._id}>
                                                    <li className="d-flex align-items-center justify-content-between">
                                                        <strong className="small font-weight-bold">{value.nameProduct}</strong>
                                                        <span className="text-muted small">${value.priceProduct} x {value.count}</span>
                                                    </li>
                                                    <li className="border-bottom my-2"></li>
                                                </div>
                                            ))
                                        }
                                        <li className="d-flex align-items-center justify-content-between">
                                            <strong className="text-uppercase small font-weight-bold">Tổng cộng</strong>
                                            <span>${total}</span>
                                        </li>
                                        
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>)}

                {success && (<section className="py-5">
                    <div className="p-5">
                        <h1>Bạn đã đặt hàng thành công!</h1>
                        <p style={{ fontSize: '1.2rem' }}>Vui lòng kiểm tra đơn đặt hàng của bạn!.</p>
                    </div>
                </section>)}
            </div>
        </div>
    );
}

export default Checkout;