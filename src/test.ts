import { createEvent, createStore, sample } from 'effector';

const event = createEvent<any>();
const store = createStore<any>(null);

sample({
    clock: event,
    target: store,
});
