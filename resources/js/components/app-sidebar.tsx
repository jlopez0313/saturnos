import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BarChart3, Building2, Globe, Headphones, LayoutDashboard, MapPin, MonitorCheck, MonitorPlay, ScrollText, Settings, Ticket, Tv, Users } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
    },{
        title: 'Administración',
        href: '',
        icon: Settings,
        permiso: 'administracion',
        children: [
            {
                title: 'Departamentos',
                href: '/departamentos',
                icon: Globe,
            }, {
                title: 'Ciudades',
                href: '/ciudades',
                icon: MapPin,
            }, {
                title: 'Sedes',
                href: '/sedes',
                icon: Building2,
            },{
                title: 'Servicios',
                href: '/servicios',
                icon: Headphones,
            },{
                title: 'Ventanillas',
                href: '/ventanillas',
                icon: MonitorCheck,
            },{
                title: 'Marquesinas',
                href: '/marquesinas',
                icon: ScrollText,
            },{
                title: 'Multimedia',
                href: '/multimedia',
                icon: MonitorPlay,
            },{
                title: 'Usuarios',
                href: '/usuarios',
                icon: Users,
            },{
                title: 'Encuestas',
                href: '/encuestas',
                icon: BarChart3,
            }
        ]
    },{
        title: 'Modulos de atención',
        permiso: 'modulos_atencion',
        href: '/modulos',
        icon: MonitorCheck,
    },{
        title: 'Generar Turno',
        permiso: 'generar_turno',
        href: '/turnos',
        icon: Ticket,
    },{
        title: 'Pantalla',
        permiso: 'pantalla',
        href: '/pantalla',
        icon: Tv,
    },
];

const footerNavItems: NavItem[] = [
    
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
