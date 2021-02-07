import { SplendidCard } from "../domain";

export type ResourceListProps = {
  resourceList: Record<string, number>;
  hideEmpty?: boolean;
  mini?: boolean;
  column?: boolean;
  purchased?: SplendidCard[];
};

export { default } from './BaseResourceList';
export { default as PlayerResourceList } from './PlayerResourceList';