import Link from "next/link";

const SearchBar = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (text: string) => void;
}) => {
  return (
    <div className="relative mx-auto flex max-w-screen-lg items-center justify-center px-4 md:px-8">
      <div className="absolute inset-y-0 left-0 flex items-center pl-8 md:pl-12">
        <i className="bi bi-search"></i>
      </div>
      <input
        type="text"
        className="w-full rounded bg-white px-4 py-3 pl-10"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        maxLength={10}
      ></input>
      <Link href="/board/create">
        <button className="trans whitespace-nowrap rounded bg-blue-600 px-4 py-3 text-white hover:bg-blue-700">
          Create
        </button>
      </Link>
    </div>
  );
};

export default SearchBar;
