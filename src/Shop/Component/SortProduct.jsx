import React from 'react';
import PropTypes from 'prop-types';

SortProduct.propTypes = {
    handlerChangeSort: PropTypes.func
};

SortProduct.defaultProps = {
    handlerChangeSort: null
}

function SortProduct(props) {

    const { handlerChangeSort } = props

    const onChangeValue = (e) => {
        
        const keyword = e.target.value

        if (!handlerChangeSort){
            return
        }

        handlerChangeSort(keyword)

    }

    return (
        <select className="selectpicker ml-auto" onChange={onChangeValue}>
            <option value="default">Mặc định phân loại</option>
            <option value="DownToUp">Giá: Thấp đén Cao</option>
            <option value="UpToDown">Giá: Cao đến Thấp</option>
        </select>
    );
}

export default SortProduct;