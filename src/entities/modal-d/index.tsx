import { FC } from 'react';

import { createModalComponent, Modal, ModalsRegistry } from 'shared/lib/modals';

const Component: FC = () => <Modal>Компонент D</Modal>;

export const ModalD = createModalComponent(ModalsRegistry.ModalD, Component);
