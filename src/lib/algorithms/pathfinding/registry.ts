import { AlgorithmType, PathfindingAlgorithm } from "@/utils/types";

const registry: Partial<Record<AlgorithmType, new () => PathfindingAlgorithm>> =
	{};

export function registerAlgorithm(
	name: AlgorithmType,
	ctor: new () => PathfindingAlgorithm
) {
	if (registry[name]) {
		console.warn(`Algorithm "${name}" is already registered. Overwriting.`);
	}
	registry[name] = ctor;
}

export function getAlgorithm(name: AlgorithmType): PathfindingAlgorithm {
	const ctor = registry[name];
	if (!ctor) {
		throw new Error(`Algorithm "${name}" is not registered.`);
	}
	return new ctor();
}

export function isRegistered(name: AlgorithmType): boolean {
	return Boolean(registry[name]);
}

export function listAlgorithms(): AlgorithmType[] {
	return (Object.keys(registry) as AlgorithmType[]).filter(
		(k) => registry[k] !== undefined
	);
}

export function unregisterAlgorithm(name: AlgorithmType) {
	delete registry[name];
}
