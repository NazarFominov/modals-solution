import { FC } from 'react';

import { createModalComponent, Modal, ModalsRegistry } from 'shared/lib/modals';

type ComponentAProps = {
    a: string;
};

const Component: FC<ComponentAProps> = () => <Modal>Компонент А</Modal>;

export const ModalA = createModalComponent(ModalsRegistry.ModalA, Component);
