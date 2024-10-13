import { useEffect, useState } from "react";
import { FetchStatus, Market } from "../../types";
import { Tabs } from "../../components/Tabs";
import { getMarketList } from "../../services";
import { MarketList } from "./components/list";
import { FetchGuard } from "../../components/FetchGuard";
import { Swipeable } from "../../components/Swipeable";

export const Markets = () => {
  const tabs = ["IRT", "USDT"] as const;
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("IRT");

  const [fetchStatus, setFetchStatus] = useState<FetchStatus>("loading");

  const [irtMarkets, setIrtMarkets] = useState<Market[]>([]);
  const [usdtMarkets, setUsdtMarkets] = useState<Market[]>([]);

  const fetchMarkets = () => {
    setFetchStatus("loading");
    getMarketList()
      .then((response) => {
        setIrtMarkets(
          response.filter((market) => market.currency2.code === "IRT")
        );
        setUsdtMarkets(
          response.filter((market) => market.currency2.code === "USDT")
        );
        setFetchStatus("success");
      })
      .catch((error) => {
        console.error("Error fetching market list: ", error);
        setFetchStatus("error");
      });
  };

  useEffect(() => {
    fetchMarkets();
  }, []);

  const handleSwipe = (direction: "left" | "right") => {
    const tabIndex = tabs.indexOf(activeTab);
    if (direction === "left") {
      setActiveTab(
        tabIndex - 1 < 0 ? tabs[tabs.length - 1] : tabs[tabIndex - 1]
      );
    } else {
      setActiveTab(tabIndex + 1 === tabs.length ? tabs[0] : tabs[tabIndex + 1]);
    }
  };

  return (
    <Swipeable
      onSwipeLeft={() => handleSwipe("left")}
      onSwipeRight={() => handleSwipe("right")}
    >
      <FetchGuard fetchStatus={fetchStatus} refetch={fetchMarkets}>
        <div className="container mt-4 markets">
          <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="row">
            <MarketList
              markets={activeTab === "IRT" ? irtMarkets : usdtMarkets}
            />
          </div>
        </div>
      </FetchGuard>
    </Swipeable>
  );
};
