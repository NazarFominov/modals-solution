import { v4 as uuidv4 } from 'uuid';
import {
    allSettled,
    createEffect,
    createEvent,
    createStore,
    Event,
    fork,
    sample,
} from 'effector';

import { ModalUnit } from './lib';

const $modals = createStore<Array<ModalUnit>>([]);

const addModal = createEvent<Modal>();

const replaceModal = createEvent<Modal>();

const event = createEvent<any>();
const store = createStore<any>(null);

sample({
    clock: event,
    target: store,
});

sample({
    clock: addModal,
    fn: (modal) =>
        ({
            uuid: uuidv4(),
            scope: fork(),
            name: modal.name,
            ...('props' in modal && { props: modal.props }),
        } as ModalUnit),
    target: event,
});

sample({
    clock: replaceModal,
    source: $modals,
    fn: (modals, modal) => [
        {
            uuid: uuidv4(),
            scope: fork(),
            name: modal.name,
            ...('props' in modal ? { props: modal.props } : {}),
        } as ModalUnit,
        ...modals.slice(1),
    ],
    target: $modals,
});

const $viewPosition = createStore<number>(0);
const $topViewModal = sample({
    source: [$modals, $viewPosition],
    fn: ([modals, viewPosition]: any) => modals?.[viewPosition] || null,
});

const switchLeft = createEvent();
const switchRight = createEvent();

sample({
    clock: $modals,
    source: $viewPosition,
    fn: (position, modals) => {
        if (position >= modals.length) {
            return 0;
        }

        return position;
    },
    target: $viewPosition,
});

sample({
    clock: switchLeft,
    source: { modals: $modals, position: $viewPosition },
    fn: ({ modals, position }) => {
        const newPosition = position - 1;
        if (newPosition < 0) {
            return modals.length - 1;
        }

        return newPosition;
    },
    target: $viewPosition,
});

sample({
    clock: switchRight,
    source: { modals: $modals, position: $viewPosition },
    fn: ({ modals, position }) => {
        const newPosition = position + 1;
        if (newPosition >= modals.length) {
            return 0;
        }

        return newPosition;
    },
    target: $viewPosition,
});

export const closeActive = createEvent();

sample({
    clock: closeActive,
    source: { modals: $modals, position: $viewPosition },
    fn: ({ modals, position }) => [
        ...modals.slice(0, position),
        ...modals.slice(position + 1),
    ],
    target: $modals,
});

export const closeCount = createEvent<number>();

sample({
    clock: closeCount,
    source: { modals: $modals, position: $viewPosition },
    fn: ({ modals, position }, count) => [
        ...modals.slice(0, position),
        ...modals.slice(position + count),
    ],
    target: $modals,
});

const callEventForAll = createEvent<{ event: Event<any>; params: any }>();
const callEventForAllFx = createEffect(
    async ({
        modals,
        event,
        params,
    }: {
        modals: Array<ModalUnit>;
        event: Event<any>;
        params: any;
    }) => {
        await Promise.all(
            modals.map(async ({ scope }) => {
                if (!scope) {
                    return;
                }

                await allSettled(event, { scope, params });
            }),
        );
    },
);

sample({
    clock: callEventForAll,
    source: $modals,
    fn: (modals, { event, params }) => ({ modals, event, params }),
    target: callEventForAllFx,
});

const resetOverflowFx = createEffect(() => {
    const body = document.querySelector('body');
    if (!body) {
        return;
    }

    body.style.removeProperty('overflow');
});

sample({
    source: $modals,
    filter: ({ length }) => length === 0,
    target: resetOverflowFx,
});

export const model = {
    $modals,
    $topViewModal,
    addModal,
    replaceModal,
    switchLeft,
    closeActive,
    closeCount,
    callEventForAll,
};
