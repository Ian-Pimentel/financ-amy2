import useBaseSalary from "@/features/salary/hooks/useBaseSalary";
import ThemePickerModal from "@/features/theme/components/ThemePickerModal";
import SalaryPromptModal from "@/shared/components/MonetaryPromptModal"; // Supondo que você importe ele aqui
import Dialog from "@/shared/components/Dialog";
import ToggleButton from "@/shared/components/ToggleButton";
import { useToggle } from "usehooks-ts";
import MenuItem from "./MenuItem";
import { db } from "@/shared/dexieDB";
import CategoriesModal from "@/features/categories/components/CategoriesModal";

export default function SideMenu() {
    const [isMenuOpen, toggleMenuIsOpen] = useToggle(false);

    //MODAIS
    const [isThemeModalOpen, toggleThemeModal] = useToggle(false);
    const [isSalaryModalOpen, toggleSalaryModal] = useToggle(false);
    const [isCategoriesModalOpen, toggleCategoriesModal] = useToggle(false);

    const clearAllData = async () => {
        await db.delete({ disableAutoOpen: false });
        localStorage.clear();
        location.reload();
    }

    const handleClearData = () => {
        if (window.confirm("Certeza o.O? Não dá pra desfazer.")) {
            clearAllData();
        }
    };

    const [baseSalary, setBaseSalary] = useBaseSalary();

    return <>
        <ToggleButton isActive={isMenuOpen} toggleActive={toggleMenuIsOpen}>
            <div className="text-lg">⚙️</div>
        </ToggleButton>

        <Dialog isOpen={isMenuOpen} type="top-left" onCancel={toggleMenuIsOpen} dismissable>
            <aside className="bg-linear-to-b from-(--bg-color) to-transparent p-2 h-screen w-screen md:w-[30vw] xl:w-[15vw]">
                <div className="flex justify-between mb-2">
                    <span className="text-2xl">Menu</span>
                    <button type="button" className="button" onClick={toggleMenuIsOpen}>❌</button>
                </div>

                <div className="p-1">
                    <ul className="*:last:border-none">
                        <MenuItem title="Categorias" action={toggleCategoriesModal} />
                        <MenuItem title="Mudar Tema" action={toggleThemeModal} />
                        <MenuItem title="Alterar Salário" action={toggleSalaryModal} />
                        <MenuItem title="Apagar Dados" action={handleClearData} />
                    </ul>
                </div>
            </aside>
        </Dialog>

        <ThemePickerModal
            isOpen={isThemeModalOpen}
            onClose={toggleThemeModal}
        />

        <SalaryPromptModal
            initialValue={baseSalary}
            isOpen={isSalaryModalOpen}
            onSave={(newSalary) => {
                setBaseSalary(newSalary);
                toggleSalaryModal();
            }}
            onCancel={toggleSalaryModal}
        />

        <CategoriesModal
            isOpen={isCategoriesModalOpen}
            toggleIsOpen={toggleCategoriesModal}
        />
    </>;
}