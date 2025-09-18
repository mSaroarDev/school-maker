import HeaderComponent from "@/components/_core/HeaderComponent";
import ClassCreateModal from "./ClassCreateModal";
import ClassListModal from "./ClassListModal";

const ClassesSettingsTab = () => {

    return (
        <>
           <HeaderComponent 
            title="All Classes"
            extraComponent={<ClassCreateModal />}
           />

           <div className="mt-5">
            <ClassListModal />
           </div>
        </>
    );
};

export default ClassesSettingsTab;