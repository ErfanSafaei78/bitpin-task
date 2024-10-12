type TabsProps<T extends string> = {
  tabs: readonly T[];
  activeTab: T;
  setActiveTab: (activeTab: T) => void;
};

export function Tabs<T extends string>({
  activeTab,
  setActiveTab,
  tabs,
}: TabsProps<T>) {
  return (
    <ul className="nav nav-tabs mb-3">
      {tabs.map((tab) => (
        <li className="nav-item" key={`tab__${tab}`}>
          <button
            className={`nav-link ${
              activeTab === tab ? "active" : "text-muted"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        </li>
      ))}
    </ul>
  );
}
