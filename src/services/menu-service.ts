import { Injectable } from '@angular/core';
import { MenuItem } from '../components/types';

@Injectable()
export class MenuService {
    items: MenuItem[] = [
        { icon: 'track_changes', label: 'Dashboard', routeUrl: '/dashboard', isActive: true }
    ];
}
