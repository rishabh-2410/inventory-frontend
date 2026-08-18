import dashboardIcon  from '@/assets/icons/tab/dashboard.png';
import inventoryIcon  from '@/assets/icons/tab/inventory.png';
import movementIcon  from '@/assets/icons/tab/movement.png';
import historyIcon  from '@/assets/icons/tab/history.png';
import settingsIcon  from '@/assets/icons/tab/setting.png'; 
import welcomeIcon  from '@/assets/onboarding/welcome.png';
import readyIcon  from '@/assets/onboarding/ready.png';
import warehousesIcon  from '@/assets/onboarding/warehouses.png';

export const icons = {
    dashboardIcon,
    inventoryIcon,
    movementIcon,
    historyIcon,
    settingsIcon,
    welcomeIcon,
    readyIcon,
    warehousesIcon,
}

export type IconKey = keyof typeof icons;