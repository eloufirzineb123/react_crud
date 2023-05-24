import axios from "axios";

export const productApi = axios.create({
    baseURL: "http://localhost:7000",
});

export const getProducts = (keyword, page=1, size=4) => {
    return productApi.get(`/products?name_like=${keyword}&_page=${page}&_limit=${size}`);
};

export const deleteProduct = (product) => {
    return productApi.delete(`/products/${product.id}`);
}

export const getProduct = (id) => {
    return productApi.get(`/products/${id}`);
};

export const saveProduct = (product) => {
    return productApi.post(`/products`, product);
}

export const checkProduct = (produit) => {
    return productApi.patch(`/products/${produit.id}`, { checked: !produit.checked });
}

export const updateproduct = (produit) => {
    return productApi.put(`/products/${produit.id}`, produit);
}