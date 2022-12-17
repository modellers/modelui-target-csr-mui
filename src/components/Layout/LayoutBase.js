import { StateList, ListBase, events as baseEvents, triggers as baseTriggers } from '../../event/ListBase'
// layout
import { renderContent } from '../../util/ComponentUtil';

export const triggers = baseTriggers;
export const events = baseEvents;
export const config = {
  options: {}
}

export const StateLayout = StateList;

export class LayoutBase extends ListBase {

  // FIXME: fetch from utils
  renderContent = renderContent

}

