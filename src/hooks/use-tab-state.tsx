import { useLocation, useNavigate } from 'react-router-dom';
import { StringParam, useQueryParams } from 'use-query-params';

export const useTabState = (): [string | null | undefined, (currentTab: string) => void] => {
  const location = useLocation();
  const doNavigate = useNavigate();
  const [currentTabParam, setParam] = useQueryParams({ tab: StringParam });
  const setTab = (name: string) => {
    doNavigate(`${location.pathname}?tab=${name}`);
    setParam({ tab: name });
  };
  return [currentTabParam.tab, setTab];
};
