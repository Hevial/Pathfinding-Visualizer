export class Queue<T> {
	private items: T[] = [];
	private head = 0;
	private inQueue = new Set<T>();

	enqueue(item: T) {
		if (!this.inQueue.has(item)) {
			this.items.push(item);
			this.inQueue.add(item);
		}
	}

	dequeue(): T | undefined {
		if (this.isEmpty()) return undefined;

		const item = this.items[this.head];
		this.inQueue.delete(item);
		this.head++;

		// free memory
		if (this.head > 1000) {
			this.items = this.items.slice(this.head);
			this.head = 0;
		}

		return item;
	}

	isEmpty(): boolean {
		return this.head >= this.items.length;
	}

	contains(item: T): boolean {
		return this.inQueue.has(item);
	}
}
