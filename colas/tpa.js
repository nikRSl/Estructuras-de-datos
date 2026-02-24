"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Task {
    id;
    user;
    imageName;
    strategy;
    constructor(id, user, imageName, strategy) {
        this.id = id;
        this.user = user;
        this.imageName = imageName;
        this.strategy = strategy;
    }
}
class ResizeStrategy {
    async process(task) {
        console.log(`📐 Redimensionando ${task.imageName}`);
        await this.simulateDelay();
    }
    simulateDelay() {
        return new Promise(resolve => setTimeout(resolve, 2000));
    }
}
class CompressStrategy {
    async process(task) {
        console.log(`🗜 Comprimiendo ${task.imageName}`);
        await this.simulateDelay();
    }
    simulateDelay() {
        return new Promise(resolve => setTimeout(resolve, 1500));
    }
}
class TaskQueue {
    tasks = [];
    enqueue(task) {
        this.tasks.push(task);
    }
    dequeue() {
        return this.tasks.shift();
    }
    isEmpty() {
        return this.tasks.length === 0;
    }
    size() {
        return this.tasks.length;
    }
}
class Worker {
    id;
    busy = false;
    constructor(id) {
        this.id = id;
    }
    isBusy() {
        return this.busy;
    }
    async process(task) {
        this.busy = true;
        console.log(`👷 Worker ${this.id} procesando tarea ${task.id}`);
        await task.strategy.process(task);
        console.log(`✅ Worker ${this.id} terminó tarea ${task.id}`);
        this.busy = false;
    }
}
class ImageProcessingServer {
    queue = new TaskQueue();
    workers = [];
    constructor(workerCount) {
        for (let i = 1; i <= workerCount; i++) {
            this.workers.push(new Worker(i));
        }
    }
    receiveTask(task) {
        console.log(`📥 Nueva tarea ${task.id} recibida`);
        this.queue.enqueue(task);
        this.dispatch();
    }
    async dispatch() {
        for (const worker of this.workers) {
            if (!worker.isBusy() && !this.queue.isEmpty()) {
                const task = this.queue.dequeue();
                if (task) {
                    worker.process(task).then(() => this.dispatch());
                }
            }
        }
    }
}
const server = new ImageProcessingServer(2);
server.receiveTask(new Task(1, "Ana", "foto1.jpg", new ResizeStrategy()));
server.receiveTask(new Task(2, "Luis", "foto2.jpg", new CompressStrategy()));
server.receiveTask(new Task(3, "Carlos", "foto3.jpg", new ResizeStrategy()));
server.receiveTask(new Task(4, "Maria", "foto4.jpg", new CompressStrategy()));
//# sourceMappingURL=tpa.js.map