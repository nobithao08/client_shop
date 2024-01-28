import axiosClient from './axiosClient'

const CartAPI = {

    getCarts: (query) => {
        const url = `/carts${query}`
        return axiosClient.get(url)
    },
// gui yeu can toi HTTP get duong dan .... va + query vao cuoi URL de lay thong tin ve sp theo danh muc dc chi dinh
    postAddToCart: (query) => {
        const url = `/carts/add${query}`
        return axiosClient.post(url)
    },

    deleteToCart: (query) => {
        const url = `/carts/delete${query}`
        return axiosClient.delete(url)
    },

    putToCart: (query) => {
        const url = `/carts/update${query}`
        return axiosClient.put(url)
    }
    
}

export default CartAPI