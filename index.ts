/**
 * Observer interface representing entities that need to be notified of state changes.
 */
interface Observer<T> {
    /**
     * Called when the subject's state changes.
     * @param data The updated state.
     */
    update(data: T): void;
}

/**
 * Subject interface representing an entity that maintains a list of observers.
 */
interface Subject<T> {
    /**
     * Adds an observer to the subject.
     * @param observer The observer to be added.
     */
    addObserver(observer: Observer<T>): void;

    /**
     * Removes an observer from the subject.
     * @param observer The observer to be removed.
     */
    removeObserver(observer: Observer<T>): void;

    /**
     * Notifies all observers of a state change.
     * @param state The new state to be sent to observers.
     */
    notifyObservers(state: T): void;
}

/**
 * Concrete implementation of the Subject interface.
 */
class Observable<T> implements Subject<T> {
    private observers: Observer<T>[] = [];

    addObserver(observer: Observer<T>): void {
        this.observers.push(observer);
    }

    removeObserver(observer: Observer<T>): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notifyObservers(state: T): void {
        if (state === undefined || state === null) {
            throw new Error("State is not provided. Ensure a valid state is passed.");
        }
        this.observers.forEach(observer => observer.update(state));
    }
}

/**
 * Concrete implementation of the Observer interface.
 */
class ConcreteObserver<T> implements Observer<T> {
    private callbackFn?: (data: T) => void;

    constructor(callbackFn?: (data: T) => void) {
        this.callbackFn = callbackFn;
    }

    update(data: T): void {
        if (this.callbackFn) {
            this.callbackFn(data);
        }
    }
}

export { Observer, Subject, Observable, ConcreteObserver };
