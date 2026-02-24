"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Queue {
    items = [];
    enqueue(item) {
        this.items.push(item);
    }
    dequeue() {
        return this.items.shift();
    }
    isEmpty() {
        return this.items.length === 0;
    }
    size() {
        return this.items.length;
    }
}
class ImageServer {
    queue = new Queue();
    processing = false;
    receiveTask(task) {
        console.log(` Nueva tarea recibida: ${task.imageName}`);
        this.queue.enqueue(task);
        this.processNext();
    }
    processNext() {
        if (this.processing || this.queue.isEmpty())
            return;
        const task = this.queue.dequeue();
        if (!task)
            return;
        this.processing = true;
        console.log(`⚙ Procesando imagen: ${task.imageName}`);
        // Simula tiempo de procesamiento (2 segundos)
        setTimeout(() => {
            console.log(` Imagen procesada: ${task.imageName}`);
            this.processing = false;
            this.processNext(); // Procesa la siguiente
        }, 2000);
    }
}
const server = new ImageServer();
server.receiveTask({ id: 1, user: "Ana", imageName: "foto1.jpg" });
server.receiveTask({ id: 2, user: "Luis", imageName: "foto2.jpg" });
server.receiveTask({ id: 3, user: "Carlos", imageName: "foto3.jpg" });
//# sourceMappingURL=taller.js.map