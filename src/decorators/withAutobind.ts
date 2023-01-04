export function withAutobind(target: unknown, property: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    return {
        configurable: descriptor.configurable,
        enumerable: descriptor.enumerable,
        get() {
            const boundMethod = descriptor.value.bind(this);

            return boundMethod;
        },
    };
}
