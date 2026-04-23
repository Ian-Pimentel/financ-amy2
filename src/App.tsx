import ExpensesYear from "./features/expensesYear/ExpensesYear";
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