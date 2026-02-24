interface Task {
  id: number;
  user: string;
  imageName: string;
}
class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}
class ImageServer {
  private queue = new Queue<Task>();
  private processing = false;

  receiveTask(task: Task): void {
    console.log(` Nueva tarea recibida: ${task.imageName}`);
    this.queue.enqueue(task);
    this.processNext();
  }

  private processNext(): void {
    if (this.processing || this.queue.isEmpty()) return;

    const task = this.queue.dequeue();
    if (!task) return;

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
