import { Routes } from '@angular/router';
import { Paths } from './enums/Paths.enum';
import { VendingMachine } from './vending-machine/vending-machine.component';
import { SettingsComponent } from './settings-component/settings.component';
import { AddProduct } from './add-product/add-product.component';
import { LoginComponent } from './login/login';

export const routes: Routes = [
    { path: '', component: VendingMachine },
    { path: Paths.Home, component: VendingMachine },
    { path: Paths.Settings, component: SettingsComponent },
    { path: Paths.AddProduct, component: AddProduct },
    { path: Paths.Login, component: LoginComponent },
];
