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

    deleteDone() {
        return http.delete(`/delete`);
    }

    updateStatus(id, data) {
        return http.patch(`/${id}/update_status`, data);
    }

    updateStatusAll(data) {
        return http.patch(`/update_status`, data);
    }

    updateText(id, data) {
        return http.patch(`/${id}/update_content`, data);
    }
}

export default new TutorialDataService();