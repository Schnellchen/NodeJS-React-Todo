// Файл содержит Axios — JavaScript-библиотеку для отправки HTTP-запросов в Node.js
// https://github.com/axios/axios#creating-an-instance
import axios from "axios";

// Cоздание объекта с указанием параметров
export default axios.create({
    baseURL: "http://localhost:8080/tasks",

    // Заголовки, которые отправляются при запросе
    headers: {
        "Content-type": "application/json" // Говорит серверу какой тип контента будет передаваться от клиента
    }
});