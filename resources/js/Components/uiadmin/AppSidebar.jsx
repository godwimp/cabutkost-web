import * as React from "react";
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader } from "@/Components/uiadmin/Sidebar";
import { NavMain } from "@/Components/uiadmin/NavMain";
import { LayoutDashboard, Truck, Package2, ClipboardList, CircleUserRound } from "lucide-react";
import { router } from "@inertiajs/react";

const data = {
    navMain: [
        {
            title: "Dashboard",
            url: "/admin/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Pengiriman",
            url: "#",
            icon: Truck,
            items: [
                {
                    title: "Manage Pindahan",
                    url: "/admin/pindahan",
                    description: "Kelola pesanan pengiriman barang"
                }
            ],
        },
        {
            title: "Penitipan",
            url: "#",
            icon: Package2,
            items: [
                {
                    title: "Manage Penitipan",
                    url: "/admin/penitipan",
                    description: "Kelola pesanan penitipan barang"
                }
            ],
        },
        {
            title: "Laporan",
            url: "#",
            icon: ClipboardList,
            items: [
                {
                    title: "Laporan Pengiriman",
                    url: "/admin/laporan/pengiriman",
                    description: "Lihat laporan pengiriman barang"
                },
                {
                    title: "Laporan Penitipan",
                    url: "/admin/laporan/penitipan",
                    description: "Lihat laporan penitipan barang"
                }
            ],
        },
    ],
};

export function AppSidebar({ ...props }) {
    const handleNavigation = (url) => {
        router.visit(url);
    };

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <button onClick={() => handleNavigation('/admin/dashboard')}>
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <CircleUserRound className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">CabutKost</span>
                                    <span className="text-xs text-muted-foreground">Admin Panel</span>
                                </div>
                            </button>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} onClick={handleNavigation} />
            </SidebarContent>
        </Sidebar>
    );
}