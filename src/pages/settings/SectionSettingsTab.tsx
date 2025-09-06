import HeaderComponent from "@/components/_core/HeaderComponent";
import ClassCreateModal from "./ClassCreateModal";
import ClassListModal from "./ClassListModal";
import SectionsListModal from "./SectionListModal";
import SectionsCreateModal from "./SectionCreateModal";

const SectionsSettingsTab = () => {

    return (
        <>
           <HeaderComponent 
            title="All Sections"
            extraComponent={<SectionsCreateModal />}
           />

           <div className="mt-5">
            <SectionsListModal />
           </div>
        </>
    );
};

export default SectionsSettingsTab;