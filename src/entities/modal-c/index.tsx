import { FC } from 'react';

import { createModalComponent, Modal, ModalsRegistry } from 'shared/lib/modals';

const ComponentC: FC = () => <Modal>Компонент C</Modal>;

export const ModalC = createModalComponent(ModalsRegistry.ModalC, ComponentC);
