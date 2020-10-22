// Данный файл служит посредником на пути React-(task.service.js)-axios-nodeJS-PostgreSQL
// Используется для отправки http запросов на сервер используя axios

// Импорт объекта axios для создания запросов
import http from "../http-common";

// Объект axios (здесь называется http) имеет методы для создания запросов
// get, put, post и т.д.

class TutorialDataService {
    getAll() {
        return http.get("/get");
    }

    get(id) {
        return http.get(`/${id}/get`);
    }

    create(data) {
        return http.post("/create", data);
    }

    // А дальше уже потом настрою
    update(id, data) {
        return http.put(`/tutorials/${id}`, data);
    }

    delete(id) {
        return http.delete(`/tutorials/${id}`);
    }

    deleteAll() {
        return http.delete(`/tutorials`);
    }

    findByTitle(title) {
        return http.get(`/tutorials?title=${title}`);
    }
}

export default new TutorialDataService();