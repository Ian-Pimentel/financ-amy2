import Dialog from "@/shared/components/Dialog";
import MenuItem from "./MenuItem";
import clearAllData from "@/shared/utils/clearAllData";
import useBaseSalary from "@/features/salary/hooks/useBaseSalary";
import { useModals } from "@/shared/components/ModalContext";

type Props = {
    isOpen: boolean;
    toggleIsOpen: () => void;
}

export default function SideMenu({ isOpen, toggleIsOpen }: Props) {
    const {
        toggleCategoriesManagerModal,
        toggleRecurrentExpenseModalOpen,
        toggleThemePickerModal,
        openMonetaryPromptModal,
    } = useModals();

    const [baseSalary, setBaseSalary] = useBaseSalary();

    const handleClearData = () => {
        if (window.confirm("Certeza o.O? Não dá pra desfazer.")) {
            clearAllData();
        }
    };

    return (
        <Dialog isOpen={isOpen} type="top-left" onCancel={toggleIsOpen} closedby="any">
            <aside className="bg-linear-to-b from-(--bg-color) to-transparent p-2 h-screen w-screen md:w-[30vw] xl:w-[15vw]">
                <div className="flex justify-between mb-2">
                    <span className="text-2xl">Menu</span>
                    <button type="button" onClick={toggleIsOpen}>❌</button>
                </div>

                <div className="p-1">
                    <ul className="*:last:border-none">
                        <MenuItem title="Categorias" action={toggleCategoriesManagerModal} />
                        <MenuItem title="Gasto Parcelado" action={toggleRecurrentExpenseModalOpen} />
                        <MenuItem title="Mudar Tema" action={toggleThemePickerModal} />

                        <MenuItem title="Alterar Salário" action={() =>
                            openMonetaryPromptModal({
                                title: "Novo Salário",
                                initialValue: baseSalary,
                                onSave(amount) {
                                    setBaseSalary(amount);
                                },
                            })
                        } />
                        <MenuItem title="Apagar Dados" action={handleClearData} />
                    </ul>
                </div>
            </aside>
        </Dialog>
    );
}