class Task {
  constructor(
    public readonly id: number,
    public readonly user: string,
    public readonly imageName: string,
    public readonly strategy: ProcessingStrategy
  ) {}
}

interface ProcessingStrategy {
  process(task: Task): Promise<void>;
}

class ResizeStrategy implements ProcessingStrategy {
  async process(task: Task): Promise<void> {
    console.log(` Redimensionando ${task.imageName}`);
    await this.simulateDelay();
  }

  private simulateDelay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 2000));
  }
}

class CompressStrategy implements ProcessingStrategy {
  async process(task: Task): Promise<void> {
    console.log(` Comprimiendo ${task.imageName}`);
    await this.simulateDelay();
  }

  private simulateDelay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 1500));
  }
}

class TaskQueue {
  private tasks: Task[] = [];

  enqueue(task: Task): void {
    this.tasks.push(task);
  }

  dequeue(): Task | undefined {
    return this.tasks.shift();
  }

  isEmpty(): boolean {
    return this.tasks.length === 0;
  }

  size(): number {
    return this.tasks.length;
  }
}

class Worker {
  private busy = false;

  constructor(private readonly id: number) {}

  isBusy(): boolean {
    return this.busy;
  }

  async process(task: Task): Promise<void> {
    this.busy = true;

    console.log(` Worker ${this.id} procesando tarea ${task.id}`);
    await task.strategy.process(task);

    console.log(` Worker ${this.id} terminó tarea ${task.id}`);
    this.busy = false;
  }
}

class ImageProcessingServer {
  private queue = new TaskQueue();
  private workers: Worker[] = [];

  constructor(workerCount: number) {
    for (let i = 1; i <= workerCount; i++) {
      this.workers.push(new Worker(i));
    }
  }

  receiveTask(task: Task): void {
    console.log(` Nueva tarea ${task.id} recibida`);
    this.queue.enqueue(task);
    this.dispatch();
  }

  private async dispatch(): Promise<void> {
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
