import React, { useEffect, useState } from 'react';
import queryString from 'query-string'
import ProductAPI from '../API/ProductAPI';
import Search from './Component/Search';
import Pagination from './Component/Pagination';
import Products from './Component/Products';
import SortProduct from './Component/SortProduct';

function Shop(props) {

    const [products, setProducts] = useState([])
    const [temp, setTemp] = useState([])

    //state dung de sxep sp
    const [sort, setSort] = useState('default')

    //Tong so trang
    const [totalPage, setTotalPage] = useState()

    //Tung trang h/tai
    const [pagination, setPagination] = useState({
        page: '1',
        count: '9',
        // search: '',
        category: 'all'
    })

    // state categories
    const [categories, setCategories] = useState([]);

    //Ham de lay value tu component SortProduct truyen len
    const handlerChangeSort = (value) => {
        setSort(value)
    }


    //Ham de thay doi state pagination.page
    const handlerChangePage = (value) => {
        console.log("Value: ", value)

        setPagination({
            page: value,
            count: pagination.count,
            category: pagination.category
        })
    }

    //Ham de thay doi state pagination.search
    const handlerSearch = (value) => {
        if (!value) {
            setProducts(temp);
            return;
        }
        const searchProducts = temp.filter(item => item.name.toUpperCase().indexOf(value.toUpperCase()) !== -1);
        setProducts(searchProducts)
    }

    //Ham de thay dooi state pagination.category
    const handlerCategory = (value) => {
        console.log("Value: ", value)

        setPagination({
            page: pagination.page,
            count: pagination.count,
            // search: pagination.search,
            category: value

        })
    }

    //Goi ham useEffect tim tong so sp de tinh tong so trang
    //Phu thuoc vao state pagination
    useEffect(() => {
        const fetchAllData = async () => {
            let productLength = 0;

            const params = {
                page: pagination.page,
                count: pagination.count,
                // search: pagination.search,
                category: pagination.category
            }

            const query = queryString.stringify(params)

            const newQuery = '?' + query

            const { products, total } = await ProductAPI.getPagination(newQuery)
            setProducts(products);
            setTemp(products);

            //Tinh tong so trang = tong so sp / so luong sp 1 trang
            const totalPage = Math.ceil(parseInt(total) / parseInt(pagination.count));
            console.log(totalPage);
            setTotalPage(totalPage)
        }
        fetchAllData()
    }, [pagination])

    useEffect(() => {
        fetchCategories();
    }, [])

    const fetchCategories = async () => {
        const response = await ProductAPI.getCategories();
        setCategories(response);
    }

    return (
        <div className="container">
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
                        <div className="col-lg-6">
                            <h1 className="h2 text-uppercase mb-0">Cửa hàng</h1>
                        </div>
                        <div className="col-lg-6 text-lg-right">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb justify-content-lg-end mb-0 px-0">
                                    <li className="breadcrumb-item active" aria-current="page">Cửa hàng</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>


            {/* -------------Modal Product----------------- */}
            {
                products && products.map(value => (
                    <div className="modal fade show" id={`product_${value._id}`} key={value._id}>
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-body p-0">
                                    <div className="row align-items-stretch">
                                        <div className="col-lg-6 p-lg-0">
                                            <img style={{ width: '100%' }} className="product-view d-block h-100 bg-cover bg-center" src={value.img1} data-lightbox={`product_${value._id}`} />
                                            <img className="d-none" href={value.img2} />
                                            <img className="d-none" href={value.img3} />
                                        </div>
                                        <div className="col-lg-6">
                                            <a className="close p-4" type="button" href="#section_product" data-dismiss="modal" aria-label="Close">×</a>
                                            <div className="p-5 my-md-4">
                                                <ul className="list-inline mb-2">
                                                    <li className="list-inline-item m-0"><i className="fas fa-star small text-warning"></i></li>
                                                    <li className="list-inline-item m-0"><i className="fas fa-star small text-warning"></i></li>
                                                    <li className="list-inline-item m-0"><i className="fas fa-star small text-warning"></i></li>
                                                    <li className="list-inline-item m-0"><i className="fas fa-star small text-warning"></i></li>
                                                    <li className="list-inline-item m-0"><i className="fas fa-star small text-warning"></i></li>
                                                </ul>
                                                <h2 className="h4">{value.name}</h2>
                                                <p className="text-muted">${value.price}</p>
                                                <p className="text-small mb-4">{value?.description || 'Đồng hồ Curnon đại diện cho những giá trị khởi nguồn và câu chuyện cảm hứng. Với thiết kế theo hơi hướng cổ điển nhưng không hề rườm rà, đồng hồ Curnon chính là điểm nhấn trên cổ tay của các tín đồ yêu sự tối giản.'}</p>
                                                <div className="row align-items-stretch mb-4">
                                                    <div className="col-sm-5 pl-sm-0 fix_addwish">
                                                        <a className="btn btn-dark btn-sm btn-block h-100 d-flex align-items-center justify-content-center px-0">
                                                            <i className="far fa-heart mr-2"></i>Yêu thích</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
            {/* -------------Modal Product----------------- */}


            <section className="py-5">
                <div className="container p-0">
                    <div className="row">
                        <div className="col-lg-3 order-2 order-lg-1">
                            <h5 className="text-uppercase mb-4">Phân loại</h5>
                            <div className="py-2 px-4 bg-dark text-white mb-3"><strong className="small text-uppercase font-weight-bold">Fashion &amp; Acc</strong></div>
                            <ul className="list-unstyled small text-muted pl-lg-4 font-weight-normal">
                                <li className="mb-2"><a className="reset-anchor" href="#" onClick={() => handlerCategory('all')}>Tất cả</a></li>
                            </ul>
                            {categories && categories.map((item) => (
                                <ul className="list-unstyled small text-muted pl-lg-4 font-weight-normal">
                                    <li className="mb-2"><a className="reset-anchor" href="#" onClick={() => handlerCategory(item?.category)}>{item?.category}</a></li>
                                </ul>
                            ))}
                        </div>
                        <div className="col-lg-9 order-1 order-lg-2 mb-5 mb-lg-0">
                            <div className="row mb-3 align-items-center">

                                {/* ------------------Search----------------- */}
                                <Search handlerSearch={handlerSearch} />
                                {/* ------------------Search----------------- */}

                                <div className="col-lg-8">
                                    <ul className="list-inline d-flex align-items-center justify-content-lg-end mb-0">
                                        <li className="list-inline-item">
                                            <SortProduct handlerChangeSort={handlerChangeSort} />
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <Products products={products} sort={sort} />

                            <Pagination pagination={pagination} handlerChangePage={handlerChangePage} totalPage={totalPage} />

                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Shop;