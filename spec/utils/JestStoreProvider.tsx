import { Provider } from "react-redux";
import { store } from "src/store/configureStore";

type Props = {
    children: React.ReactNode
}

export const JestStoreProvider = ({ children }: Props) => (
    <Provider store={store}>{children}</Provider>
);
