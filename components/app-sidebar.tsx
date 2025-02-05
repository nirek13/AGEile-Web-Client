'use client';

import { useState } from 'react';
import type { User } from 'next-auth';
import { useRouter } from 'next/navigation';
import { DocumentToolCall } from '@/components/document';
import { PlusIcon } from '@/components/icons';
import { SidebarHistory } from '@/components/sidebar-history';
import { SidebarUserNav } from '@/components/sidebar-user-nav';
import { Button } from '@/components/ui/button';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, useSidebar } from '@/components/ui/sidebar';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { Modal, ModalHeader, ModalBody, ModalFooter } from './ui/modal'; // Import modal components

export function AppSidebar({ user }: { user: User | undefined }) {
    const router = useRouter();
    const { setOpenMobile } = useSidebar();

    const [isModalOpen, setModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');  // New state to store user name

    const handleAddUser = () => {
        // Debugging: Log the email and userName before closing the modal
        console.log('Adding user with email:', email, 'and name:', userName);
        setModalOpen(false);  // Close the modal after adding
    };

    return (
        <Sidebar className="group-data-[side=left]:border-r-0">
            <SidebarHeader>
                <SidebarMenu>
                    <div className="flex flex-row justify-between items-center">
                        <Link
                            href="/"
                            onClick={() => {
                                setOpenMobile(false);
                            }}
                            className="flex flex-row gap-3 items-center"
                        >
                            <span className="text-lg font-semibold px-2 hover:bg-muted rounded-md cursor-pointer">
                                AGEile Chat
                            </span>
                        </Link>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    type="button"
                                    className="p-2 h-fit"
                                    onClick={() => {
                                        setOpenMobile(false);
                                        router.push('/');
                                        router.refresh();
                                        setModalOpen(true);  // Open the modal when the button is clicked
                                        console.log('New Chat button clicked');
                                    }}
                                >
                                    <PlusIcon />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent align="end">New Chat</TooltipContent>
                        </Tooltip>
                    </div>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarHistory user={user} />
            </SidebarContent>
            <SidebarFooter>
                {/* Pass the userName to SidebarUserNav */}
                {user && <SidebarUserNav user={user} userName={userName} />}
            </SidebarFooter>

            {/* Modal for adding user by email */}
            <Modal open={isModalOpen} onClose={() => {
                console.log('Closing Modal');  // Debugging close action
                setModalOpen(false);
            }}>
                <ModalHeader>Add User</ModalHeader>
                <ModalBody>
                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            console.log('Email input changed:', e.target.value);  // Debugging email input change
                        }}
                        className="border p-2 w-full rounded-md"
                    />
                    <input
                        type="text"
                        placeholder="Enter name"
                        value={userName}
                        onChange={(e) => {
                            setUserName(e.target.value);
                            console.log('User name input changed:', e.target.value);  // Debugging name input change
                        }}  // Update userName state
                        className="border p-2 w-full rounded-md mt-4"
                    />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => {
                        console.log('Cancel button clicked');  // Debugging cancel action
                        setModalOpen(false);
                    }} className="bg-gray-300 hover:bg-gray-400 text-black">Cancel</Button>
                    <Button onClick={handleAddUser} className="bg-blue-500 hover:bg-blue-600 text-white">Add User</Button>
                </ModalFooter>
            </Modal>
        </Sidebar>
    );
}
