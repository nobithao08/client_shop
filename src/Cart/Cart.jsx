
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCart, updateCart } from '../Redux/Action/ActionCart';
import ListCart from './Component/ListCart';
import alertify from 'alertifyjs'
import { Link, Redirect } from 'react-router-dom'
import CartAPI from '../API/CartAPI';
import queryString from 'query-string'


function Cart(props) {

    //id_user lay tu redux
    const id_user = useSelector(state => state.Cart.id_user)

    //listCart lay tu redux
    const listCart = useSelector(state => state.Cart.listCart)

    const [cart, setCart] = useState([])

    const [total, setTotal] = useState()

    const dispatch = useDispatch()

    //State de Load dlieu tu Redux
    const [loadRedux, setLoadRedux] = useState({
        idProduct: '',
        count: ''
    })

    //State de Load dlieu tu API
    const [loadAPI, setLoadAPI] = useState(false)

    //Ham de Load dlieu Redux
    //Khi ngdung ch d/nhap
    useEffect(() => {

        const fetchDataRedux = () => {

            if (!sessionStorage.getItem('id_user')){
                setCart(listCart)

                getTotal(listCart)
            }

        }

        fetchDataRedux()

    }, [loadRedux])

    //Ham tinh tong tien carts
    function getTotal(carts) {
        let sub_total = 0
                
        const sum_total = carts.map(value => {
            return sub_total += parseInt(value.priceProduct) * parseInt(value.count)
        })

        setTotal(sub_total)
    }

    //Ham de load dlieu tu API
    //Khi ngdung da d/nhap
    useEffect(() => {

        const fetchData = async () => {

            if (sessionStorage.getItem('id_user')){

                const params = {
                    idUser: sessionStorage.getItem('id_user')
                }

                const query = '?' + queryString.stringify(params)

                console.log(query)

                const response = await CartAPI.getCarts(query)

                setCart(response)

                getTotal(response)

            }

        }

        fetchData()

        setLoadAPI(false)

    }, [loadAPI])


    //Ham de truyen xuong component con xu va tra nguoc dlieu lai cho component cha 
    const onDeleteCart = (getUser, getProduct) => {
        console.log( "idUser: " + getUser + ", idProduct: " + getProduct)

        if (sessionStorage.getItem('id_user')){ // user đã đăng nhập

            //Sau khi nhan dc dlieu o component con truyen len, goi API xly dlieu
            const fetchDelete = async () => {

                const params = {
                    idUser: getUser,
                    idProduct: getProduct
                }

                const query = '?' + queryString.stringify(params)

                const response = await CartAPI.deleteToCart(query)
                console.log(response)

            }

            fetchDelete()

            //Thay doi state loadAPI, load lai ham useEffect
            setLoadAPI(true)

            alertify.set('notifier','position', 'bottom-left');
            alertify.error('Bạn đã xóa hàng thành công!');

        }else{ // user ch d/nhap

            const data = {
                idProduct: getProduct,
                idUser: getUser,
            }

            //Dua dlieu vao Redux
            const action = deleteCart(data)
            dispatch(action)

            alertify.set('notifier','position', 'bottom-left');
            alertify.error('Bạn đã xóa hàng thành công!');

            //set state loadRedux de load lai ham useEffect, tiep tuc lay dlieu tu redux
            setLoadRedux({
                idProduct: getProduct,
                count: ''
            })
            
        }

    }

    const onUpdateCount = (getUser, getProduct, getCount) => {
        console.log("Count: " + getCount + ", idUser: " + getUser + ", idProduct: " + getProduct)

        if (sessionStorage.getItem('id_user')){

            const fetchPut = async () => {

                const params = {
                    idUser: getUser,
                    idProduct: getProduct,
                    count: getCount
                }

                const query = '?' + queryString.stringify(params)

                const response = await CartAPI.putToCart(query)
                console.log(response)
                
            }

            fetchPut()

            setLoadAPI(true)

            console.log("Ban Da Dang Nhap!")

            alertify.set('notifier','position', 'bottom-left');
            alertify.success('Bạn đã sửa hàng thành công!');

        }else{

            const data = {
                idProduct: getProduct,
                idUser: getUser,
                count: getCount
            }

            const action = updateCart(data)
            dispatch(action)

            alertify.set('notifier','position', 'bottom-left');
            alertify.success('Bạn đã sửa hàng thành công!');

            setLoadRedux({
                idProduct: getProduct,
                count: getCount
            })
        }

    }

    //Ham de redirect den page checkout
    const [redirect, setRedirect] = useState(false)

    const onCheckout = () => {
        
        if (!sessionStorage.getItem('id_user')){
            alertify.set('notifier','position', 'bottom-left');
            alertify.error('Vui lòng kiểm tra lại đăng nhập!');
            return
        }

        if (cart.length === 0){
            alertify.set('notifier','position', 'bottom-left');
            alertify.error('Vui lòng kiểm tra lại giỏ hàng!');
            return
        }
        
        setRedirect(true)

    }

    return (
        <div className="container">
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
                        <div className="col-lg-6">
                            <h1 className="h2 text-uppercase mb-0">Giỏ hàng</h1>
                        </div>
                        <div className="col-lg-6 text-lg-right">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb justify-content-lg-end mb-0 px-0">
                                    <li className="breadcrumb-item active" aria-current="page">Giỏ hàng</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-5">
                <h2 className="h5 text-uppercase mb-4">Giỏ hàng mua sắm của bạn</h2>
                <div className="row">
                    <div className="col-lg-8 mb-4 mb-lg-0">
                        
                        <ListCart 
                            listCart={cart} 
                            onDeleteCart={onDeleteCart} 
                            onUpdateCount={onUpdateCount} />

                        <div className="bg-light px-4 py-3">
                            <div className="row align-items-center text-center">
                                <div className="col-md-6 mb-3 mb-md-0 text-md-left">
                                    <Link className="btn btn-link p-0 text-dark btn-sm" to={`/shop`}>
                                        <i className="fas fa-long-arrow-alt-left mr-2"> </i>Tiếp tục mua sắm
                                    </Link>                
                                </div>
                                <div className="col-md-6 text-md-right">
                                    {
                                        redirect && <Redirect to={'/checkout'} />
                                    }
                                    <span className="btn btn-outline-dark btn-sm" onClick={onCheckout}>
                                        Tiến hành thanh toán<i className="fas fa-long-arrow-alt-right ml-2"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card border-0 rounded-0 p-lg-4 bg-light">
                            <div className="card-body">
                                <h5 className="text-uppercase mb-4">Tổng số giỏ hàng</h5>
                                <ul className="list-unstyled mb-0">
                                    <li className="border-bottom my-2"></li>
                                    <li className="d-flex align-items-center justify-content-between mb-4"><strong className="text-uppercase small font-weight-bold">Tổng cộng</strong><span>${total}</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Cart;