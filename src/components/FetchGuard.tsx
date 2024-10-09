import { ReactElement } from "react";
import { FetchStatus } from "../types";

interface FetchGuardProps {
  children: ReactElement;
  fetchStatus: FetchStatus;
  refetch: () => void;
}

export const FetchGuard = ({
  children,
  fetchStatus,
  refetch,
}: FetchGuardProps) => {
  return fetchStatus !== "success" ? (
    <div className="d-flex justify-content-center align-items-center m-4">
      {fetchStatus === "loading" ? (
        <span className="spinner-border text-primary">
          <span className="visually-hidden">Loading...</span>
        </span>
      ) : (
        <span className="text-danger">
          بارگذاری اطلاعات با مشکل رو به رو شد!
          <span className="btn btn-success mx-2" onClick={refetch}>
            تلاش مجدد
          </span>
        </span>
      )}
    </div>
  ) : (
    children
  );
};
