import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

export const NavMenuSubItem = ({ item }: { item: NavItem }) => {
    const page = usePage();

    const isChildOpen = ( item: NavItem ) => {
        return false
        /*
        console.log(  item.title )
        if ( item.children?.some((child) => child.href === page.url ) ) {
            console.log('existe')
            return true
        } else {
            item.children?.forEach( child => isChildOpen( child ) )
        }
        */
    }

    return (
        <Collapsible key={item.title} asChild defaultOpen={isChildOpen(item)} className="group/collasible">
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronDown className="group-data-[state=open/collapsible:rotate-90 ml-auto transition-transform duration-200" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {item.children?.map((child) =>
                            child.children ? (
                                <NavMenuSubItem key={child.title} item={child} />
                            ) : (
                                <SidebarMenuSubItem key={child.title}>
                                    <SidebarMenuSubButton asChild isActive={child.href == page.url}>
                                        <Link href={child.href} prefetch>
                                            {child.icon && <child.icon />}
                                            <span>{child.title}</span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            ),
                        )}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    );
};
