import css from "./SearchBox.module.css"
interface SearchBoxProps {
    onSearch: (searchText: string) => void
}
const SearchBox = ({ onSearch }: SearchBoxProps) => {
    return <input className={css.input} onChange={(e) => onSearch(e.target.value)} type="text" placeholder="Search notes" />;
};

export default SearchBox;