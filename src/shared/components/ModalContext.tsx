import { createContext, useContext, useState } from "react";
import CategoriesManagerModal from "@/features/categories/components/CategoriesManagerModal";
import { useToggle } from "usehooks-ts";
import SideMenu from "@/features/sideMenu/components/SideMenu";
import ThemePickerModal from "@/features/theme/components/ThemePickerModal";
import AddRecurrentExpenseModal from "@/features/expenses/components/AddRecurrentExpenseModal";
import MonetaryPromptModal from "./MonetaryPromptModal";
import type { Expense } from "@/db/dexieDB";
import MapExpenseCategoryModal from "@/features/categories/components/MapExpenseCategoryModal";

export type MapExpenseCategoryPayload = {
    expense: Expense;
    initialCategoryId?: number;
};

export type MonetaryModalPayload = {
    title: string;
    initialValue?: number;

    onSave: (amount: number) => void;
};

type ModalContextData = {
    isMenuOpen: boolean;
    toggleMenuIsOpen: () => void;

    toggleCategoriesManagerModal: () => void;
    toggleThemePickerModal: () => void;
    toggleRecurrentExpenseModalOpen: () => void;

    openMapExpenseCategoryModal: (payload: MapExpenseCategoryPayload) => void;
    openMonetaryPromptModal: (payload: MonetaryModalPayload) => void;
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

export default function ModalProvider({ children }: React.PropsWithChildren) {

    const [mapExpenseCategoryPayload, setMapExpenseCategoryPayload] = useState<MapExpenseCategoryPayload | null>(null);
    const closeMapExpenseCategoryModal = () => setMapExpenseCategoryPayload(null);

    const [monetaryPayload, setMonetaryPayload] = useState<MonetaryModalPayload | null>(null);
    const closeMonetaryPromptModal = () => setMonetaryPayload(null);

    const [isMenuOpen, toggleMenuIsOpen] = useToggle(false);
    const [isThemePickerModalOpen, toggleThemePickerModal] = useToggle(false);
    const [isCategoriesManagerModalOpen, toggleCategoriesManagerModal] = useToggle(false);
    const [isRecurrentExpenseModalOpen, toggleRecurrentExpenseModalOpen] = useToggle(false);


    return (
        <ModalContext.Provider value={{
            isMenuOpen,
            toggleMenuIsOpen,
            toggleCategoriesManagerModal,
            toggleThemePickerModal,
            toggleRecurrentExpenseModalOpen,

            openMapExpenseCategoryModal: (payload) => setMapExpenseCategoryPayload(payload),
            openMonetaryPromptModal: (payload) => setMonetaryPayload(payload)
        }}>
            {children}
            <SideMenu isOpen={isMenuOpen} toggleIsOpen={toggleMenuIsOpen} />
            <ThemePickerModal isOpen={isThemePickerModalOpen} toggleIsOpen={toggleThemePickerModal} />
            <CategoriesManagerModal isOpen={isCategoriesManagerModalOpen} toggleIsOpen={toggleCategoriesManagerModal} />
            <AddRecurrentExpenseModal isOpen={isRecurrentExpenseModalOpen} toggleIsOpen={toggleRecurrentExpenseModalOpen} />

            <MapExpenseCategoryModal
                expense={mapExpenseCategoryPayload?.expense}
                initialCategoryId={mapExpenseCategoryPayload?.initialCategoryId}
                isOpen={mapExpenseCategoryPayload !== null} toggleIsOpen={closeMapExpenseCategoryModal}
            />

            <MonetaryPromptModal
                title={monetaryPayload?.title || "Insira um Valor."}
                initialValue={monetaryPayload?.initialValue}
                onSave={(value) => {
                    monetaryPayload?.onSave(value);
                    closeMonetaryPromptModal();
                }}
                isOpen={monetaryPayload !== null} close={closeMonetaryPromptModal}
            />
        </ModalContext.Provider>
    );
}

export const useModals = () => useContext(ModalContext);