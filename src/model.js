export class createTodo {
    #_id;
    #_task;
    #_isChecked;
    #_isPin;

    constructor(task, isChecked = false, isPin = false) {
        this.#_id = new Date().valueOf();
        this.#_task = task;
        this.#_isChecked = isChecked;
        this.#_isPin = isPin;
    }

    get id() {
        return this.#_id;
    }
    get task() {
        return this.#_task;
    }
    get isChecked() {
        return this.#_isChecked;
    }
    get isPin() {
        return this.#_isPin;
    }
    set id(newId) {
        this.#_id = newId;
    }
    set task(value) {
        this.#_task = value;
    }
    set isChecked(isComplete) {
        this.#_isChecked = isComplete;
    }
    set isPin(isPin) {
        this.#_isPin = isPin;
    }

    toJSON() {
        return {
            id: this.id,
            task: this.task,
            isChecked: this.isChecked,
            isPin: this.isPin,
        };
    }
}
