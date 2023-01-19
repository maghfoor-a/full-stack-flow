import { Route, Routes } from "react-router";
import { IResource } from "../utils/interfaces";
import AddResourcePage from "./AddResourcePage";
import FullResourcePage from "./FullResourcePage";
import HomePage from "./HomePage";

export default function MainContent(): JSX.Element {
  const handleResourceClick = (selectedResource: IResource) => {
    console.log("Resource Clicked", selectedResource);
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<HomePage handleResourceClick={handleResourceClick} />}
        />
        <Route path="/addresource" element={<AddResourcePage />} />
        <Route path="/fullresource/:id" element={<FullResourcePage />} />
      </Routes>
    </>
  );
}
