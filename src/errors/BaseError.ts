export abstract class BaseError {
    private _id: string;
    private _message: string;

    get id() {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get message() {
        return this._message;
    }

    set message(value: string) {
        this._message = value;
    }
}
