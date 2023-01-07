const taskService = require("../service/task.service");
const logger = require("../logger/api.logger");

class TodoController {
  async getTasks() {
    try {
      logger.info("Controller: getTasks");
      return await taskService.getTasks();
    } catch (e) {
      logger.error(e);
    }
  }

  async createTask(task) {
    try {
      logger.info("Controller: createTask", task);
      return await taskService.createTask(task);
    } catch (e) {
      logger.error(e);
    }
  }

  async updateTask(task) {
    try {
      logger.info("Controller: updateTask", task);
      return await taskService.updateTask(task);
    } catch (e) {
      logger.error(e);
    }
  }

  async deleteTask(taskId) {
    try {
      logger.info("Controller: deleteTask", taskId);
      return await taskService.deleteTask(taskId);
    } catch (e) {
      logger.error(e);
    }
  }
}
module.exports = new TodoController();
