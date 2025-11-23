/**
 * MinHeap implementation with stable tie-breaking.
 *
 * This heap stores elements along with an insertion index to ensure
 * stable ordering when multiple elements have the same priority.
 *
 * Why stable tie-breaking?
 * - In pathfinding algorithms like Dijkstra with uniform weights (all edges = 1),
 *   we want the heap to behave like BFS.
 * - When two nodes have the same distance, the node inserted earlier is extracted first.
 * - This ensures deterministic paths and animations that match BFS behavior.
 *
 * API supports standard heap operations: insert, extractMin, decreaseKey, contains, isEmpty.
 */
export class MinHeap<T> {
	private items: { value: T; insertionIndex: number }[] = [];
	private compare: (a: T, b: T) => number;
	private indexMap = new Map<T, number>();
	private insertionCounter = 0; // tie-breaker for stable ordering

	constructor(compare: (a: T, b: T) => number) {
		this.compare = compare;
	}

	insert(item: T) {
		const wrapper = {
			value: item,
			insertionIndex: this.insertionCounter++, // store insertion order
		};
		this.items.push(wrapper);
		this.indexMap.set(item, this.items.length - 1);
		this.bubbleUp(this.items.length - 1); // maintain heap property
	}

	extractMin(): T | undefined {
		if (!this.items.length) return undefined;

		const min = this.items[0].value;
		const last = this.items.pop()!;
		this.indexMap.delete(min);

		if (this.items.length) {
			this.items[0] = last;
			this.indexMap.set(last.value, 0);
			this.bubbleDown(0); // restore heap property
		}

		return min;
	}

	decreaseKey(item: T) {
		const idx = this.indexMap.get(item);
		if (idx === undefined) return;
		this.bubbleUp(idx);
	}

	isEmpty() {
		return this.items.length === 0;
	}

	contains(item: T): boolean {
		return this.indexMap.has(item);
	}

	private bubbleUp(idx: number) {
		const item = this.items[idx];
		while (idx > 0) {
			const parentIdx = Math.floor((idx - 1) / 2);
			const parent = this.items[parentIdx];

			if (this.compareItems(item, parent) >= 0) break;

			this.swap(idx, parentIdx);
			idx = parentIdx;
		}
	}

	private bubbleDown(idx: number) {
		const length = this.items.length;
		while (true) {
			let smallest = idx;
			const left = 2 * idx + 1;
			const right = 2 * idx + 2;

			if (
				left < length &&
				this.compareItems(this.items[left], this.items[smallest]) < 0
			) {
				smallest = left;
			}
			if (
				right < length &&
				this.compareItems(this.items[right], this.items[smallest]) < 0
			) {
				smallest = right;
			}

			if (smallest === idx) break;

			this.swap(idx, smallest);
			idx = smallest;
		}
	}

	private compareItems(
		a: { value: T; insertionIndex: number },
		b: { value: T; insertionIndex: number }
	) {
		const cmp = this.compare(a.value, b.value);
		if (cmp !== 0) return cmp;
		// Stable tie-breaker: element inserted first has higher priority
		return a.insertionIndex - b.insertionIndex;
	}

	private swap(i: number, j: number) {
		const temp = this.items[i];
		this.items[i] = this.items[j];
		this.items[j] = temp;

		this.indexMap.set(this.items[i].value, i);
		this.indexMap.set(this.items[j].value, j);
	}
}
