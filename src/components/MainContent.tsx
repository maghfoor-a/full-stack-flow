import { Route, Routes } from "react-router";
import AddResourcePage from "./AddResourcePage";
import FullResourcePage from "./FullResourcePage";
import { ResourcesList } from "./ResoucesList";

export default function MainContent(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/addresource" element={<AddResourcePage />} />
        <Route path="/fullresource/:id" element={<FullResourcePage />} />
        <Route path="/" element={<ResourcesList />} />
      </Routes>
    </>
  );
}
