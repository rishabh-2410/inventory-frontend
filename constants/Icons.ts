import dashboardIcon  from '@/assets/icons/tab/dashboard.png';
import inventoryIcon  from '@/assets/icons/tab/inventory.png';
import movementIcon  from '@/assets/icons/tab/movement.png';
import historyIcon  from '@/assets/icons/tab/history.png';
import settingsIcon  from '@/assets/icons/tab/setting.png'; 

export const icons = {
    dashboardIcon,
    inventoryIcon,
    movementIcon,
    historyIcon,
    settingsIcon,
}

export type IconKey = keyof typeof icons;