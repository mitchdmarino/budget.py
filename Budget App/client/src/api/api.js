import axios from 'axios'

// USER API ------------------------------------------------------------------------------------------------------------->
// register 
export async function register(registerData) {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/register`, registerData);
    return response;
}

// login
export async function login(loginData) {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/login`, loginData);
    return response;
}

// SPENDING API ---------------------------------------------------------------------------------------------------------->
// get transactions 
export async function getTransactions(localStorage) {
    const options = setAuthTokenHeader(localStorage);
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/spending`, options);
    return response;
}
// assign category to transaction
export async function categorizeTransaction(localStorage, transaction, category) {
    const options = setAuthTokenHeader(localStorage);
    var reqData = {
        transaction: transaction, 
        category: category
    }
    console.log("RUNNING THE API")
    console.log(transaction)
    console.log(category)
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/spending/category`, reqData, options);
    console.log(response)
    return response;
}

// CATEGORIES API -------------------------------------------------------------------------------------------------------->
// get categories 
export async function getCategories(localStorage) {
    const options = setAuthTokenHeader(localStorage);
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/categories`, options);
    return response;
}

// create a category 
export async function createCategory(localStorage, categoryName) {
    const options = setAuthTokenHeader(localStorage);
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/categories`, options);
    return response;
}

//------------------------------------------------------------------------------------------------------------------------>

function setAuthTokenHeader(localStorage) {
    const token = localStorage.getItem('jwt')
    // make the auth headers 
    const options = {
        headers: {
            'Authorization': token
        }
    }
    return options;
}