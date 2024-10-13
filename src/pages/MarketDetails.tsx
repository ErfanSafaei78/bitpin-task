import { useEffect, useState } from "react";
import { ActiveOrder, FetchStatus, Match } from "../types";
import { getActiveOrders, getMatches } from "../services";
import { useParams } from "react-router-dom";
import { Tabs } from "../components/Tabs";
import { FetchGuard } from "../components/FetchGuard";
import { MarketDetailList } from "../components/marketDetails/list";
import { Swipeable } from "../components/Swipeable";

export const MarketDetails = () => {
  const { marketId } = useParams();

  // states
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>("loading");

  const [buyOrders, setBuyOrders] = useState<ActiveOrder[]>([]);
  const [sellOrders, setSellOrders] = useState<ActiveOrder[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);

  const tabs = ["buy", "sell", "match"] as const;
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("buy");

  // handlers
  const fetchActiveOrders = async (type: "buy" | "sell") => {
    if (!marketId) {
      console.error("Failed to fetch Active Orders: Market id not found.");
      setFetchStatus("error");
      return;
    }

    await getActiveOrders(marketId, type)
      .then((response) => {
        if (type === "buy") {
          setBuyOrders(response.slice(0, 10));
        } else {
          setSellOrders(response.slice(0, 10));
        }
      })
      .catch((error) => {
        throw new Error(
          `Failed to fetch "${type.toUpperCase()}" Active Orders: ${error}`
        );
      });
  };

  const fetchMatches = async () => {
    if (!marketId) {
      console.error("Failed to fetch Matches: Market id not found.");
      setFetchStatus("error");
      return;
    }

    await getMatches(marketId)
      .then((response) => {
        setMatches(response.slice(0, 10));
      })
      .catch((error) => {
        throw new Error(`Failed to fetch Matches: ${error}`);
      });
  };

  const fetchAll = async () => {
    try {
      if (activeTab === "match") {
        await fetchMatches();
        fetchActiveOrders("buy");
        fetchActiveOrders("sell");
      } else {
        await fetchActiveOrders(activeTab === "buy" ? "buy" : "sell");
        fetchActiveOrders(activeTab === "buy" ? "sell" : "buy");
        fetchMatches();
      }
      setFetchStatus("success");
    } catch {
      setFetchStatus("error");
    }
  };

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

  // watchers
  useEffect(() => {
    fetchAll();

    const reFetchInterval = setInterval(fetchAll, 3000);

    return () => clearInterval(reFetchInterval);
  }, [activeTab]);

  return (
    <Swipeable
      onSwipeLeft={() => handleSwipe("left")}
      onSwipeRight={() => handleSwipe("right")}
    >
      <div style={{ height: "100vh" }}>
        <FetchGuard fetchStatus={fetchStatus} errorMessage="شما آفلاین هستید!">
          <div>
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <MarketDetailList
              data={
                { buy: buyOrders, sell: sellOrders, match: matches }[activeTab]
              }
              type={activeTab}
            />
          </div>
        </FetchGuard>
      </div>
    </Swipeable>
  );
};
