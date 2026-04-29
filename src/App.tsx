import ExpensesYear from "./features/expensesYear/components/ExpensesYear";
import "./index.css";
import ModalProvider from "./shared/components/ModalContext";

export function App() {
  return (
    <ModalProvider>
      <ExpensesYear />
    </ModalProvider>
  );
}

export default App;