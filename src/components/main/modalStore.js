import { createStore, createEvent } from 'effector'

export const openDepositModal = createEvent()
export const closeDepositModal = createEvent()
export const openWithdrawalModal = createEvent()
export const closeWithdrawalModal = createEvent()

// Стор для видимости модальных окон
export const $depositModalVisible = createStore(false).reset(closeDepositModal)
export const $withdrawalModalVisible = createStore(false).reset(closeWithdrawalModal)

// События




// Обновление стора
$depositModalVisible.on(openDepositModal, () => true).reset(closeDepositModal)
$withdrawalModalVisible.on(openWithdrawalModal, () => true).reset(closeWithdrawalModal)