import axios from '../axios'

const getAllProductService = (productId) => {
    return axios.get(`/api/get-all-product/?id=${productId}`)
}

const createNewProductService = (data) => {
    return axios.post('/api/create-new-product', data)
}

const deleteProductService = (idProduct) => {
    console.log('checkidProduct', idProduct)
    return axios.delete('/api/delete-product', {
        data: {
            id: idProduct
        }
    })
}
const updateProduct = (inputData) => {
    return axios.put("/api/update-product", inputData)
}

export {
    getAllProductService, createNewProductService, deleteProductService, updateProduct
}

