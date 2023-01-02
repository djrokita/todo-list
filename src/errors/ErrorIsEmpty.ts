const MESSAGE = "Task's name is required";

export class ErrorIsEmpty extends Error {
    constructor() {
        super(MESSAGE);
    }
}
