// Файл содержит Axios — JavaScript-библиотеку для отправки HTTP-запросов в Node.js
import axios from "axios";

// Cоздание объекта с указанием параметров
export default axios.create({
    baseURL: "http://localhost:8080/tasks",
    headers: {
        "Content-type": "application/json"
    }
});