import HeaderComponent from "@/components/_core/HeaderComponent";
import SessionCreateModal from "./SessionCreateModal";
import SessionsListModal from "./SessionsListModal";

const SessionsSettingsTab = () => {

    return (
        <>
           <HeaderComponent 
            title="All Sessions"
            extraComponent={<SessionCreateModal />}
           />

           <div className="mt-5">
            <SessionsListModal />
           </div>
        </>
    );
};

export default SessionsSettingsTab;