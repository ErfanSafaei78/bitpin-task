import { ReactElement } from "react";
import { FetchStatus } from "../types";

interface FetchGuardProps {
  children: ReactElement;
  fetchStatus: FetchStatus;
  refetch?: () => void;
  errorMessage?: string;
}

export const FetchGuard = ({
  children,
  fetchStatus,
  refetch,
  errorMessage = "بارگذاری اطلاعات با مشکل رو به رو شد!",
}: FetchGuardProps) => {
  return fetchStatus !== "success" ? (
    <div className="d-flex justify-content-center align-items-center m-4">
      {fetchStatus === "loading" ? (
        <span className="spinner-border text-primary">
          <span className="visually-hidden">Loading...</span>
        </span>
      ) : (
        <span className="text-danger">
          {errorMessage}
          {refetch && (
            <span className="btn btn-success mx-2" onClick={refetch}>
              تلاش مجدد
            </span>
          )}
        </span>
      )}
    </div>
  ) : (
    children
  );
};
