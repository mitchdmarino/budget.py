import axios from "axios";

// USER API ------------------------------------------------------------------------------------------------------------->
// register
export async function register(registerData) {
    const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/users/register`,
        registerData
    );
    return response;
}

// login
export async function login(loginData) {
    const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/users/login`,
        loginData
    );
    return response;
}

// SPENDING API ---------------------------------------------------------------------------------------------------------->
// get transactions
export async function getTransactions(localStorage) {
    const options = setAuthTokenHeader(localStorage);
    const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/spending`,
        options
    );
    return response;
}

// add a single transaction
export async function createTransaction(localStorage, transaction) {
    const reqData = {
        transaction: transaction,
    };
    const options = setAuthTokenHeader(localStorage);
    const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/spending`,
        reqData,
        options
    );
    return response;
}

// update a transaction
export async function updateTransaction(localStorage, transaction) {
    const options = setAuthTokenHeader(localStorage);
    console.log(transaction._id);
    const reqData = {
        transaction: transaction,
    };
    const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/spending`,
        reqData,
        options
    );
    return response;
}

// assign category to transaction
export async function categorizeTransaction(
    localStorage,
    transaction,
    category
) {
    const options = setAuthTokenHeader(localStorage);
    var reqData = {
        transaction: transaction,
        category: category,
    };
    console.log("RUNNING THE API");
    console.log(transaction);
    console.log(category);
    const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/spending/category`,
        reqData,
        options
    );
    console.log(response);
    return response;
}

export async function deleteTransaction(localStorage, transaction) {
    const options = setAuthTokenHeader(localStorage);
    const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/spending/${transaction._id}`,
        options
    );
    return response;
}

export async function uploadBankStatement(localStorage, bankUpload) {
    const options = setAuthTokenHeader(localStorage, "multipart/form-data");
    const formData = new FormData();
    formData.append("bankUpload", bankUpload);
    const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/spending/bank-upload`,
        formData,
        options
    );
    return response;
}

// CATEGORIES API -------------------------------------------------------------------------------------------------------->
// get categories
export async function getCategories(localStorage) {
    const options = setAuthTokenHeader(localStorage);
    const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/categories`,
        options
    );
    return response;
}

// create a category
export async function createCategory(localStorage, category) {
    const options = setAuthTokenHeader(localStorage);
    const reqData = {
        category: category,
    };
    const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/categories`,
        reqData,
        options
    );
    return response;
}

// update a category
export async function updateCategory(localStorage, category) {
    const options = setAuthTokenHeader(localStorage);
    const reqData = {
        category: category,
    };
    console.log(category);
    const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/categories/${category._id}`,
        reqData,
        options
    );
    return response;
}

// delete a category
export async function deleteCategory(localStorage, category) {
    const options = setAuthTokenHeader(localStorage);
    const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/categories/${category._id}`,
        options
    );
    console.log(response);
    return response;
}

//------------------------------------------------------------------------------------------------------------------------>

function setAuthTokenHeader(localStorage, content = null) {
    const token = localStorage.getItem("jwt");
    //console.log(token)
    // make the auth headers
    const options = {
        headers: {
            Authorization: token,
        },
    };

    if (content) {
        options.headers = {
            Authorization: token,
            "Content-Type": content,
        };
    }
    return options;
}
