import { FC } from 'react';

import { createModalComponent, Modal, ModalsRegistry } from 'shared/lib/modals';

type ComponentBProps = {
    b: number;
};

const Component: FC<ComponentBProps> = () => <Modal>Компонент B</Modal>;

export const ModalB = createModalComponent(ModalsRegistry.ModalB, Component);
