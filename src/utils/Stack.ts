export class Stack<T> {
	private items: T[] = [];
	private inStack = new Set<T>();

	push(item: T) {
		// Prevent duplicates
		if (!this.inStack.has(item)) {
			this.items.push(item);
			this.inStack.add(item);
		}
	}

	pop(): T | undefined {
		if (this.items.length === 0) return undefined;

		const item = this.items.pop()!;
		this.inStack.delete(item);
		return item;
	}

	isEmpty(): boolean {
		return this.items.length === 0;
	}

	contains(item: T): boolean {
		return this.inStack.has(item);
	}
}
