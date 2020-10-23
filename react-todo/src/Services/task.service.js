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

    create(data) {
        return http.post("/create", data);
    }


    delete(id) {
        return http.delete(`/${id}/delete`);
    }

    updateStatus(id, data) {
        return http.patch(`/${id}/update_status`, data);
    }

    updateContent(id, data) {
        return http.patch(`/${id}/update_content`, data);
    }

    // А дальше уже потом настрою


    get(id) {
        return http.get(`/${id}/get`);
    }

    deleteAll() {
        return http.delete(`/delete`);
    }

    findByTitle(title) {
        return http.get(`/tutorials?title=${title}`);
    }
}

export default new TutorialDataService();