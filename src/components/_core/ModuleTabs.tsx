interface ITabs {
  tabId: number;
  label: string;
  icon?: string;
};

interface ModuleTabsProps {
  tabs: ITabs[];
  selectedTab: number;
  setSelectedTab: (tabId: number) => void;
}

const ModuleTabs = ({
  tabs,
  selectedTab = 1,
  setSelectedTab = () => {}
}: ModuleTabsProps) => {

  return (
    <div className="flex items-center overflow-x-scroll py-2">
      {tabs.map(tab => (
        <button
          key={tab.tabId}
          className={`px-4 py-1.5 cursor-pointer ${tab.tabId !== selectedTab && "hover:bg-primary/5 hover:text-primary"} rounded-sm font-medium transition-all duration-150 ${tab.tabId === selectedTab ? "bg-primary text-white shadow shadow-primary" : "text-gray-600"}`}
          onClick={() => setSelectedTab(tab.tabId)}
        >
          {tab?.label}
        </button>
      ))}
    </div>
  );
};

export default ModuleTabs;