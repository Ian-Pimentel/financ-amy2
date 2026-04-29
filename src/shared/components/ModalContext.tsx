import { createContext, useContext, useEffect, useRef, useState } from "react";
import CategoriesManagerModal from "@/features/categories/components/CategoriesManagerModal";
import { useToggle } from "usehooks-ts";
import SideMenu from "@/features/sideMenu/components/SideMenu";
import ThemePickerModal from "@/features/theme/components/ThemePickerModal";
import AddRecurrentExpenseModal from "@/features/expenses/components/AddRecurrentExpenseModal";
import MonetaryPromptModal from "./MonetaryPromptModal";
import type { Expense } from "@/db/dexieDB";
import MapExpenseCategoryModal from "@/features/categories/components/MapExpenseCategoryModal";
import { useLocation } from "@tanstack/react-router";

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

    toggleCategoriesManager: () => void;
    toggleThemePicker: () => void;
    toggleRecurrentExpense: () => void;

    openMapExpenseCategory: (payload: MapExpenseCategoryPayload) => void;
    openMonetaryPrompt: (payload: MonetaryModalPayload) => void;
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

export default function ModalProvider({ children }: React.PropsWithChildren) {
    const location = useLocation();
    const isFirstRender = useRef(true);

    const [mapExpenseCategoryPayload, setMapExpenseCategoryPayload] = useState<MapExpenseCategoryPayload | null>(null);
    const closeMapExpenseCategoryModal = () => setMapExpenseCategoryPayload(null);

    const [monetaryPayload, setMonetaryPayload] = useState<MonetaryModalPayload | null>(null);
    const closeMonetaryPromptModal = () => setMonetaryPayload(null);

    const [isMenuOpen, toggleMenuIsOpen, setMenuIsOpen] = useToggle(false);
    const [isThemePickerModalOpen, toggleThemePicker, setThemePickerIsOpen] = useToggle(false);
    const [isCategoriesManagerModalOpen, toggleCategoriesManager, setCategoriesManagerIsOpen] = useToggle(false);
    const [isRecurrentExpenseModalOpen, toggleRecurrentExpense, setRecurrentExpenseIsOpen] = useToggle(false);

    const closeAll = () => {
        closeMapExpenseCategoryModal();
        closeMonetaryPromptModal();
        setMenuIsOpen(false);
        setThemePickerIsOpen(false);
        setCategoriesManagerIsOpen(false);
        setRecurrentExpenseIsOpen(false);
    }

    useEffect(() => {
        if (!isFirstRender.current) {
            closeAll();
        } else isFirstRender.current = false;

    }, [location])

    return (
        <ModalContext.Provider value={{
            isMenuOpen,
            toggleMenuIsOpen,
            toggleCategoriesManager,
            toggleThemePicker,
            toggleRecurrentExpense,

            openMapExpenseCategory: (payload) => setMapExpenseCategoryPayload(payload),
            openMonetaryPrompt: (payload) => setMonetaryPayload(payload)
        }}>
            {children}
            <SideMenu isOpen={isMenuOpen} toggleIsOpen={toggleMenuIsOpen} />
            <ThemePickerModal isOpen={isThemePickerModalOpen} toggleIsOpen={toggleThemePicker} />
            <CategoriesManagerModal isOpen={isCategoriesManagerModalOpen} toggleIsOpen={toggleCategoriesManager} />
            <AddRecurrentExpenseModal isOpen={isRecurrentExpenseModalOpen} toggleIsOpen={toggleRecurrentExpense} />

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