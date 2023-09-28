import { Scope } from 'effector';

export type ModalUnit = {
    uuid: string;
    scope?: Scope;
} & Modal;

export const modalsRegistry = new Map<
    RegisteredModal['name'],
    RegisteredModal['component']
>();

export const register = ({ name, component }: RegisteredModal) => {
    modalsRegistry.set(name, component);
};

export const createModalComponent = <N extends string, C>(
    name: N,
    component: C,
): { name: N; component: C } => ({
    name,
    component,
});
