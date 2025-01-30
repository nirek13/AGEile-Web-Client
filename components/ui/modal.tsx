// ./ui/modal.tsx
import { ReactNode } from 'react';

export function Modal({ open, onClose, children }: { open: boolean, onClose: () => void, children: ReactNode }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50" onClick={onClose}>
            <div className="bg-black text-white p-6 rounded-lg w-11/12 max-w-lg" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export function ModalHeader({ children }: { children: ReactNode }) {
    return <div className="text-2xl font-semibold mb-4">{children}</div>;
}

export function ModalBody({ children }: { children: ReactNode }) {
    return (
        <div className="mb-4">
            {/* Style the input field */}
            <input
                type="email"
                placeholder="Enter email"
                className="bg-gray-800 text-white border border-gray-600 p-2 rounded-md w-full"
            />
        </div>
    );
}

export function ModalFooter({ children }: { children: ReactNode }) {
    return <div className="flex justify-end gap-4">{children}</div>;
}
