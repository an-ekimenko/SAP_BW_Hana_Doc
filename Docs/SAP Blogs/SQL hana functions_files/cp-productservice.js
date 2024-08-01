cpServices.factory('productService', ['$resource',
function($resource) {
    return $resource('/http.svc/:handler', {}, {
    	getProductData: {
    		url: '/http.svc/create_product',
            method: 'GET',
            isArray: false,
            params: {
            	product: '@product'
            }
    	},
        getProductNames: {
        	url: '/http.svc/create_product',
            method: 'GET',
            isArray: false
        },
        editProduct: {
        	url: '/http.svc/edit_product',
            method: 'POST',
            params: {
                product: '@product',
                product_name: '@product_name',
                product_sapid: '@product_sapid',
                alternate_names: '@alternate_names',
                delete_list: '@delete_list',
                show_version_name: '@show_version_name' 
            },            
            isArray: false
        },
        createProduct: {
        	url: '/http.svc/create_product',
            method: 'POST',
            params: {
                product: '@product',
                product_name: '@product_name',
                product_sapid: '@product_sapid'
            },
            
            isArray: false
        }
    });
}]);