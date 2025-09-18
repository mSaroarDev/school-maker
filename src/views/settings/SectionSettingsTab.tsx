import HeaderComponent from "@/components/_core/HeaderComponent";
import SectionsCreateModal from "./SectionCreateModal";
import SectionsListModal from "./SectionListModal";

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