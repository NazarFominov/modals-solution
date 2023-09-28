import { ModalA, ModalB, ModalD, ModalC } from 'entities';

import { register } from 'shared/lib/modals/lib';

const modals = { ModalA, ModalB, ModalC, ModalD } as const;

Object.values(modals).forEach(register);

type IsEqual<A, B> = A extends B ? (B extends A ? true : false) : false;

type Modals = typeof modals;
declare global {
    type RegisteredModal = Modals[keyof Modals];

    type Modal<M extends keyof Modals = keyof Modals> = {
        [K in M]: IsEqual<
            Parameters<Modals[K]['component']>[0],
            {}
        > extends true
            ? {
                  name: Modals[K]['name'];
              }
            : {
                  name: Modals[K]['name'];
                  props: Parameters<Modals[K]['component']>[0];
              };
    }[M];
}
