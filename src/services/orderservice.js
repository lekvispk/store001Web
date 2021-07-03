import http from "../http-common";

class OrderService {
	
  getAll() {
    return http.get('/orders');
  }

  get(id) {
    return http.get('/orders/${id}');
  }

  create(data) {
    return http.post('/orders', data);
  }

  update(id, data) {
    return http.put('/orders/${id}', data);
  }

  delete(id) {
    return http.delete('/orders/${id}');
  }

  deleteAll() {
    return http.delete('/orders');
  }

  findByTitle(title) {
    return http.get('/orders?title=${title}');
  }
}

export default new OrderService();