import { Route, Routes } from "react-router";
import AddResourcePage from "./AddResourcePage";
import FullResourcePage from "./FullResourcePage";
import HomePage from "./HomePage";

export default function MainContent(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/addresource" element={<AddResourcePage />} />
        <Route path="/fullresource/:id" element={<FullResourcePage />} />
      </Routes>
    </>
  );
}
